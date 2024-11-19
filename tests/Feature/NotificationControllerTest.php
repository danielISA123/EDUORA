<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\DatabaseNotification;
use Tests\TestCase;
use Illuminate\Support\Str;

class NotificationControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $notification;

    protected function setUp(): void
    {
        parent::setUp();

        // Create user
        $this->user = User::factory()->create();

        // Create notification
        $this->notification = DatabaseNotification::create([
            'id' => Str::uuid(),
            'type' => 'App\Notifications\TutorVerificationApproved',
            'notifiable_type' => User::class,
            'notifiable_id' => $this->user->id,
            'data' => [
                'message' => 'Test notification',
                'type' => 'verification_approved'
            ],
            'read_at' => null
        ]);
    }

    public function test_user_can_fetch_notifications()
    {
        $response = $this->actingAs($this->user)
            ->get('/notifications');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'type',
                    'data',
                    'read_at',
                    'created_at'
                ]
            ]);
    }

    public function test_user_can_mark_notification_as_read()
    {
        $response = $this->actingAs($this->user)
            ->post("/notifications/{$this->notification->id}/read");

        $response->assertStatus(200);
        $this->assertNotNull($this->notification->fresh()->read_at);
    }

    public function test_user_cannot_mark_others_notification_as_read()
    {
        $otherUser = User::factory()->create();

        $response = $this->actingAs($otherUser)
            ->post("/notifications/{$this->notification->id}/read");

        $response->assertStatus(403);
        $this->assertNull($this->notification->fresh()->read_at);
    }

    public function test_user_can_mark_all_notifications_as_read()
    {
        // Create additional unread notification
        DatabaseNotification::create([
            'id' => Str::uuid(),
            'type' => 'App\Notifications\TutorVerificationRejected',
            'notifiable_type' => User::class,
            'notifiable_id' => $this->user->id,
            'data' => ['message' => 'Another test'],
            'read_at' => null
        ]);

        $response = $this->actingAs($this->user)
            ->post('/notifications/read-all');

        $response->assertStatus(200);
        $this->assertEquals(0, $this->user->unreadNotifications()->count());
    }
}