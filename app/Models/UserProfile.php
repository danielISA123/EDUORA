<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class UserProfile extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'full_name',
        'phone_number',
        'address',
        'gender',
        'birth_date',
        'education_level',
        'school_name',
        'major',
        'graduation_year',
        'profile_picture',
        'notification_enabled',
        'language_preference',
        'completed_tasks',
        'total_spent',
        'average_rating',
        'is_verified',
        'verified_at',
        'status'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'birth_date' => 'date',
        'graduation_year' => 'integer',
        'notification_enabled' => 'boolean',
        'completed_tasks' => 'integer',
        'total_spent' => 'integer',
        'average_rating' => 'decimal:2',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the profile picture URL attribute.
     *
     * @return string|null
     */
    public function getProfilePictureUrlAttribute()
    {
        if (!$this->profile_picture) {
            return null;
        }
        return Storage::disk('public')->url($this->profile_picture);
    }

    /**
     * Get user's full educational information.
     *
     * @return string
     */
    public function getEducationInfoAttribute()
    {
        return "{$this->education_level} - {$this->school_name}" . 
               ($this->major ? " ({$this->major})" : '');
    }

    /**
     * Check if user is active.
     *
     * @return bool
     */
    public function isActive()
    {
        return $this->status === 'active';
    }

    /**
     * Get user's verification status with timestamp.
     *
     * @return string
     */
    public function getVerificationStatusAttribute()
    {
        if (!$this->is_verified) {
            return 'Belum Terverifikasi';
        }
        return 'Terverifikasi pada ' . $this->verified_at->format('d M Y H:i');
    }

    /**
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include verified users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }
}