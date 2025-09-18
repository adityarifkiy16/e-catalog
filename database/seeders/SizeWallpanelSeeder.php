<?php

namespace Database\Seeders;

use App\Models\TProduct;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SizeWallpanelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sizes = [
            ['type_id' => 1, 'panjang' => 300, 'tinggi' => 1, 'lebar' => 20.7],
            ['type_id' => 2, 'panjang' => 300, 'tinggi' => 2.2, 'lebar' => 17],
            ['type_id' => 3, 'panjang' => 300, 'tinggi' => 21.5, 'lebar' => 21.5],
            ['type_id' => 4, 'panjang' => 300, 'tinggi' => 0.9, 'lebar' => 16.7],
            ['type_id' => 5, 'panjang' => 300, 'tinggi' => 1.5, 'lebar' => 20.7],
            ['type_id' => 6, 'panjang' => 300, 'tinggi' => 1.4, 'lebar' => 15.5],
        ];

        foreach ($sizes as $size) {
            TProduct::whereHas('category', function ($query) use ($size) {
                $query->where('type_id', $size['type_id']);
            })->update([
                'panjang' => $size['panjang'],
                'tinggi'  => $size['tinggi'],
                'lebar'   => $size['lebar'],
            ]);
        }
    }
}
