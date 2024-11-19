<?php

namespace App\Events;

use App\Models\Offering;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AttachmentsUploaded implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $offering;
    public $attachmentCount;

    public function __construct(Offering $offering, int $attachmentCount)
    {
        $this->offering = $offering;
        $this->attachmentCount = $attachmentCount;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('offering.'.$this->offering->id)
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'offering_id' => $this->offering->id,
            'attachment_count' => $this->attachmentCount,
            'message' => "{$this->attachmentCount} new files were uploaded"
        ];
    }
}