<?php

namespace Database\Seeders;

use App\Models\MCategories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $arr['categories'] = ['Wood', '3D', 'Animal', 'Abstract', 'Arabasque', 'Artistic', 'Baby', 'Brick', 'Commercial', 'Concrete', 'Floral', 'Geek', 'Geometric', 'Golden', 'Infant', 'Landscape', 'Leaves', 'Marble', 'Metal', 'Render', 'Stone', 'Stripped', 'Texture', 'Tile', 'Urban'];
        foreach ($arr['categories'] as $item) {
            MCategories::firstOrCreate([
                'name' => $item,
                'jenis_id' => 1
            ]);
        }
    }
}
