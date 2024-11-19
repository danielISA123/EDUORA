<?php

use App\Models\Offering;
use Illuminate\Support\Facades\Broadcast;

// Channel untuk authorization offering antara user dan tutor
Broadcast::channel('offering.{offering}', function ($user, Offering $offering) {
    return $user->id === $offering->user_id || 
           $user->id === $offering->tutor_id;
});

// Channel untuk authorization student dashboard
Broadcast::channel('student.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

// Public channel untuk semua offerings
Broadcast::channel('offerings', function ($user) {
    return true;
});

// Private channel untuk specific offering
Broadcast::channel('offering.{offering}', function ($user, Offering $offering) {
    return $user->id === $offering->user_id || 
           $user->id === $offering->tutor_id ||
           $user->isAdmin();
});