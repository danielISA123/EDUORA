<?php

namespace App\Policies;

use App\Models\Offering;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OfferingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Offering $offering): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->isStudent();
    }

    public function update(User $user, Offering $offering): bool
    {
        return $user->id === $offering->user_id && $offering->isPending();
    }

    public function delete(User $user, Offering $offering): bool
    {
        return $user->id === $offering->user_id && 
               ($offering->isPending() || $offering->isOpen());
    }

    public function accept(User $user, Offering $offering): bool
    {
        return $user->isTutor() && 
               $offering->status === 'pending' && 
               $user->is_verified && 
               !$offering->tutor_id;
    }
}
