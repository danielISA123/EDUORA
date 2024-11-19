<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\TutorProfile;
use App\Notifications\TutorVerificationApproved;
use App\Notifications\TutorVerificationRejected;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class TutorVerificationNotificationTest extends TestCase
{
    use RefreshDatabase;

    protected $tutor;
    protected $tutorProfile;
    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Fake notifications
        Notification::fake();

        // Create tutor user
        $this->tutor = User::factory()->create([
            'role' => 'tutor',
            'email_verified_at' => now(),
        ]);

        // Create tutor profile
        $this->tutorProfile = TutorProfile::factory()->create([
            'user_id' => $this->tutor->id,
            'verification_status' => 'pending',
            'is_verified' => false,
        ]);

        // Create admin user
        $this->admin = User::factory()->create([
            'role' => 'admin',
            'is_admin' => true,
        ]);
    }

    public function test_notification_sent_when_tutor_verified()
    {
        $response = $this->actingAs($this->admin)
            ->put(route('tutors.verify', $this->tutorProfile), [
                'verification_status' => 'approved',
                'verification_note' => 'All documents verified'
            ]);

        $response->assertRedirect();

        // Assert notification was sent to correct user
        Notification::assertSentTo(
            $this->tutor,
            TutorVerificationApproved::class,
            function ($notification) {
                return $notification->tutorProfile->id === $this->tutorProfile->id;
            }
        );

        // Assert database was updated
        $this->assertDatabaseHas('tutor_profiles', [
            'id' => $this->tutorProfile->id,
            'verification_status' => 'approved',
            'is_verified' => true,
        ]);
    }

    public function test_notification_sent_when_tutor_rejected()
    {
        $response = $this->actingAs($this->admin)
            ->put(route('tutors.verify', $this->tutorProfile), [
                'verification_status' => 'rejected',
                'verification_note' => 'Documents incomplete'
            ]);

        $response->assertRedirect();

        // Assert notification was sent to correct user
        Notification::assertSentTo(
            $this->tutor,
            TutorVerificationRejected::class,
            function ($notification) {
                return $notification->tutorProfile->id === $this->tutorProfile->id;
            }
        );

        // Assert database was updated
        $this->assertDatabaseHas('tutor_profiles', [
            'id' => $this->tutorProfile->id,
            'verification_status' => 'rejected',
            'is_verified' => false,
        ]);
    }
}