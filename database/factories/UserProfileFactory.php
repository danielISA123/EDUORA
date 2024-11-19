<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'full_name' => fake()->name(),
            'phone_number' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'gender' => fake()->randomElement(['male', 'female']),
            'birth_date' => fake()->date(),
            'education_level' => fake()->randomElement(['smp', 'sma', 'university']),
            'school_name' => fake()->company() . ' School',
            'major' => fake()->randomElement(['IPA', 'IPS', 'Teknik Informatika', 'Manajemen']),
            'graduation_year' => fake()->year(),
            'notification_enabled' => true,
            'language_preference' => 'id',
            'completed_tasks' => fake()->numberBetween(0, 50),
            'total_spent' => fake()->numberBetween(0, 1000000),
            'average_rating' => fake()->randomFloat(2, 1, 5),
            'is_verified' => fake()->boolean(),
            'verified_at' => fake()->optional()->dateTime(),
            'status' => 'active'
        ];
    }

    /**
     * Indicate that the profile is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
            'verified_at' => now(),
        ]);
    }

    /**
     * Indicate that the profile is for a student.
     */
    public function student(): static
    {
        return $this->state(fn (array $attributes) => [
            'education_level' => fake()->randomElement(['smp', 'sma', 'university']),
            'user_id' => User::factory()->student(),
        ]);
    }
}