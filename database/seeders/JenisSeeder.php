<?php

namespace Database\Seeders;

use App\Models\MJenis;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JenisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MJenis::truncate();
        $jenis = [1 => 'PVC Board', 2 => 'Wallboard', 3 => 'Wallpanel', 4 => 'Aksesoris', 5 => 'UV Board'];
        foreach($jenis as $id => $item){
            MJenis::firstOrCreate([
                'id' => $id,
                'name' => $item,
            ]);
        };
    }
}
