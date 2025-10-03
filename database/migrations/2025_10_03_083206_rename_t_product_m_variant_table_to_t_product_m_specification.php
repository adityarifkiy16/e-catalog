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
        Schema::rename('t_product_m_variant', 't_product_m_specification');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('t_product_m_specification', 't_product_m_variant');
    }
};
