<?php

namespace App\Events;

use App\Models\TutorProfile;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TutorVerified
{
    use Dispatchable, SerializesModels;

    public $tutorProfile;

    public function __construct(TutorProfile $tutorProfile)
    {
        $this->tutorProfile = $tutorProfile;
    }
}