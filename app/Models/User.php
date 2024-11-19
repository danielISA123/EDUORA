<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Available user roles
     */
    const ROLE_STUDENT = 'student';
    const ROLE_TUTOR = 'tutor';
    const ROLE_ADMIN = 'admin';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_verified',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    /**
     * Get all available roles
     */
    public static function getRoles(): array
    {
        return [
            self::ROLE_STUDENT,
            self::ROLE_TUTOR,
            self::ROLE_ADMIN
        ];
    }

    /**
     * Get the user's profile (for students).
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Get the user's tutor profile (for tutors).
     */
    public function tutorProfile(): HasOne
    {
        return $this->hasOne(TutorProfile::class);
    }

    /**
     * Get user's offerings (for students)
     */
    public function offerings(): HasMany
    {
        return $this->hasMany(Offering::class, 'user_id');
    }

    /**
     * Check if user is a student.
     */
    public function isStudent(): bool
    {
        return $this->role === self::ROLE_STUDENT;
    }

    /**
     * Check if user is a tutor.
     */
    public function isTutor(): bool
    {
        return $this->role === self::ROLE_TUTOR;
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /**
     * Check if user has a specific role.
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Get user's full name from profile.
     */
    public function getFullNameAttribute(): string
    {
        if ($this->isTutor()) {
            return $this->tutorProfile ? $this->tutorProfile->full_name : $this->name;
        }
        return $this->profile ? $this->profile->full_name : $this->name;
    }

    /**
     * Get the user's earnings (for tutors).
     */
    public function earnings(): HasMany
    {
        return $this->hasMany(Earning::class, 'tutor_id');
    }

    /**
     * Get the offerings accepted by the tutor.
     */
    public function acceptedOfferings(): HasMany
    {
        return $this->hasMany(Offering::class, 'tutor_id');
    }

    /**
     * Get user's active offerings
     */
    public function activeOfferings(): HasMany
    {
        return $this->offerings()->whereIn('status', ['pending', 'accepted']);
    }

    /**
     * Get user's completed offerings
     */
    public function completedOfferings(): HasMany
    {
        return $this->offerings()->where('status', 'completed');
    }

    /**
     * Check if user is verified
     */
    public function isVerified(): bool
    {
        return $this->is_verified && $this->verified_at !== null;
    }

    /**
     * Verify the user
     */
    public function verify(): bool
    {
        return $this->update([
            'is_verified' => true,
            'verified_at' => Carbon::now()
        ]);
    }

    /**
     * Get user's messages
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id')
            ->orWhere('receiver_id', $this->id);
    }

    /**
     * Get user's unread messages count
     */
    public function getUnreadMessagesCountAttribute(): int
    {
        return $this->messages()
            ->where('receiver_id', $this->id)
            ->whereNull('read_at')
            ->count();
    }

    /**
     * Get user's notification preferences
     */
    public function notificationPreferences(): HasOne
    {
        return $this->hasOne(NotificationPreference::class);
    }
}