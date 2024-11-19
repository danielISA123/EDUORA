<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            // Primary Key
            $table->id();
            
            // Foreign Key ke tabel users bawaan Laravel
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Informasi Pribadi
            $table->string('full_name', 100);
            $table->string('phone_number', 20)->nullable();
            $table->text('address')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->date('birth_date')->nullable();
            
            // Informasi Pendidikan
            $table->enum('education_level', ['smp', 'sma', 'university'])->nullable();
            $table->string('school_name', 100)->nullable();
            $table->string('major', 100)->nullable();  // Jurusan/Program Studi
            $table->integer('graduation_year')->nullable();
            
            // Preferensi & Settings
            $table->string('profile_picture')->nullable();
            $table->boolean('notification_enabled')->default(true);
            $table->string('language_preference')->default('id');  // id/en
            
            // Statistik & Metrics
            $table->integer('completed_tasks')->default(0);
            $table->integer('total_spent')->default(0);  // Total pengeluaran dalam Rupiah
            $table->decimal('average_rating', 3, 2)->nullable();  // Rating dari tutor
            
            // Status & Verification
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->enum('status', ['active', 'suspended', 'inactive'])->default('active');
            
            // Timestamps
            $table->timestamps();  // created_at & updated_at
            $table->softDeletes(); // deleted_at untuk soft delete
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_profiles');
    }
};