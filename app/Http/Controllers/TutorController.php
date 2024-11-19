<?php

namespace App\Http\Controllers;

use App\Models\TutorProfile;
use App\Models\User;
use App\Models\Offering;
use App\Models\Earning;
use App\Notifications\OfferingAccepted;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Events\TutorVerified;
use App\Events\TutorRejected;

class TutorController extends Controller
{
    use AuthorizesRequests;
    
    protected $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    /**
     * Display a listing of tutors.
     */
    public function index()
    {
        $tutors = TutorProfile::with('user')
            ->verified()
            ->latest()
            ->paginate(10)
            ->through(function ($tutor) {
                $tutor->student_card_url = $this->fileUploadService->getUrl($tutor->student_card);
                $tutor->transcript_url = $this->fileUploadService->getUrl($tutor->transcript);
                return $tutor;
            });

        return Inertia::render('Tutor/Index', [
            'tutors' => $tutors
        ]);
    }

    /**
     * Show registration form for new tutors.
     */
    public function create()
    {
        return Inertia::render('Tutor/Register');
    }

    /**
     * Store a newly created tutor profile.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'expertise_level' => ['required', Rule::in(['Undergraduate', 'Graduate', 'Professional'])],
            'bio' => 'required|string|max:1000',
            'subjects' => 'required|array|min:1',
            'hourly_rate' => 'required|numeric|min:0',
            'university' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'gpa' => 'required|numeric|between:0,4.00',
            'graduation_year' => 'required|integer|min:1900|max:2100',
            'student_card' => 'required|file|max:2048',
            'transcript' => 'required|file|max:2048',
            'certificates' => 'nullable|array',
            'certificates.*' => 'file|max:2048',
            'available_times' => 'required|array',
            'teaching_preferences' => 'required|array'
        ]);

        DB::beginTransaction();

        try {
            // Upload documents
            $validated['student_card'] = $this->fileUploadService->upload(
                $request->file('student_card'),
                'tutor-documents'
            );

            $validated['transcript'] = $this->fileUploadService->upload(
                $request->file('transcript'),
                'tutor-documents'
            );

            if ($request->hasFile('certificates')) {
                $certificates = [];
                foreach ($request->file('certificates') as $certificate) {
                    $certificates[] = $this->fileUploadService->upload(
                        $certificate,
                        'tutor-certificates'
                    );
                }
                $validated['certificates'] = $certificates;
            }

            $profile = new TutorProfile($validated);
            $profile->user_id = auth()->id();
            $profile->save();

            DB::commit();

            return redirect()
                ->route('tutors.show', $profile->id)
                ->with('success', 'Tutor profile created and pending verification');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    
    public function show(TutorProfile $tutorProfile)
    {
        $tutorProfile->load('user');
        $tutorProfile->student_card_url = $this->fileUploadService->getUrl($tutorProfile->student_card);
        $tutorProfile->transcript_url = $this->fileUploadService->getUrl($tutorProfile->transcript);
        $tutorProfile->certificate_urls = array_map(
            fn($cert) => $this->fileUploadService->getUrl($cert),
            $tutorProfile->certificates ?? []
        );
        
        return Inertia::render('Tutor/Show', [
            'tutor' => $tutorProfile
        ]);
    }

    /**
     * Show the form for editing the tutor profile.
     */
    public function edit(TutorProfile $tutorProfile)
    {
        $this->authorize('update', $tutorProfile);

        $tutorProfile->student_card_url = $this->fileUploadService->getUrl($tutorProfile->student_card);
        $tutorProfile->transcript_url = $this->fileUploadService->getUrl($tutorProfile->transcript);
        $tutorProfile->certificate_urls = array_map(
            fn($cert) => $this->fileUploadService->getUrl($cert),
            $tutorProfile->certificates ?? []
        );

        return Inertia::render('Tutor/Edit', [
            'tutor' => $tutorProfile
        ]);
    }

    /**
     * Update the specified tutor profile.
     */
    public function update(Request $request, TutorProfile $tutorProfile)
    {
        $this->authorize('update', $tutorProfile);

        $validated = $request->validate([
            'expertise_level' => ['required', Rule::in(['Undergraduate', 'Graduate', 'Professional'])],
            'bio' => 'required|string|max:1000',
            'subjects' => 'required|array|min:1',
            'hourly_rate' => 'required|numeric|min:0',
            'university' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'gpa' => 'required|numeric|between:0,4.00',
            'graduation_year' => 'required|integer|min:1900|max:2100',
            'student_card' => 'nullable|file|max:2048',
            'transcript' => 'nullable|file|max:2048',
            'certificates' => 'nullable|array',
            'certificates.*' => 'file|max:2048',
            'available_times' => 'required|array',
            'teaching_preferences' => 'required|array'
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('student_card')) {
                $this->fileUploadService->delete($tutorProfile->student_card);
                $validated['student_card'] = $this->fileUploadService->upload(
                    $request->file('student_card'),
                    'tutor-documents'
                );
            }

            if ($request->hasFile('transcript')) {
                $this->fileUploadService->delete($tutorProfile->transcript);
                $validated['transcript'] = $this->fileUploadService->upload(
                    $request->file('transcript'),
                    'tutor-documents'
                );
            }

            if ($request->hasFile('certificates')) {
                // Delete old certificates
                foreach ($tutorProfile->certificates ?? [] as $cert) {
                    $this->fileUploadService->delete($cert);
                }

                // Upload new certificates
                $certificates = [];
                foreach ($request->file('certificates') as $certificate) {
                    $certificates[] = $this->fileUploadService->upload(
                        $certificate,
                        'tutor-certificates'
                    );
                }
                $validated['certificates'] = $certificates;
            }

            $tutorProfile->update($validated);

            DB::commit();

            return redirect()
                ->route('tutors.show', $tutorProfile->id)
                ->with('success', 'Tutor profile updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function destroy(TutorProfile $tutorProfile)
    {
        $this->authorize('delete', $tutorProfile);

        DB::beginTransaction();

        try {
            // Delete all associated files
            $this->fileUploadService->delete($tutorProfile->student_card);
            $this->fileUploadService->delete($tutorProfile->transcript);
            
            foreach ($tutorProfile->certificates ?? [] as $cert) {
                $this->fileUploadService->delete($cert);
            }

            $tutorProfile->delete();

            DB::commit();

            return redirect()
                ->route('tutors.index')
                ->with('success', 'Tutor profile deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Display page for admin to verify tutors.
     */
    public function verificationPage()
    {
        $this->authorize('verify', TutorProfile::class);

        $tutors = TutorProfile::with('user')
            ->where('verification_status', 'pending')
            ->latest()
            ->paginate(10)
            ->through(function ($tutor) {
                $tutor->student_card_url = $this->fileUploadService->getUrl($tutor->student_card);
                $tutor->transcript_url = $this->fileUploadService->getUrl($tutor->transcript);
                $tutor->certificate_urls = collect($tutor->certificates ?? [])
                    ->map(fn($cert) => $this->fileUploadService->getUrl($cert))
                    ->filter()
                    ->values();
                return $tutor;
            });

        return Inertia::render('Tutor/Verification', [
            'tutors' => $tutors
        ]);
    }

    /**
    * Verify or reject a tutor profile.
    */
    public function verify(Request $request, TutorProfile $tutorProfile)
    {
        $this->authorize('verify', $tutorProfile);

        $validated = $request->validate([
            'verification_status' => ['required', Rule::in(['approved', 'rejected'])],
            'verification_note' => 'nullable|string|max:1000'
        ]);

        DB::beginTransaction();
        try {
            // Update profile
            $tutorProfile->update([
                'verification_status' => $validated['verification_status'],
                'verification_note' => $validated['verification_note'],
                'is_verified' => $validated['verification_status'] === 'approved',
                'verified_at' => $validated['verification_status'] === 'approved' ? now() : null
            ]);

            // Load user relation
            $tutorProfile->load('user');

            // Dispatch event based on status
            if ($validated['verification_status'] === 'approved') {
                event(new TutorVerified($tutorProfile));
            } else {
                event(new TutorRejected($tutorProfile));
            }

            DB::commit();

            return redirect()
                ->back()
                ->with('success', 'Tutor verification status updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Accept an offering.
     */
    public function acceptOffering(Request $request, Offering $offering)
    {
        $this->authorize('accept', $offering);

        DB::beginTransaction();
        try {
            // Update offering status
            $offering->update([
                'status' => 'accepted',
                'tutor_id' => auth()->id()
            ]);

            // Create earning record
            $commission = $offering->budget * 0.1; // 10% platform fee
            $tutorEarning = $offering->budget - $commission;

            Earning::create([
                'tutor_id' => auth()->id(),
                'offering_id' => $offering->id,
                'amount' => $tutorEarning,
                'status' => Earning::STATUS_PENDING
            ]);

            // Create notification
            $offering->user->notify(new OfferingAccepted($offering));

            DB::commit();

            return redirect()->back()->with('success', 'Offering accepted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return redirect()->back()->with('error', 'Failed to accept offering.');
        }
    }
}
