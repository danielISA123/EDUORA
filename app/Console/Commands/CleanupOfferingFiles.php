<?php

namespace App\Console\Commands;

use App\Models\Offering;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupOfferingFiles extends Command
{
    protected $signature = 'offerings:cleanup-files';
    protected $description = 'Cleanup old files from cancelled and completed offerings';

    public function handle()
    {
        $this->info('Starting files cleanup...');

        try {
            // Get old completed/cancelled offerings
            $offerings = Offering::where(function($query) {
                    $query->where('status', 'completed')
                        ->orWhere('status', 'cancelled');
                })
                ->where('updated_at', '<', now()->subDays(30))
                ->whereNotNull('attachments')
                ->get();

            $count = 0;
            foreach ($offerings as $offering) {
                foreach ($offering->attachments as $attachment) {
                    if (Storage::disk('public')->exists($attachment['path'])) {
                        Storage::disk('public')->delete($attachment['path']);
                        $count++;
                    }
                }

                // Update offering to mark files as cleaned
                $offering->update([
                    'attachments' => null,
                    'files_cleaned_at' => now()
                ]);
            }

            $this->info("Successfully cleaned up {$count} files.");
            \Log::info("Offering files cleanup completed: {$count} files removed");

        } catch (\Exception $e) {
            $this->error('Failed to cleanup files: ' . $e->getMessage());
            \Log::error('Offering files cleanup failed: ' . $e->getMessage());
        }
    }
}