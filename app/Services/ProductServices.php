<?php

namespace App\Services;

use App\Models\TProduct;
use App\Models\MSpecification;
use App\Models\TSpecificationValue;
use Illuminate\Support\Facades\Storage;

class ProductServices
{
    public function sync(TProduct $product, ?array $specifications): void
    {
        if (empty($specifications)) {
            $product->specifications()->detach();
            return;
        }

        $syncData = [];

        foreach ($specifications as $spec) {
            if (empty($spec['name']) || empty($spec['value'])) {
                continue;
            }

            $specification = MSpecification::firstOrCreate([
                'name' => $spec['name'],
                'jenis_id' => $product->category->jenis_id,
            ]);

            $value = TSpecificationValue::updateOrCreate(
                [
                    'specification_id' => $specification->id,
                    'name' => $spec['value'],
                ],
                [
                    'unit' => $spec['unit'] ?? null,
                ]
            );

            $syncData[] = [
                'specification_id' => $specification->id,
                'specification_value_id' => $value->id,
            ];
        }

        $product->specifications()->sync($syncData);
        TSpecificationValue::whereDoesntHave('products')->delete();
    }

    public function create(array $data): TProduct
    {
        return TProduct::create($data);
    }

    public function update(TProduct $product, array $data): void
    {
        $product->update($data);
    }

    public function delete(TProduct $product): void
    {
        $product->specifications()->detach();
        if ($product->productVersions()->exists()) {
            throw new \Exception('Product cannot be deleted because it is in use.');
        }
        if ($product->photo) {
            Storage::disk('public')->delete($product->photo);
        }
        $product->delete();
    }

    public function deleteByCategory(int $categoryId): void
    {
        $products = TProduct::where('category_id', $categoryId)->get();
        foreach ($products as $product) {
            if ($product->photo) {
                $imagePath = storage_path('app/public/' . $product->photo);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
            }
            $product->delete();
        }
    }
}
