<?php

namespace App\Notifications;

use App\Models\TutorProfile;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TutorVerificationRejected extends Notification implements ShouldQueue
{
    use Queueable;

    public $tutorProfile;

    public function __construct(TutorProfile $tutorProfile)
    {
        $this->tutorProfile = $tutorProfile;
        $this->afterCommit();
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Tutor Verification Update')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->error()  // Memberikan indikasi visual bahwa ini rejection notification
            ->line('We have reviewed your tutor profile application.')
            ->line('Unfortunately, we cannot verify your profile at this time.')
            ->lineIf($this->tutorProfile->verification_note, 
                'Reason: ' . $this->tutorProfile->verification_note)
            ->line('You can update your profile and submit for verification again.')
            ->action('Update Your Profile', route('tutors.edit', $this->tutorProfile->id))
            ->line('If you need assistance, please contact our support team.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'tutor_profile_id' => $this->tutorProfile->id,
            'message' => 'Your tutor profile verification was not approved.',
            'reason' => $this->tutorProfile->verification_note,
            'type' => 'verification_rejected'
        ];
    }
}