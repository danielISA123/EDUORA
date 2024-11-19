<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin account
        $admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'role' => 'student',
            'email_verified_at' => now()
        ]);

        UserProfile::create([
            'user_id' => $admin->id,
            'full_name' => 'Admin Test Account',
            'is_verified' => true,
            'verified_at' => now(),
            'education_level' => 'university',
            'status' => 'active',
            'language_preference' => 'id',
            'notification_enabled' => true
        ]);

        // Create 5 students with profiles
        for ($i = 0; $i < 5; $i++) {
            $user = User::factory()->student()->create();
            UserProfile::factory()->verified()->create([
                'user_id' => $user->id
            ]);
        }

        // Create 3 unverified students
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->student()->create();
            UserProfile::factory()->create([
                'user_id' => $user->id,
                'is_verified' => false
            ]);
        }
    }
}