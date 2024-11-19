<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offerings', function (Blueprint $table) {
            // Ubah kolom attachments menjadi json
            $table->json('attachments')->nullable()->change();
            // Tambah kolom untuk tracking
            $table->timestamp('last_activity_at')->nullable();
            $table->string('attachment_count')->default(0);
            $table->bigInteger('total_attachment_size')->default(0); // dalam bytes
        });
    }

    public function down(): void
    {
        Schema::table('offerings', function (Blueprint $table) {
            $table->text('attachments')->nullable()->change();
            $table->dropColumn([
                'last_activity_at',
                'attachment_count',
                'total_attachment_size'
            ]);
        });
    }
};