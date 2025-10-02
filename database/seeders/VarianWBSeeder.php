<?php

namespace Database\Seeders;

use App\Models\MVariant;
use App\Models\TProduct;
use App\Models\TVariantValue;
use Illuminate\Database\Seeder;

class VarianWBSeeder extends Seeder
{
    public function run(): void
    {
        $wallboard = ['panjang' => 122, 'tinggi' => 300];

        foreach ($wallboard as $attrName => $attrValue) {
            $variant = MVariant::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 2,
            ]);

            $variantValue = TVariantValue::firstOrCreate([
                'variant_id' => $variant->id,
                'name' => $attrValue,
            ]);

            $product = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 2))->get();

            foreach ($product as $p) {
                $p->variants()->syncWithoutDetaching([
                    $variant->id => ['variant_value_id' => $variantValue->id]
                ]);
            }
        }
    }
}
