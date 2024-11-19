<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Offering extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'budget',
        'deadline',
        'attachments',
        'status',
        'last_activity_at',
        'attachment_count',
        'total_attachment_size'
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'deadline' => 'datetime',
        'attachments' => 'array',
        'last_activity_at' => 'datetime',
        'total_attachment_size' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Status check methods
    public function isPending()
    {
        return $this->status === 'pending';
    }

    public function isOpen()
    {
        return $this->status === 'open';
    }

    public function isAccepted()
    {
        return $this->status === 'accepted';
    }

    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }

    // Scope for filtering
    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        });

        $query->when($filters['status'] ?? null, function ($query, $status) {
            $query->where('status', $status);
        });

        $query->when($filters['min_budget'] ?? null, function ($query, $minBudget) {
            $query->where('budget', '>=', $minBudget);
        });

        $query->when($filters['max_budget'] ?? null, function ($query, $maxBudget) {
            $query->where('budget', '<=', $maxBudget);
        });
    }

    // Boot the model
    protected static function boot()
    {
        parent::boot();

        // Delete files when offering is deleted
        static::deleting(function ($offering) {
            if ($offering->attachments) {
                foreach ($offering->attachments as $attachment) {
                    Storage::disk('public')->delete($attachment['path']);
                }
            }
        });

        // Update attachment stats
        static::saving(function ($offering) {
            if ($offering->isDirty('attachments')) {
                $attachments = $offering->attachments ?? [];
                $offering->attachment_count = count($attachments);
                $offering->total_attachment_size = collect($attachments)
                    ->sum('size');
            }
            $offering->last_activity_at = now();
        });
    }

    // Get readable file size
    public function getReadableFileSizeAttribute()
    {
        $bytes = $this->total_attachment_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.2f %s", $bytes / pow(1024, $factor), $units[$factor]);
    }

    // Check if offering has attachments
    public function hasAttachments(): bool
    {
        return !empty($this->attachments);
    }

    // Get attachment by index
    public function getAttachment(int $index): ?array
    {
        return $this->attachments[$index] ?? null;
    }

    // Clean up old attachments
    public static function cleanupOldAttachments()
    {
        // Delete attachments older than 30 days for completed/cancelled offerings
        $oldOfferings = static::whereIn('status', ['completed', 'cancelled'])
            ->where('updated_at', '<', now()->subDays(30))
            ->whereNotNull('attachments')
            ->get();

        foreach ($oldOfferings as $offering) {
            foreach ($offering->attachments as $attachment) {
                Storage::disk('public')->delete($attachment['path']);
            }
            $offering->update(['attachments' => null]);
        }
    }
}
