<?php

namespace Database\Seeders;

use App\Models\MVariant;
use App\Models\TProduct;
use App\Models\TVariantValue;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VarianACCSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $acc = ['warna' => ['Black', 'Bronze', 'Rose Gold', 'Dark Grey'], 'panjang' => [300]];

        foreach ($acc as $attrName => $attrValues) {
            $variant = MVariant::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 4,
            ]);

            $products = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 4))->get();

            foreach ($attrValues as $valueName) {
                $variantValue = TVariantValue::firstOrCreate([
                    'variant_id' => $variant->id,
                    'name' => $valueName,
                ]);

                foreach ($products as $product) {
                    // Cek apakah sudah ada, jika belum baru attach
                    $exists = $product->variants()
                        ->wherePivot('variant_id', $variant->id)
                        ->wherePivot('variant_value_id', $variantValue->id)
                        ->exists();

                    if (!$exists) {
                        $product->variants()->attach($variant->id, [
                            'variant_value_id' => $variantValue->id
                        ]);
                    }
                }
            }
        }
    }
}
