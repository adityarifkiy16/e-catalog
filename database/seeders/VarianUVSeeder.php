<?php

namespace Database\Seeders;

use App\Models\MSpecification;
use App\Models\TProduct;
use App\Models\TSpecificationValue;
use Illuminate\Database\Seeder;

class VarianUVSeeder extends Seeder
{
    public function run(): void
    {
        $uvboard = ['panjang' => 122, 'tinggi' => 300, 'ketebalan' => 0.8, 'density' => 0.9];

        foreach ($uvboard as $attrName => $attrValue) {
            $specification = MSpecification::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 5,
            ]);

            $specificationValue = TSpecificationValue::firstOrCreate([
                'specification_id' => $specification->id,
                'name' => $attrValue,
            ]);

            $product = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 5))->get();

            foreach ($product as $p) {
                $p->specifications()->syncWithoutDetaching([
                    $specification->id => ['specification_value_id' => $specificationValue->id]
                ]);
            }
        }
    }
}
