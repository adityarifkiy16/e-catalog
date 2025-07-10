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
        MCategories::truncate();
        // $arr['categories'] = ['Wood', '3D', 'Animal', 'Abstract', 'Arabasque', 'Artistic', 'Baby', 'Brick', 'Commercial', 'Concrete', 'Floral', 'Geek', 'Geometric', 'Golden', 'Infant', 'Landscape', 'Leaves', 'Marble', 'Metal', 'Render', 'Stone', 'Stripped', 'Texture', 'Tile', 'Urban'];
        // $pvc = [
        //     '3mm', '4mm', '5mm', '6mm', '7mm', '8mm', '9mm', '10mm', '11mm', '12mm', '13mm', '14mm', '15mm', '16mm', '17mm', '18mm', '19mm', '20mm'
        // ];
        // foreach ($pvc as $item) {
        //     MCategories::firstOrCreate([
        //         'name' => $item,
        //         'jenis_id' => 1
        //     ]);
        // }

        $wallboard = [
            19 => 'solid',
            20 => 'linen',
            21 => 'wood',
            22 => 'marble',
            23 => 'stainless',
            24 => 'stone',
            25 => 'mirror'
        ];
        foreach ($wallboard as $id => $item) {
            MCategories::firstOrCreate([
                'id' => $id,
                'name' => $item,
                'jenis_id' => 2
            ]);
        }

        $wallpanel = [
            '628',
            '629',
            '643',
            '644',
            '709',
            '710'
        ];
        foreach ($wallpanel as $item) {
            MCategories::firstOrCreate([
                'name' => $item,
                'jenis_id' => 3
            ]);
        }

        MCategories::firstOrCreate([
            'id' => 32,
            'name' => 'pvc',
            'jenis_id' => 1
        ]);
    }
}
