<?php

namespace App\Events;

use App\Models\Offering;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OfferingUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $offering;

    public function __construct(Offering $offering)
    {
        $this->offering = $offering->load(['user:id,name', 'tutor:id,name']);
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('offerings'),
            new Channel('offering.'.$this->offering->id)
        ];
    }

    public function broadcastAs(): string
    {
        return 'offering.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'offering' => $this->offering,
            'message' => "Offering {$this->offering->title} has been updated"
        ];
    }
}