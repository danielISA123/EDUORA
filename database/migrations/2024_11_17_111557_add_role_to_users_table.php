<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Cek dulu apakah tabel users ada
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Cek setiap kolom sebelum menambahkan
                if (!Schema::hasColumn('users', 'role')) {
                    $table->enum('role', ['student', 'tutor', 'admin'])->default('student')->after('password');
                }
                if (!Schema::hasColumn('users', 'is_verified')) {
                    $table->boolean('is_verified')->default(false)->after('role');
                }
                if (!Schema::hasColumn('users', 'verified_at')) {
                    $table->timestamp('verified_at')->nullable()->after('is_verified');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Cek setiap kolom sebelum menghapus
                if (Schema::hasColumn('users', 'role')) {
                    $table->dropColumn('role');
                }
                if (Schema::hasColumn('users', 'is_verified')) {
                    $table->dropColumn('is_verified');
                }
                if (Schema::hasColumn('users', 'verified_at')) {
                    $table->dropColumn('verified_at');
                }
            });
        }
    }
};