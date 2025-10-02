<?php

namespace Database\Seeders;

use App\Models\MVariant;
use App\Models\TProduct;
use App\Models\TVariantValue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\VarianUVSeeder;
use Database\Seeders\VarianWBSeeder;
use Database\Seeders\VarianWPSeeder;

class VariantSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            VarianWBSeeder::class,
            VarianWPSeeder::class,
            VarianUVSeeder::class,
            VarianACCSeeder::class,
            VarianPVCSeeder::class,
            DensityPVCSeeder::class
        ]);
    }
}
