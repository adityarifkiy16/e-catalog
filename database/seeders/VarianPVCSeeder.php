<?php

namespace Database\Seeders;

use App\Models\MSpecification;
use App\Models\TProduct;
use App\Models\TSpecificationValue;
use Illuminate\Database\Seeder;

class VarianPVCSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pvc = [
            1598 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 3],
            1599 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 5],
            1600 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 6],
            1601 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 8],
            1602 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 9],
            1603 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 10],
            1604 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 12],
            1605 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 15],
            1606 => ['panjang' => 122, 'tinggi' => 244, 'ketebalan' => 18],
        ];

        foreach ($pvc as $productId => $attributes) {
            // Ambil produk berdasarkan ID
            $product = TProduct::find($productId);

            if (!$product) {
                continue; // Skip jika produk tidak ditemukan
            }

            // Loop untuk setiap atribut (panjang, tinggi, ketebalan)
            foreach ($attributes as $attrName => $attrValue) {
                // Cari atau buat variant berdasarkan nama atribut
                $specification = MSpecification::firstOrCreate([
                    'name' => $attrName,
                    'jenis_id' => $product->category->jenis_id ?? null, // Sesuaikan dengan jenis produk
                ]);

                // Cari atau buat specification value
                $specificationValue = TSpecificationValue::firstOrCreate([
                    'specification_id' => $specification->id,
                    'name' => (string)$attrValue, // Konversi nilai ke string
                ]);

                // Cek apakah relasi sudah ada
                $exists = $product->specifications()
                    ->wherePivot('specification_id', $specification->id)
                    ->wherePivot('specification_value_id', $specificationValue->id)
                    ->exists();

                // Attach jika belum ada
                if (!$exists) {
                    $product->specifications()->attach($specification->id, [
                        'specification_value_id' => $specificationValue->id
                    ]);
                }
            }
        }
    }
}
