<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\WebPushMessage;

class DashboardUpdate extends Notification implements ShouldQueue
{
    use Queueable;

    protected $type;
    protected $data;

    public function __construct(string $type, array $data)
    {
        $this->type = $type;
        $this->data = $data;
        $this->afterCommit();
    }

    public function via($notifiable): array
    {
        return ['database', 'broadcast', 'webPush'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => $this->type,
            'data' => $this->data,
            'timestamp' => now()->toISOString()
        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'type' => $this->type,
            'data' => $this->data,
            'timestamp' => now()->toISOString()
        ]);
    }

    public function toWebPush($notifiable): WebPushMessage
    {
        return (new WebPushMessage)
            ->title($this->getTitle())
            ->icon('/notification-icon.png')
            ->badge('/badge-icon.png')
            ->body($this->getBody())
            ->action('View Dashboard', 'view')
            ->data(['url' => '/dashboard']);
    }

    private function getTitle(): string
    {
        return match($this->type) {
            'offering_updated' => 'Assignment Update',
            'new_message' => 'New Message',
            'deadline_approaching' => 'Deadline Reminder',
            default => 'Dashboard Update'
        };
    }

    private function getBody(): string
    {
        return match($this->type) {
            'offering_updated' => "Your assignment '{$this->data['title']}' has been updated",
            'new_message' => "New message from {$this->data['sender']}",
            'deadline_approaching' => "Assignment '{$this->data['title']}' is due soon",
            default => 'You have new updates on your dashboard'
        };
    }
}