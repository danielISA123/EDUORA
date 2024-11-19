<?php

namespace App\Notifications;

use App\Models\Offering;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Queue\ShouldQueue;

class AttachmentUploaded extends Notification implements ShouldQueue
{
    use Queueable;

    protected $offering;
    protected $attachmentCount;

    public function __construct(Offering $offering, int $attachmentCount)
    {
        $this->offering = $offering;
        $this->attachmentCount = $attachmentCount;
        $this->afterCommit();
    }

    public function via($notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Attachments Added to Offering')
            ->greeting('Hello ' . $notifiable->name)
            ->line("{$this->attachmentCount} new files were added to offering: {$this->offering->title}")
            ->action('View Offering', url("/offerings/{$this->offering->id}"))
            ->line('Thank you for using our platform!');
    }

    public function toArray($notifiable): array
    {
        return [
            'offering_id' => $this->offering->id,
            'title' => $this->offering->title,
            'attachment_count' => $this->attachmentCount,
            'message' => "{$this->attachmentCount} new files were added to offering",
            'type' => 'attachment_uploaded'
        ];
    }
}