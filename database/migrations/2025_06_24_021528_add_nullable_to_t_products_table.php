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
        Schema::table('t_products', function (Blueprint $table) {
            $table->string('code')->nullable()->change();
            $table->string('name')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_products', function (Blueprint $table) {
            $table->string('code')->nullable(false)->change();
            $table->string('name')->nullable(false)->change();
        });
    }
};
