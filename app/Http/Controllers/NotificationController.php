<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\View;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()
            ->notifications()
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($notification) {
                $data = $notification->data;
                
                // Add additional fields for frontend
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'data' => $data,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at->toISOString(),
                    'is_read' => !is_null($notification->read_at),
                    'icon' => $this->getNotificationIcon($notification->type),
                    'action_url' => $data['action_url'] ?? null,
                    'action_text' => $data['action_text'] ?? null,
                ];
            });

        return response()->json($notifications);
    }

    protected function getNotificationIcon($type)
    {
        return match ($type) {
            'App\Notifications\TutorVerificationApproved' => 'check-circle',
            'App\Notifications\TutorVerificationRejected' => 'x-circle',
            default => 'bell'
        };
    }

    public function markAsRead(DatabaseNotification $notification)
    {
        if ($notification->notifiable_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $notification->markAsRead();
        $this->trackNotificationRead($notification);

        return response()->json([
            'message' => 'Notification marked as read',
            'notification' => $notification
        ]);
    }

    public function markAllAsRead(Request $request)
    {
        $notifications = $request->user()->unreadNotifications;
        $notifications->each(function ($notification) {
            $notification->markAsRead();
            $this->trackNotificationRead($notification);
        });

        return response()->json([
            'message' => 'All notifications marked as read',
            'count' => $notifications->count()
        ]);
    }

    protected function trackNotificationRead($notification)
    {
        // Future: Add analytics tracking here
        logger()->info('Notification read', [
            'notification_id' => $notification->id,
            'user_id' => auth()->id(),
            'type' => $notification->type
        ]);
    }
}