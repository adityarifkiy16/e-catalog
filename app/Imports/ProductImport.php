<?php

namespace App\Imports;

use App\Models\TProduct;
use App\Models\MSpecification;
use Illuminate\Support\Collection;
use App\Models\TSpecificationValue;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductImport implements ToCollection, WithHeadingRow
{
    public $errors = [];

    public function collection(Collection $rows)
    {
        $currentProduct = null;
        $existingCodesInFile = [];

        foreach ($rows as $row) {

            $code   = $row['code'];
            $name   = $row['name'];
            $cat    = $row['category_id'];

            $specName  = $row['spec'];
            $specValue = $row['value'];
            $specUnit  = $row['unit'];

            // 1. Jika kolom code ada → ini baris produk
            if ($code) {
                if (in_array($code, $existingCodesInFile)) {
                    $this->errors[] = "Kode $code duplikat di dalam file Excel.";
                    continue; // SKIP BARIS
                }
                $existingCodesInFile[] = $code;

                // Cek duplikasi DI DATABASE
                $existingProduct = TProduct::where('code', $code)->first();
                if ($existingProduct) {
                    $this->errors[] = "Kode $code sudah ada di dalam database.";
                    continue;
                }

                $currentProduct = TProduct::firstOrCreate([
                    'code' => $code,
                    'name' => $name,
                    'category_id' => $cat
                ]);
            }

            // 2. Baris spesifikasi (code kosong)
            if ($currentProduct && $specName && $specValue) {

                // cari/buat master MSpecification
                $spec = MSpecification::firstOrCreate([
                    'name' => $specName,
                    'jenis_id' => $currentProduct->category->jenis_id
                ]);

                // value + unit
                $specValueModel = TSpecificationValue::updateOrCreate(
                    [
                        'specification_id' => $spec->id,
                        'name' => $specValue
                    ],
                    [
                        'unit' => $specUnit
                    ]
                );

                // simpan ke pivot t_product_m_spec
                $currentProduct->specifications()->syncWithoutDetaching([
                    [
                        'specification_id' => $spec->id,
                        'specification_value_id' => $specValueModel->id
                    ]
                ]);
            }
        }
    }
}
