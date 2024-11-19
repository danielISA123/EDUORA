<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\StudentDashboardUpdated;
use Illuminate\Support\Facades\Cache;

class UpdateStudentDashboard implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle($event): void
    {
        // Clear cache for student dashboard
        Cache::forget("student.dashboard.{$event->user->id}");

        // Broadcast update event
        broadcast(new StudentDashboardUpdated(
            $event->user,
            $event->updateType ?? 'general',
            $event->data ?? []
        ))->toOthers();
    }

    public function shouldQueue($event): bool
    {
        return true;
    }

    public function retryUntil()
    {
        return now()->addMinutes(5);
    }
}