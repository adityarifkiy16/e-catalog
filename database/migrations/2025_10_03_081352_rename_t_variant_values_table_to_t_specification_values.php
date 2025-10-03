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
        Schema::rename('t_variant_values', 't_specification_values');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('t_specification_values', 't_variant_values');
    }
};
