<?php

namespace Database\Seeders;

use App\Models\TProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeleteProduct extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TProduct::truncate();
    }
}
