<?php

namespace Database\Seeders;

use App\Models\MVariant;
use App\Models\TProduct;
use App\Models\TVariantValue;
use Illuminate\Database\Seeder;

class VarianUVSeeder extends Seeder
{
    public function run(): void
    {
        $uvboard = ['panjang' => 122, 'tinggi' => 300, 'ketebalan' => 0.8, 'density' => 0.9];

        foreach ($uvboard as $attrName => $attrValue) {
            $variant = MVariant::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 5,
            ]);

            $variantValue = TVariantValue::firstOrCreate([
                'variant_id' => $variant->id,
                'name' => $attrValue,
            ]);

            $product = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 5))->get();

            foreach ($product as $p) {
                $p->variants()->syncWithoutDetaching([
                    $variant->id => ['variant_value_id' => $variantValue->id]
                ]);
            }
        }
    }
}
