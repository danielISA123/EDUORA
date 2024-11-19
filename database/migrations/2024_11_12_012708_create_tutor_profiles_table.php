<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tutor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Personal & Professional Info
            $table->string('expertise_level')->nullable(); // e.g., 'Undergraduate', 'Graduate', 'Professional'
            $table->text('bio')->nullable();
            $table->json('subjects')->nullable(); // Array of subjects they can teach
            $table->decimal('hourly_rate', 10, 2)->nullable();
            
            // Academic Background
            $table->string('university')->nullable();
            $table->string('degree')->nullable();
            $table->string('major')->nullable();
            $table->decimal('gpa', 3, 2)->nullable();
            $table->year('graduation_year')->nullable();
            
            // Verification Status
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->string('verification_status')->default('pending'); // pending, approved, rejected
            $table->text('verification_note')->nullable();
            
            // Documents
            $table->string('student_card')->nullable(); // KTM/Student ID
            $table->string('transcript')->nullable();
            $table->json('certificates')->nullable(); // Additional certificates
            
            // Stats & Metrics
            $table->integer('completed_tasks')->default(0);
            $table->integer('total_earnings')->default(0);
            $table->decimal('average_rating', 3, 2)->nullable();
            $table->integer('total_reviews')->default(0);
            
            // Availability & Preferences
            $table->json('available_times')->nullable(); // Weekly schedule
            $table->json('teaching_preferences')->nullable(); // Online/Offline, etc.
            $table->boolean('is_available')->default(true);
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tutor_profiles');
    }
};