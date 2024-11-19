<?php

namespace App\Console\Commands;

use App\Models\Offering;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CleanupAttachments extends Command
{
    protected $signature = 'offerings:cleanup-attachments';
    protected $description = 'Cleanup old attachments from completed/cancelled offerings';

    public function handle()
    {
        try {
            $this->info('Starting attachments cleanup...');
            
            $count = 0;
            $offerings = Offering::whereIn('status', ['completed', 'cancelled'])
                ->where('updated_at', '<', now()->subDays(30))
                ->whereNotNull('attachments')
                ->get();

            foreach ($offerings as $offering) {
                $count += count($offering->attachments ?? []);
                Offering::cleanupOldAttachments();
            }

            $this->info("Successfully cleaned up {$count} attachments.");
            Log::info("Attachment cleanup completed: {$count} files removed");

        } catch (\Exception $e) {
            $this->error('Failed to cleanup attachments: ' . $e->getMessage());
            Log::error('Attachment cleanup failed: ' . $e->getMessage());
        }
    }
}