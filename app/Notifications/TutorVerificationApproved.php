<?php

namespace App\Notifications;

use App\Models\TutorProfile;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TutorVerificationApproved extends Notification implements ShouldQueue
{
    use Queueable;

    public $tutorProfile;  // Ubah ke public agar bisa diakses di test

    public function __construct(TutorProfile $tutorProfile)
    {
        $this->tutorProfile = $tutorProfile;
        $this->afterCommit();  // Penting: memastikan notification dikirim setelah transaction commit
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Tutor Verification Approved')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Congratulations! Your tutor profile has been verified.')
            ->line('You can now start accepting student offerings.')
            ->action('View Your Profile', route('tutors.show', $this->tutorProfile->id))
            ->line('Thank you for choosing our platform!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'tutor_profile_id' => $this->tutorProfile->id,
            'message' => 'Your tutor profile has been verified.',
            'type' => 'verification_approved'
        ];
    }
}