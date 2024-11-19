<?php

namespace App\Listeners;

use App\Events\TutorVerified;
use App\Notifications\TutorVerificationApproved;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendTutorVerificationApprovedNotification
{
    public function handle(TutorVerified $event): void
    {
        $user = $event->tutorProfile->user;
        if($user) {
            $user->notify(new TutorVerificationApproved($event->tutorProfile));
        }
    }
}