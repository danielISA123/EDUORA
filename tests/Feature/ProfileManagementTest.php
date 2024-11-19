<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_user_can_create_profile()
    {
        $user = User::factory()->create([
            'role' => 'student'
        ]);

        $this->actingAs($user);

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post(route('profiles.store'), [
            'full_name' => 'Test User',
            'phone_number' => '08123456789',
            'address' => 'Test Address',
            'gender' => 'male',
            'birth_date' => '2000-01-01',
            'education_level' => 'university',
            'school_name' => 'Test University',
            'major' => 'Computer Science',
            'graduation_year' => '2024',
            'profile_picture' => $file,
            'notification_enabled' => true,
            'language_preference' => 'id',
        ]);

        $profile = UserProfile::where('user_id', $user->id)->first();

        $response->assertRedirect(route('profiles.show', $profile));
        Storage::disk('public')->assertExists($profile->profile_picture);
    }

    public function test_user_can_update_profile()
    {
        $user = User::factory()->create(['role' => 'student']);
        $profile = UserProfile::factory()->create([
            'user_id' => $user->id,
            'full_name' => 'Old Name'
        ]);

        $this->actingAs($user);

        $response = $this->put(route('profiles.update', $profile), [
            'full_name' => 'Updated Name',
            'phone_number' => '08123456789',
            'address' => 'Test Address',
            'gender' => 'male',
            'birth_date' => '2000-01-01',
            'education_level' => 'university',
            'school_name' => 'Test University',
            'major' => 'Computer Science',
            'graduation_year' => '2024',
            'notification_enabled' => true,
            'language_preference' => 'id',
        ]);

        $response->assertRedirect(route('profiles.show', $profile));
        $this->assertDatabaseHas('user_profiles', [
            'id' => $profile->id,
            'full_name' => 'Updated Name',
        ]);
    }

    public function test_user_can_delete_profile()
    {
        $user = User::factory()->create(['role' => 'student']);
        $profile = UserProfile::factory()->create([
            'user_id' => $user->id
        ]);

        $this->actingAs($user);

        $response = $this->delete(route('profiles.destroy', $profile));

        $response->assertRedirect(route('profiles.index'));
        $this->assertDatabaseMissing('user_profiles', [
            'id' => $profile->id,
            'deleted_at' => null
        ]);
    }
}