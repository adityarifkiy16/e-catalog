<?php

namespace Database\Seeders;

use App\Models\MSpecification;
use App\Models\TProduct;
use App\Models\TSpecificationValue;
use Illuminate\Database\Seeder;

class VarianWBSeeder extends Seeder
{
    public function run(): void
    {
        // $wallboard = ['panjang' => 122, 'tinggi' => 300];
        $wallboard = ['Ketebalan' => "5/8"];

        foreach ($wallboard as $attrName => $attrValue) {
            $specification = MSpecification::firstOrCreate([
                'name' => $attrName,
                'jenis_id' => 2,
            ]);

            $specificationValue = TSpecificationValue::firstOrCreate([
                'specification_id' => $specification->id,
                'name' => $attrValue,
                'unit' => 'mm',
            ]);

            $product = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 2))->get();

            foreach ($product as $p) {
                $p->specifications()->syncWithoutDetaching([
                    $specification->id => ['specification_value_id' => $specificationValue->id]
                ]);
            }
        }
    }
}
