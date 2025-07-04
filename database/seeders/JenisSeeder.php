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
        $jenis = ['PVC Board', 'Wallboard', 'Wallpanel', 'UV Board'];
        foreach($jenis as $item){
            MJenis::firstOrCreate([
                'name' => $item,
            ]);
        };
    }
}
