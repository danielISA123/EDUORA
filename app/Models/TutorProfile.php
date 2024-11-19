<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class TutorProfile extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'expertise_level',
        'bio',
        'subjects',
        'hourly_rate',
        'university',
        'degree',
        'major',
        'gpa',
        'graduation_year',
        'verification_status',
        'verification_note',
        'is_verified',
        'verified_at',
        'student_card',
        'transcript',
        'certificates',
        'available_times',
        'teaching_preferences',
        'is_available'
        
        
    ];

    protected $casts = [
        'subjects' => 'array',
        'certificates' => 'array',
        'available_times' => 'array',
        'teaching_preferences' => 'array',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'hourly_rate' => 'decimal:2',
        'gpa' => 'decimal:2',
        'average_rating' => 'decimal:2',
        'is_available' => 'boolean',
        'graduation_year' => 'integer',
        'completed_tasks' => 'integer',
        'total_earnings' => 'integer',
        'total_reviews' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getStudentCardUrlAttribute()
    {
        return $this->student_card ? Storage::disk('public')->url($this->student_card) : null;
    }

    public function getTranscriptUrlAttribute()
    {
        return $this->transcript ? Storage::disk('public')->url($this->transcript) : null;
    }

    public function getCertificateUrlsAttribute()
    {
        if (!$this->certificates) return [];
        return array_map(function($cert) {
            return Storage::disk('public')->url($cert);
        }, $this->certificates);
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }
}