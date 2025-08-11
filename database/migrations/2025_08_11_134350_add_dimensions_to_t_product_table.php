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
            $table->decimal('panjang', 8, 2)->nullable();
            $table->decimal('tinggi', 8, 2)->nullable();
            $table->decimal('ketebalan', 8, 3)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_products', function (Blueprint $table) {
            $table->dropColumn('panjang');
            $table->dropColumn('tinggi');
            $table->dropColumn('ketebalan');
        });
    }
};
