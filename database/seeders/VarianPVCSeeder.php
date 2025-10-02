<?php

namespace Database\Seeders;

use App\Models\MVariant;
use App\Models\TProduct;
use App\Models\TVariantValue;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
                $variant = MVariant::firstOrCreate([
                    'name' => $attrName,
                    'jenis_id' => $product->category->jenis_id ?? null, // Sesuaikan dengan jenis produk
                ]);

                // Cari atau buat variant value
                $variantValue = TVariantValue::firstOrCreate([
                    'variant_id' => $variant->id,
                    'name' => (string)$attrValue, // Konversi nilai ke string
                ]);

                // Cek apakah relasi sudah ada
                $exists = $product->variants()
                    ->wherePivot('variant_id', $variant->id)
                    ->wherePivot('variant_value_id', $variantValue->id)
                    ->exists();

                // Attach jika belum ada
                if (!$exists) {
                    $product->variants()->attach($variant->id, [
                        'variant_value_id' => $variantValue->id
                    ]);
                }
            }
        }
    }
}
