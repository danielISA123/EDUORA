<?php

// app/Providers/AuthServiceProvider.php
namespace App\Providers;

use App\Models\UserProfile;
use App\Models\TutorProfile;
use App\Policies\UserProfilePolicy;
use App\Policies\TutorProfilePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        UserProfile::class => UserProfilePolicy::class,
        TutorProfile::class => TutorProfilePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}