<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('offerings', function (Blueprint $table) {
            $table->timestamp('files_cleaned_at')->nullable()->after('deleted_at');
        });
    }

    public function down()
    {
        Schema::table('offerings', function (Blueprint $table) {
            $table->dropColumn('files_cleaned_at');
        });
    }
};