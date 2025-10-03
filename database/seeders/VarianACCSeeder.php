<?php

namespace Database\Seeders;

use App\Models\MSpecification;
use App\Models\TProduct;
use App\Models\TSpecificationValue;
use Illuminate\Database\Seeder;

class VarianACCSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $acc = ['warna' => ['Black', 'Bronze', 'Rose Gold', 'Dark Grey'], 'panjang' => [300]];

        foreach ($acc as $attrName => $attrValues) {
            $specification = MSpecification::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 4,
            ]);

            $products = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 4))->get();

            foreach ($attrValues as $valueName) {
                $specificationValue = TSpecificationValue::firstOrCreate([
                    'specification_id' => $specification->id,
                    'name' => $valueName,
                ]);

                foreach ($products as $product) {
                    // Cek apakah sudah ada, jika belum baru attach
                    $exists = $product->specifications()
                        ->wherePivot('specification_id', $specification->id)
                        ->wherePivot('specification_value_id', $specificationValue->id)
                        ->exists();

                    if (!$exists) {
                        $product->specifications()->attach($specification->id, [
                            'specification_value_id' => $specificationValue->id
                        ]);
                    }
                }
            }
        }
    }
}
