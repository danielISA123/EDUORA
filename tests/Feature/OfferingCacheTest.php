<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Offering;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class OfferingCacheTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Clear cache before each test
        Cache::flush();
        
        // Create test user
        $this->user = User::factory()->create([
            'role' => 'student'
        ]);
    }

    public function test_offerings_are_cached()
    {
        Offering::factory()->count(3)->create();

        // First request should cache the results
        $firstResponse = $this->actingAs($this->user)
            ->get('/offerings');
        
        // Modify data in database
        Offering::first()->update(['title' => 'Modified Title']);
        
        // Second request should return cached results
        $secondResponse = $this->actingAs($this->user)
            ->get('/offerings');
            
        // Responses should be identical (cached)
        $this->assertEquals(
            $firstResponse->getData()->offering,
            $secondResponse->getData()->offering
        );
    }

    public function test_cache_is_cleared_on_new_offering()
    {
        Offering::factory()->count(3)->create();

        // Cache initial offerings
        $this->actingAs($this->user)
            ->get('/offerings');

        // Create new offering
        $newOffering = [
            'title' => 'New Test Offering',
            'description' => 'Test Description',
            'budget' => 100000,
            'deadline' => now()->addDays(5),
        ];

        $this->actingAs($this->user)
            ->post('/offerings', $newOffering);

        // Get offerings again, should include new offering
        $response = $this->actingAs($this->user)
            ->get('/offerings');

        $response->assertInertia(fn ($page) => $page
            ->component('Offerings/Index')
            ->has('offerings.data', 4)
            ->where('offerings.data.0.title', 'New Test Offering')
        );
    }

    public function test_cache_is_cleared_on_offering_update()
    {
        $offering = Offering::factory()->create([
            'title' => 'Original Title'
        ]);

        // Cache initial offerings
        $this->actingAs($this->user)
            ->get('/offerings');

        // Update offering
        $this->actingAs($this->user)
            ->put("/offerings/{$offering->id}", [
                'title' => 'Updated Title',
                'description' => $offering->description,
                'budget' => $offering->budget,
                'deadline' => $offering->deadline,
            ]);

        // Get offerings again, should show updated title
        $response = $this->actingAs($this->user)
            ->get('/offerings');

        $response->assertInertia(fn ($page) => $page
            ->component('Offerings/Index')
            ->has('offerings.data', 1)
            ->where('offerings.data.0.title', 'Updated Title')
        );
    }

    public function test_cache_varies_by_filters()
    {
        Offering::factory()->count(3)->create();

        // Get offerings with different filters
        $responseAll = $this->actingAs($this->user)
            ->get('/offerings');

        $responseFiltered = $this->actingAs($this->user)
            ->get('/offerings?status=pending');

        // Responses should be different
        $this->assertNotEquals(
            $responseAll->getData()->offerings,
            $responseFiltered->getData()->offerings
        );
    }

    public function test_cache_is_cleared_on_offering_delete()
    {
        $offering = Offering::factory()->create();

        // Cache initial offerings
        $this->actingAs($this->user)
            ->get('/offerings');

        // Delete offering
        $this->actingAs($this->user)
            ->delete("/offerings/{$offering->id}");

        // Get offerings again, should be empty
        $response = $this->actingAs($this->user)
            ->get('/offerings');

        $response->assertInertia(fn ($page) => $page
            ->component('Offerings/Index')
            ->has('offerings.data', 0)
        );
    }
}