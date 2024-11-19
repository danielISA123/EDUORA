<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Offering;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OfferingFilterTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test user
        $this->user = User::factory()->create([
            'role' => 'student'
        ]);

        // Create test offerings
        Offering::factory()->create([
            'title' => 'Math Assignment',
            'description' => 'Need help with calculus',
            'budget' => 100000,
            'status' => 'pending'
        ]);

        Offering::factory()->create([
            'title' => 'Physics Project',
            'description' => 'Physics homework help needed',
            'budget' => 200000,
            'status' => 'open'
        ]);

        Offering::factory()->create([
            'title' => 'Programming Assignment',
            'description' => 'Help with Python coding',
            'budget' => 300000,
            'status' => 'completed'
        ]);
    }

    public function test_can_filter_offerings_by_search()
    {
        $response = $this->actingAs($this->user)
            ->get('/offerings?search=physics');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Offerings/Index')
                ->has('offerings.data', 1)
                ->where('offerings.data.0.title', 'Physics Project')
            );
    }

    public function test_can_filter_offerings_by_status()
    {
        $response = $this->actingAs($this->user)
            ->get('/offerings?status=pending');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Offerings/Index')
                ->has('offerings.data', 1)
                ->where('offerings.data.0.status', 'pending')
            );
    }

    public function test_can_filter_offerings_by_budget_range()
    {
        $response = $this->actingAs($this->user)
            ->get('/offerings?min_budget=150000&max_budget=250000');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Offerings/Index')
                ->has('offerings.data', 1)
                ->where('offerings.data.0.budget', 200000)
            );
    }

    public function test_can_sort_offerings_by_budget_high_to_low()
    {
        $response = $this->actingAs($this->user)
            ->get('/offerings?sort=budget_high');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Offerings/Index')
                ->has('offerings.data', 3)
                ->where('offerings.data.0.budget', 300000)
            );
    }

    public function test_search_returns_empty_when_no_matches()
    {
        $response = $this->actingAs($this->user)
            ->get('/offerings?search=nonexistent');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Offerings/Index')
                ->has('offerings.data', 0)
            );
    }

    public function test_filters_are_passed_to_view()
    {
        $filters = [
            'search' => 'math',
            'status' => 'pending',
            'min_budget' => 50000,
            'max_budget' => 150000,
            'sort' => 'latest'
        ];

        $response = $this->actingAs($this->user)
            ->get('/offerings?' . http_build_query($filters));

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Offerings/Index')
                ->where('filters', $filters)
            );
    }
}