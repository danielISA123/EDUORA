<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StudentDashboardUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $updateType;
    public $data;

    public function __construct(User $user, string $updateType, array $data)
    {
        $this->user = $user;
        $this->updateType = $updateType;
        $this->data = $data;
        $this->afterCommit();
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('student.'.$this->user->id)
        ];
    }

    public function broadcastAs(): string
    {
        return 'dashboard.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'type' => $this->updateType,
            'data' => $this->data,
            'timestamp' => now()->toISOString()
        ];
    }
}