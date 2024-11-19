<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\TutorProfile;
use Illuminate\Database\Seeder;

class TutorsTableSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin tutor account for testing
        $adminTutor = User::factory()->create([
            'name' => 'Admin Tutor',
            'email' => 'tutor@test.com',
            'password' => bcrypt('password'),
            'role' => 'tutor',
            'email_verified_at' => now()
        ]);

        TutorProfile::factory()->create([
            'user_id' => $adminTutor->id,
            'expertise_level' => 'Professional',
            'is_verified' => true,
            'verified_at' => now(),
            'verification_status' => 'approved',
            'subjects' => ['Mathematics', 'Physics', 'Programming'],
            'university' => 'Top University',
            'degree' => 'Master',
            'major' => 'Computer Science',
            'gpa' => 3.9,
        ]);

        // Create 5 verified tutors
        User::factory()
            ->count(5)
            ->tutor()
            ->has(
                TutorProfile::factory()
                    ->verified()
                    ->state(function (array $attributes, User $user) {
                        return ['university' => 'University of ' . fake()->city];
                    })
            )
            ->create();

        // Create 3 unverified tutors
        User::factory()
            ->count(3)
            ->tutor()
            ->has(TutorProfile::factory()->state(['verification_status' => 'pending']))
            ->create();

        // Create 2 rejected tutors
        User::factory()
            ->count(2)
            ->tutor()
            ->has(TutorProfile::factory()->rejected())
            ->create();
    }
}