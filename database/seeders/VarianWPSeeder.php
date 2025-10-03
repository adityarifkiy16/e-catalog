<?php

namespace Database\Seeders;

use App\Models\MSpecification;
use App\Models\TProduct;
use App\Models\TSpecificationValue;
use Illuminate\Database\Seeder;

class VarianWPSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            1 => ['panjang' => 300, 'tinggi' => 1,   'lebar' => 20.7], // Type 628
            3 => ['panjang' => 300, 'tinggi' => 1.5, 'lebar' => 21.5], // Type 643
            4 => ['panjang' => 300, 'tinggi' => 0.9, 'lebar' => 16.7], // Type 644
            6 => ['panjang' => 300, 'tinggi' => 1.4, 'lebar' => 15.5], // Type 710
        ];

        foreach ($types as $typeId => $attributes) {
            foreach ($attributes as $attrName => $attrValue) {
                $specification = MSpecification::firstOrCreate([
                    'name' => $attrName,
                    'jenis_id' => 3,
                ]);

                $specificationValue = TSpecificationValue::firstOrCreate([
                    'specification_id' => $specification->id,
                    'name' => $attrValue,
                ]);

                $product = TProduct::whereHas('category.types', fn($q) => $q->where('id', $typeId))->get();

                foreach ($product as $p) {
                    $p->specifications()->syncWithoutDetaching([
                        $specification->id => ['specification_value_id' => $specificationValue->id]
                    ]);
                }
            }
        }
    }
}
