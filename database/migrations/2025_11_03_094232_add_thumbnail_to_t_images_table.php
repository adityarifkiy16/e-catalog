<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('t_images', function (Blueprint $table) {
            $table->string('type')->default('product')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('t_images')
            ->whereNotIn('type', ['motif', 'mockup', 'product'])
            ->delete();
        Schema::table('t_images', function (Blueprint $table) {
            $table->enum('type', ['motif', 'mockup', 'product'])
                ->default('product')
                ->change();
        });
    }
};
