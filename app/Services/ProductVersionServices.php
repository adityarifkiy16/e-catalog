<?php

namespace App\Services;

use App\Models\MVersion;
use App\Models\TProduct;
use Illuminate\Http\Request;
use App\Models\ProductVersion;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;

class ProductVersionServices
{
    private ImageServices $imageServices;

    public function __construct(ImageServices $imageServices)
    {
        $this->imageServices = $imageServices;
    }

    public function getDataTable(Request $request)
    {
        $query = ProductVersion::with(['version', 'product.category.jenis', 'images']);

        if ($request->filled('filter')) {
            $query = $query->whereHas('product', function ($q) use ($request) {
                $q->where('category_id', $request->filter);
            });
        }

        if ($request->filled('version')) {
            $query = $query->whereHas('version', function ($q) use ($request) {
                $q->where('id', $request->version);
            });
        }

        if ($request->filled('search')) {
            $search = is_array($request->search)
                ? $request->search['value'] ?? null
                : $request->search;

            if ($search) {
                $query->where(function ($q) use ($search) {
                    // cari di tabel product
                    $q->whereHas('product', function ($sub) use ($search) {
                        $sub->where('code', 'like', "%{$search}%")
                            ->orWhere('name', 'like', "%{$search}%");
                    });
                });
            }
        }

        return DataTables::of($query)
            ->addIndexColumn()
            ->addColumn('category', function ($row) {
                return $row->product->category ? $row->product->category->name : '-';
            })
            ->addColumn('jenis', function ($row) {
                return ($row->product->category && $row->product->category->jenis)
                    ? $row->product->category->jenis->name
                    : "Tidak ada jenis";
            })
            ->rawColumns(['action'])
            ->toJson();
    }

    //sync product version
    public function create(array $data): string
    {
        $version = MVersion::findOrFail($data['version_id']);
        $addedProducts = [];
        $skippedProducts = [];

        foreach ($data['product_id'] as $productId) {
            $product = TProduct::find($productId);

            // 1. validasi kombinasi product_id + version_id sudah ada
            $exists = ProductVersion::where('product_id', $productId)
                ->where('version_id', $version->id)
                ->exists();

            if ($exists) {
                $skippedProducts[] = $product->name ?? $product->code;
                continue;
            }

            ProductVersion::create([
                'name' => $product->name ?? $product->code,
                'product_id' => $product->id,
                'version_id' => $version->id,
            ]);

            $addedProducts[] = $product->name ?? $product->code;
        }

        // 2. Siapkan pesan yang lebih informatif
        $message = 'Versi ' . $version->version . ' berhasil diperbarui.';

        if (count($addedProducts)) {
            $message .= ' Produk ditambahkan: ' . implode(', ', $addedProducts) . '.';
        }

        if (count($skippedProducts)) {
            $message .= ' (Lewati duplikat: ' . implode(', ', $skippedProducts) . ')';
        }

        return $message;
    }


    // upload bulk create product version
    public function bulkCreate(array $data): array
    {
        $images = $data['image'];
        $categoryId = $data['category_id'];
        $arr = [];
        if (!empty($images)) {
            foreach ($images as $file) {
                if (!TProduct::where('code', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->exists()) {
                    $path = $this->imageServices->store($file, 'products', 800);

                    // 1. Buat Produk baru
                    $product = TProduct::create([
                        'code' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                        'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                        'category_id' => $categoryId,
                    ]);

                    // 2. Sambungkan Produk dengan Versi
                    $productVersion = $product->productVersions()->create([
                        'name' => $product->code,
                        'version_id' => $data['version'] ?? 1,
                    ]);

                    // 3. Sambungkan Produk dengan Gambar
                    $productVersion->images()->create([
                        'path' => $path,
                        'type' => 'thumbnail',
                    ]);
                } else {
                    $arr['warning'][] =  pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                }
            }
        }
        return $arr;
    }

    public function update(array $data, ProductVersion $productVersion)
    {
        $existData = ProductVersion::where('product_id', $productVersion->product_id)
            ->where('version_id', $data['version_id'])
            ->where('id', '!=', $productVersion->id)
            ->first();

        if ($existData) {
            throw new \Exception('Product with this version already exists.');
        }

        // mockup
        if (!empty($data['image-mockup'])) {
            foreach ($productVersion->images()->where('type', 'product')->get() as $existingImage) {
                $oldPath = storage_path('app/public/' . $existingImage->path);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
                $existingImage->delete();
            }
            foreach ($data['image-mockup'] as $file) {
                $path = $this->imageServices->store($file, 'mockup', 800);
                $productVersion->images()->create([
                    'path' => $path,
                    'type' => 'product',
                ]);
            }
        }


        // thumbnail
        if (!empty($data['image'])) {
            $file = $data['image'];
            $path = $this->imageServices->store($file, 'products', 800);
            $thumbnail = $productVersion->images()->where('type', 'thumbnail')->first();
            if ($thumbnail) {
                $imagePath = storage_path('app/public/' . $thumbnail->path);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
                $thumbnail->update([
                    'path' => $path
                ]);
            } else {
                $productVersion->images()->create([
                    'path' => $path,
                    'type' => 'thumbnail',
                ]);
            }
        }

        // motif
        if (!empty($data['image-motif'])) {
            $file = $data['image-motif'];
            $path = $this->imageServices->store($file, 'motif', 800);
            $motifImage = $productVersion->images()->where('type', 'motif')->first();
            if ($motifImage) {
                $imagePath = storage_path('app/public/' . $motifImage->path);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
                $motifImage->update([
                    'path' => $path,
                ]);
            } else {
                $productVersion->images()->create([
                    'path' => $path,
                    'type' => 'motif',
                ]);
            }
        }

        $productVersion->update($data);
    }

    public function delete(ProductVersion $productVersion): void
    {
        $productVersion->delete();
        if ($productVersion->images()->count() > 0) {
            foreach ($productVersion->images as $image) {
                $imagePath = storage_path('app/public/' . $image->path);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
                $image->delete();
            }
        }
    }

    public function bulkDestroy(array $id): void
    {
        $query = ProductVersion::whereIn('id', $id);
        foreach ($query->get() as $productVersion) {
            if ($productVersion->images()->count() > 0) {
                foreach ($productVersion->images as $image) {
                    $imagePath = storage_path('app/public/' . $image->path);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                    $image->delete();
                }
            }
            $productVersion->delete();
        }
    }

    public function resetImage(ProductVersion $productVersion, string $type): void
    {
        $images = $productVersion->images()
            ->where('type', $type)
            ->get();
        foreach ($images as $image) {
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
            $image->delete();
        }
    }

    public function bulkImage(Request $request, string $type)
    {
        $folder = $type == 'mockup' ? 'mockup'  : 'motif';
        foreach ($request->file('image') as $file) {
            $path = $this->imageServices->store($file, $folder);
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $part = explode(' ', $filename);
            $kode = trim(implode(' ', array_slice($part, -2)));
            $kode = strtoupper($kode);
            $product = TProduct::where('code', $kode)->first();
            $productVersion = $product->productVersions()->where('version_id', $request->version_id)->first();

            if (!$product) {
                throw new \Exception('Product not found.');
            }

            if ($type == 'mockup') {
                foreach ($productVersion->images()->where('type', 'product')->get() as $img) {
                    $oldPath = storage_path('app/public/' . $img->path);
                    if (file_exists($oldPath)) {
                        @unlink($oldPath);
                    }
                    $img->delete();
                }
                $productVersion->images()->create([
                    'path' => $path,
                    'product_id' => $product->id,
                    'type' => 'product'
                ]);
            } elseif ($type == 'motif') {
                $motifImage = $productVersion->images()->where('type', 'motif')->first();
                if ($motifImage) {
                    $oldPath = storage_path('app/public/' . $motifImage->path);
                    if (file_exists($oldPath)) {
                        @unlink($oldPath);
                    }
                    $motifImage->delete();
                }
                $productVersion->images()->create([
                    'path' => $path,
                    'product_id' => $product->id,
                    'type' => 'motif'
                ]);
            }
        }
    }
}
