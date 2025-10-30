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
        $uvboard = ['lebar' => 122, 'tinggi' => 300, 'ketebalan' => 8, 'density' => 0.9];

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
                $panjangSpec = MSpecification::where('name', 'panjang')->where('jenis_id', 5)->first();
                $p->specifications()->detach($panjangSpec->id);
                $p->specifications()->syncWithoutDetaching([
                    $specification->id => ['specification_value_id' => $specificationValue->id]
                ]);
            }
        }
    }
}
