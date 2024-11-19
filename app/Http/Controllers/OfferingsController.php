<?php

namespace App\Http\Controllers;

use App\Models\Offering;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Events\AttachmentsUploaded;
use App\Events\OfferingCreated;
use App\Events\OfferingUpdated;
use App\Notifications\AttachmentUploaded;
use Illuminate\Support\Facades\DB;

class OfferingsController extends Controller
{
    public function index(Request $request)
    {
        // Get filter parameters
        $filters = $request->only([
            'search',
            'status',
            'min_budget',
            'max_budget',
            'sort'
        ]);

        // Cache key based on filters and pagination
        $cacheKey = 'offerings.list.' . md5(json_encode($filters) . $request->get('page', 1));

        // Get offerings with cache
        $offerings = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($filters) {
            return Offering::with('user')
                ->filter($filters)
                ->orderBy($this->getSortColumn($filters['sort'] ?? 'latest'), $this->getSortDirection($filters['sort'] ?? 'latest'))
                ->paginate(10)
                ->withQueryString();
        });

        return Inertia::render('Offerings/Index', [
            'offerings' => $offerings,
            'filters' => $filters
        ]);
    }

    private function getSortColumn($sort)
    {
        return match($sort) {
            'budget_high', 'budget_low' => 'budget',
            'deadline' => 'deadline',
            default => 'created_at'
        };
    }

    private function getSortDirection($sort)
    {
        return match($sort) {
            'oldest', 'budget_low' => 'asc',
            'budget_high' => 'desc',
            default => 'desc'
        };
    }

    public function create()
    {
        return Inertia::render('Offerings/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'deadline' => 'required|date|after:now',
            'attachments.*' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,zip|max:10240' // 10MB max
        ]);

        try {
            DB::beginTransaction();

            $attachments = [];
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $attachments[] = $this->handleFileUpload($file, 'offerings/' . date('Y/m'));
                }
            }

            // Create offering
            $offering = $request->user()->offerings()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'budget' => $validated['budget'],
                'deadline' => $validated['deadline'],
                'attachments' => $attachments,
                'status' => 'pending'
            ]);

            // Create activity log
            activity()
                ->performedOn($offering)
                ->causedBy($request->user())
                ->log('created_offering');

            // Trigger events
            event(new OfferingCreated($offering));
            
            if (count($attachments) > 0) {
                event(new AttachmentsUploaded($offering, count($attachments)));
                
                // Notify relevant users
                $offering->user->notify(new AttachmentUploaded($offering, count($attachments)));
                if ($offering->tutor) {
                    $offering->tutor->notify(new AttachmentUploaded($offering, count($attachments)));
                }
            }

            DB::commit();

            // Clear cache when new offering is created
            Cache::tags(['offerings'])->flush();

            return redirect()->route('offerings.show', $offering)
                ->with('success', 'Offering created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Delete any uploaded files
            foreach ($attachments as $attachment) {
                Storage::disk('public')->delete($attachment['path']);
            }

            report($e);

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to create offering. Please try again.');
        }
    }

    public function show(Offering $offering)
    {
        return Inertia::render('Offerings/Show', [
            'offering' => $offering->load('user')
        ]);
    }

    public function edit(Offering $offering)
    {
        $this->authorize('update', $offering);

        return Inertia::render('Offerings/Edit', [
            'offering' => $offering
        ]);
    }

    public function update(Request $request, Offering $offering)
    {
        $this->authorize('update', $offering);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'deadline' => 'required|date|after:now',
            'attachments.*' => 'sometimes|file|mimes:pdf,doc,docx,jpg,jpeg,png,zip|max:10240'
        ]);

        try {
            DB::beginTransaction();

            if ($request->hasFile('attachments')) {
                // Delete old attachments
                foreach ($offering->attachments as $attachment) {
                    Storage::disk('public')->delete($attachment['path']);
                }

                // Store new attachments
                $attachments = [];
                foreach ($request->file('attachments') as $file) {
                    $attachments[] = $this->handleFileUpload($file, 'offerings/' . date('Y/m'));
                }
                $validated['attachments'] = $attachments;
            }

            $offering->update($validated);

            // Trigger updated event
            event(new OfferingUpdated($offering));

            DB::commit();

            // Clear cache when offering is updated
            Cache::tags(['offerings'])->flush();

            return redirect()->route('offerings.show', $offering)
                ->with('success', 'Offering updated successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return back()->withInput()->with('error', 'Failed to update offering.');
        }
    }

    public function destroy(Offering $offering)
    {
        $this->authorize('delete', $offering);

        // Delete attachments
        foreach ($offering->attachments as $attachment) {
            Storage::disk('public')->delete($attachment['path']);
        }

        $offering->delete();

        // Clear cache when offering is deleted
        Cache::tags(['offerings'])->flush();

        return redirect()->route('offerings.index')
            ->with('success', 'Offering deleted successfully.');
    }

    // Helper method untuk handle file upload
    private function handleFileUpload($file, $directory)
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($directory, $filename, 'public');

        return [
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'upload_time' => now()
        ];
    }
}