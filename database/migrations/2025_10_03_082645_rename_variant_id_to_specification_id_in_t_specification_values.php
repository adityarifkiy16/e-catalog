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
        Schema::table('t_specification_values', function (Blueprint $table) {
            $table->renameColumn('variant_id', 'specification_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_specification_values', function (Blueprint $table) {
            $table->renameColumn('specification_id', 'variant_id');
        });
    }
};
