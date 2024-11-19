<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    use AuthorizesRequests;
    
    protected $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    /**
     * Display a listing of the profiles.
     */
    public function index()
    {
        $profiles = UserProfile::with('user')
            ->whereHas('user', function($query) {
                $query->where('role', 'student');
            })
            ->latest()
            ->paginate(10)
            ->through(function ($profile) {
                $profile->profile_picture_url = $this->fileUploadService->getUrl($profile->profile_picture);
                return $profile;
            });

        return Inertia::render('Profile/Index', [
            'profiles' => $profiles
        ]);
    }

    /**
     * Show the form for creating a new profile.
     */
    public function create()
    {
        // Check if user already has a profile
        if (auth()->user()->profile()->exists()) {
            return redirect()->route('profiles.edit', auth()->user()->profile->id);
        }

        return Inertia::render('Profile/Create');
    }

    /**
     * Store a newly created profile in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'education_level' => ['required', Rule::in(['SMP', 'SMA', 'D3', 'S1', 'S2'])],
            'school_name' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'profile_picture' => 'nullable|image|max:2048'
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('profile_picture')) {
                $validated['profile_picture'] = $this->fileUploadService->upload(
                    $request->file('profile_picture'),
                    'profile-pictures'
                );
            }

            $profile = auth()->user()->profile()->create($validated);

            DB::commit();

            return redirect()
                ->route('profiles.show', $profile)
                ->with('success', 'Profile created successfully');

        } catch (\Exception $e) {
            DB::rollBack();
            
            if (isset($validated['profile_picture'])) {
                $this->fileUploadService->delete($validated['profile_picture']);
            }
            
            throw $e;
        }
    }

    /**
     * Display the specified profile.
     */
    public function show(UserProfile $profile)
    {
        $profile->load('user');
        $profile->profile_picture_url = $this->fileUploadService->getUrl($profile->profile_picture);
        
        return Inertia::render('Profile/Show', [
            'profile' => $profile
        ]);
    }

    /**
     * Show the form for editing the specified profile.
     */
    public function edit(UserProfile $profile)
    {
        $this->authorize('update', $profile);
        $profile->profile_picture_url = $this->fileUploadService->getUrl($profile->profile_picture);

        return Inertia::render('Profile/Form', [
            'profile' => $profile,
            'isEditing' => true
        ]);
    }

    /**
     * Update the specified profile in storage.
     */
    public function update(Request $request, UserProfile $profile)
    {
        $this->authorize('update', $profile);

        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'birth_date' => 'nullable|date',
            'education_level' => ['nullable', Rule::in(['smp', 'sma', 'university'])],
            'school_name' => 'nullable|string|max:100',
            'major' => 'nullable|string|max:100',
            'graduation_year' => 'nullable|integer|min:1900|max:2100',
            'profile_picture' => 'nullable|image|max:2048',
            'notification_enabled' => 'boolean',
            'language_preference' => ['required', Rule::in(['id', 'en'])],
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('profile_picture')) {
                // Delete old picture
                $this->fileUploadService->delete($profile->profile_picture);
                
                // Upload new picture
                $validated['profile_picture'] = $this->fileUploadService->upload(
                    $request->file('profile_picture'),
                    'profile-pictures'
                );
            }

            $profile->update($validated);

            DB::commit();

            return redirect()
                ->route('profiles.show', $profile->id)
                ->with('success', 'Profile updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            
            if (isset($validated['profile_picture'])) {
                $this->fileUploadService->delete($validated['profile_picture']);
            }
            
            throw $e;
        }
    }

    /**
     * Remove the specified profile from storage.
     */
    public function destroy(UserProfile $profile)
    {
        $this->authorize('delete', $profile);

        DB::beginTransaction();
        
        try {
            // Delete profile picture if exists
            if ($profile->profile_picture) {
                $this->fileUploadService->delete($profile->profile_picture);
            }

            // Force delete the profile
            $profile->forceDelete();

            DB::commit();

            return redirect()
                ->route('profiles.index')
                ->with('success', 'Profile deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}