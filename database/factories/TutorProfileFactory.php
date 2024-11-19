<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\TutorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class TutorProfileFactory extends Factory
{
    protected $model = TutorProfile::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->tutor(),
            'expertise_level' => $this->faker->randomElement(['Undergraduate', 'Graduate', 'Professional']),
            'bio' => $this->faker->paragraph(),
            'subjects' => [
                'Mathematics',
                'Physics',
                'Computer Science'
            ],
            'hourly_rate' => $this->faker->numberBetween(50000, 200000),
            'university' => $this->faker->company() . ' University',
            'degree' => $this->faker->randomElement(['Bachelor', 'Master', 'Ph.D']),
            'major' => $this->faker->randomElement([
                'Computer Science',
                'Information Technology',
                'Mathematics',
                'Physics'
            ]),
            'gpa' => $this->faker->randomFloat(2, 3, 4),
            'graduation_year' => $this->faker->year(),
            'verification_status' => 'pending',
            'available_times' => [
                'monday' => ['09:00-12:00', '13:00-17:00'],
                'tuesday' => ['09:00-12:00', '13:00-17:00'],
                'wednesday' => ['09:00-12:00', '13:00-17:00'],
            ],
            'teaching_preferences' => [
                'mode' => ['online', 'offline'],
                'group_size' => ['individual', 'small_group'],
                'level' => ['beginner', 'intermediate', 'advanced']
            ],
            'is_available' => true,
            'completed_tasks' => $this->faker->numberBetween(0, 50),
            'total_earnings' => $this->faker->numberBetween(0, 5000000),
            'average_rating' => $this->faker->randomFloat(2, 3, 5),
            'total_reviews' => $this->faker->numberBetween(0, 100)
        ];
    }

    /**
     * Indicate that the tutor is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
            'verified_at' => now(),
            'verification_status' => 'approved'
        ]);
    }

    /**
     * Indicate that the tutor is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => false,
            'verification_status' => 'rejected',
            'verification_note' => 'Documents not valid'
        ]);
    }

    /**
     * Indicate that the tutor is not available.
     */
    public function unavailable(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_available' => false
        ]);
    }
}