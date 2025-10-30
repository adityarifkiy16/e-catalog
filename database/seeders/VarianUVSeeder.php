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
        $uvboard = [
            'lebar' => 122,
            'tinggi' => 300,
            'ketebalan' => 8,
            'density' => 0.9,
        ];

        // Ambil semua produk yang punya jenis_id = 5
        $products = TProduct::whereHas('category.jenis', fn($q) => $q->where('id', 5))->get();

        foreach ($products as $p) {
            // Hapus dulu semua spesifikasi terkait jenis 5 (biar bersih)
            $specsToDetach = MSpecification::where('jenis_id', 5)->pluck('id')->toArray();
            $p->specifications()->detach($specsToDetach);

            // Tambah lagi sesuai urutan $uvboard
            foreach ($uvboard as $attrName => $attrValue) {
                $specification = MSpecification::firstOrCreate([
                    'name' => $attrName,
                    'jenis_id' => 5,
                ]);

                $specificationValue = TSpecificationValue::firstOrCreate([
                    'specification_id' => $specification->id,
                    'name' => $attrValue,
                ]);

                // Tambahkan relasi baru sesuai urutan array
                $p->specifications()->syncWithoutDetaching([
                    $specification->id => ['specification_value_id' => $specificationValue->id],
                ]);
            }
        }
    }
}
