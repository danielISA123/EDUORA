<?php

namespace App\Events;

use App\Models\Offering;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OfferingCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $offering;

    public function __construct(Offering $offering)
    {
        $this->offering = $offering->load('user:id,name');
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('offerings')
        ];
    }

    public function broadcastAs(): string
    {
        return 'offering.created';
    }
}