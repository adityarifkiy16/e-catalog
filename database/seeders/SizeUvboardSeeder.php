<?php

namespace Database\Seeders;

use App\Models\TProduct;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SizeUvboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $size = ['panjang' => 122, 'tinggi' => 300];
        TProduct::whereHas('category', function ($query) {
            $query->where('jenis_id', 5);
        })->update($size);
    }
}
