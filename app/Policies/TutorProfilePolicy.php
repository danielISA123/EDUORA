<?php

namespace App\Policies;

use App\Models\User;
use App\Models\TutorProfile;
use Illuminate\Auth\Access\HandlesAuthorization;

class TutorProfilePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Semua user bisa lihat list tutor
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TutorProfile $tutorProfile): bool
    {
        return true; // Semua user bisa lihat detail tutor
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Hanya user dengan role tutor yang belum punya profile
        return $user->isTutor() && !$user->tutorProfile()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TutorProfile $tutorProfile): bool
    {
        // Tutor hanya bisa update profilenya sendiri
        return $user->id === $tutorProfile->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TutorProfile $tutorProfile): bool
    {
        return $user->id === $tutorProfile->user_id;
    }

    /**
     * Determine whether the user can verify tutors.
     */
    public function verify(User $user, TutorProfile $tutorProfile): bool
    {
        return $user->is_admin && $user->role === 'admin';
    }
}