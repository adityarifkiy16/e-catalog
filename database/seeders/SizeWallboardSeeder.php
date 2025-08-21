<?php

namespace Database\Seeders;

use App\Models\TProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeWallboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $size = ['panjang' => 122, 'tinggi' => 300];
        TProduct::whereHas('category', function ($query) {
            $query->where('jenis_id', 2);
        })->update($size);
    }
}
