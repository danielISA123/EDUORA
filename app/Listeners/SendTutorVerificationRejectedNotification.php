<?php

namespace App\Listeners;

use App\Events\TutorRejected;
use App\Notifications\TutorVerificationRejected;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendTutorVerificationRejectedNotification
{
    public function handle(TutorRejected $event): void
    {
        $user = $event->tutorProfile->user;
        if($user) {
            $user->notify(new TutorVerificationRejected($event->tutorProfile));
        }
    }
}