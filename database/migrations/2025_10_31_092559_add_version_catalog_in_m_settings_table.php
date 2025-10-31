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
        Schema::table('m_settings', function (Blueprint $table) {
            $table->string('version_catalog')->nullable();
            $table->date('last_update_catalog')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('m_settings', function (Blueprint $table) {
            $table->dropColumn('version_catalog');
            $table->dropColumn('last_update_catalog');
        });
    }
};
