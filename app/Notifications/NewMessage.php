<?php

namespace App\Notifications;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewMessage extends Notification implements ShouldQueue
{
    use Queueable;

    protected $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
        $this->afterCommit();
    }

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $offering = $this->message->offering;
        
        return (new MailMessage)
            ->subject('New Message in ' . $offering->title)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('You have received a new message from ' . $this->message->user->name)
            ->line('Message: ' . \Str::limit($this->message->content, 100))
            ->action('View Conversation', route('messages.index', $offering->id))
            ->line('Thank you for using our platform!');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'message_id' => $this->message->id,
            'offering_id' => $this->message->offering_id,
            'offering_title' => $this->message->offering->title,
            'sender_name' => $this->message->user->name,
            'content_preview' => \Str::limit($this->message->content, 100),
            'type' => 'new_message'
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toDatabase($notifiable));
    }
}