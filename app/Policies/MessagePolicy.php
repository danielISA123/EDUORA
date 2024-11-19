<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;

    public function view(User $user, Message $message): bool
    {
        // User can view if they are the client or tutor of the offering
        return $user->id === $message->offering->user_id || 
               $user->id === $message->offering->tutor_id;
    }

    public function create(User $user, Message $message): bool
    {
        // Only allow messaging if offering is accepted
        return $message->offering->status === 'accepted' && 
               ($user->id === $message->offering->user_id || 
                $user->id === $message->offering->tutor_id);
    }

    public function delete(User $user, Message $message): bool
    {
        // Users can only delete their own messages within 5 minutes
        return $user->id === $message->user_id && 
               $message->created_at->diffInMinutes(now()) <= 5;
    }

    public function update(User $user, Message $message): bool
    {
        // Messages cannot be edited for integrity
        return false;
    }
}