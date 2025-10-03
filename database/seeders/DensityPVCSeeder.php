<?php

namespace Database\Seeders;

use App\Models\MSpecification;
use App\Models\MVariant;
use App\Models\TProduct;
use App\Models\TSpecificationValue;
use App\Models\TVariantValue;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DensityPVCSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $density = ['density' => ['0,4 (Lite)', '0,55 (Standar)', '0,7 (Heavy-duty)']];
        foreach ($density as $attrName => $attrValues) {
            $specification = MSpecification::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 1,
            ]);

            $products = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 1))->get();

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
