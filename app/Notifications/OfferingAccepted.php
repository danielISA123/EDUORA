<?php

namespace App\Notifications;

use App\Models\Offering;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OfferingAccepted extends Notification implements ShouldQueue
{
    use Queueable;

    protected $offering;

    public function __construct(Offering $offering)
    {
        $this->offering = $offering;
        $this->afterCommit();
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Offering Has Been Accepted')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Your offering "' . $this->offering->title . '" has been accepted by a tutor.')
            ->line('You can now start communicating with your tutor to discuss the details.')
            ->action('View Offering', route('offerings.show', $this->offering))
            ->line('Thank you for using our platform!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'offering_id' => $this->offering->id,
            'title' => $this->offering->title,
            'tutor_name' => $this->offering->tutor->name,
            'message' => 'Your offering has been accepted by a tutor.',
            'type' => 'offering_accepted'
        ];
    }
}