<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MVersion;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use App\Models\ProductVersion;
use App\Services\ImageServices;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;

class ProductVersionController extends Controller
{
    protected ImageServices $imageServices;

    public function __construct(ImageServices $imageServices)
    {
        $this->middleware('permission:management_product')->except(['downloadPdf', 'downloadPdfProduct', 'show']);
        $this->imageServices = $imageServices;
    }
    public function index(Request $request)
    {
        $request->validate([
            'filter' => 'nullable|numeric|exists:m_categories,id',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);
        $arr['categories'] = MCategories::with('jenis')->get();
        $arr['versions'] = MVersion::all();
        if ($request->ajax()) {
            $query = ProductVersion::with(['version', 'product.category.jenis', 'images']);

            if ($request->has('filter')) {
                $query = $query->whereHas('product', function ($q) use ($request) {
                    $q->where('category_id', $request->filter);
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


            if ($request->has('version')) {
                $query = $query->whereHas('version', function ($q) use ($request) {
                    $q->where('id', $request->version);
                });
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
        return view('productVersion.index', $arr);
    }

    /**
     * 2. Menampilkan form create
     */
    public function bulkCreate()
    {
        $arr['jenis'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();
        return view('productVersion.bulk-create', $arr);
    }

    /**
     * 3. Menyimpan data product secara masal dengan gambar
     */
    public function storeBulkCreate(Request $request)
    {
        $request->validate([
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'category_id' => 'required|exists:m_categories,id',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);

        DB::beginTransaction();
        try {
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    if (!TProduct::where('code', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->exists()) {
                        $path = $this->imageServices->store($file, 'products', 800);

                        // 1. Buat Produk baru
                        $product = TProduct::create([
                            'code' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                            'category_id' => $request->input('category_id'),
                        ]);

                        // 2. Sambungkan Produk dengan Versi
                        $productVersion = $product->productVersions()->create([
                            'name' => $product->code,
                            'version_id' => $request->version ?? 1,
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
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Product created successfully.',
                'warning' => isset($arr['warning']) ? $arr['warning'] : null
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // 4. Edit Product Version
    public function edit(ProductVersion $productVersion)
    {
        $arr['productVersion'] = $productVersion;
        $arr['jenises'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();
        return view('productVersion.edit', $arr);
    }

    /**
     * 5. Update Product Version
     */
    public function update(Request $request, ProductVersion $productVersion)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-motif' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-mockup' => 'nullable|array|max:5',
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:5024',
            'version_id' => 'required|numeric|exists:m_versions,id',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'name' => $request->name,
                'version_id' => $request->version_id
            ];

            $existData = ProductVersion::where('product_id', $productVersion->product_id)
                ->where('version_id', $request->version_id)
                ->where('id', '!=', $productVersion->id)
                ->first();

            if ($existData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Version already exists for this product.'
                ]);
            }

            $productVersion->update($data);

            // Gambar
            if ($request->hasFile('image-mockup')) {
                // 1. Hapus semua gambar sebelumnya dari relasi dan storage
                foreach ($productVersion->images()->where('type', 'product')->get() as $existingImage) {
                    $oldPath = storage_path('app/public/' . $existingImage->path);
                    if (file_exists($oldPath)) {
                        @unlink($oldPath);
                    }
                    $existingImage->delete();
                }

                // 2. Simpan gambar baru
                foreach ($request->file('image-mockup') as $file) {
                    $path = $this->imageServices->store($file, 'mockup', 800);

                    // 3. Simpan gambar ke database images
                    $productVersion->images()->create([
                        'path' => $path,
                        'type' => 'product',
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $path = $this->imageServices->store($file, 'products', 800);
                $thumbnail = $productVersion->images()->where('type', 'thumbnail')->first();

                // 1. Hapus photo thumbnail lama
                if ($thumbnail) {
                    $imagePath = storage_path('app/public/' . $thumbnail->path);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                    // 2. Update photo thumbnail
                    $thumbnail->update([
                        'path' => $path
                    ]);
                } else {
                    // 3. Simpan gambar ke database images
                    $productVersion->images()->create([
                        'path' => $path,
                        'type' => 'thumbnail',
                    ]);
                }
            }

            if ($request->hasFile('image-motif')) {
                $file = $request->file('image-motif');
                $path = $this->imageServices->store($file, 'motif', 800);
                $motifImage = $productVersion->images()->where('type', 'motif')->first();

                // 1. Hapus photo motif lama
                if ($motifImage) {
                    $imagePath = storage_path('app/public/' . $motifImage->path);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                    // 2. Simpan gambar ke database images
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

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Versi Produk berhasil diperbarui',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal update: ' . $e->getMessage(),
            ], 500);
        }
    }

    // 6. Hapus Product Version
    public function destroy(ProductVersion $productVersion)
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
        return response()->json([
            'status' => 'success',
            'message' => 'Versi Produk berhasil dihapus',
        ]);
    }

    // 7. Reset Gambar Mockup
    public function resetMockup(ProductVersion $productVersion)
    {
        $mockupImages = $productVersion->images()
            ->where('type', 'product')
            ->get();

        if ($mockupImages->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produk ini tidak memiliki gambar mockup.'
            ], 404);
        }

        // Hapus file dan record
        foreach ($mockupImages as $image) {
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
            $image->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Gambar mockup berhasil direset.'
        ]);
    }

    // 8. Reset Gambar Motif
    public function resetMotif(ProductVersion $productVersion)
    {
        $mockupImages = $productVersion->images()
            ->where('type', 'motif')
            ->get();

        if ($mockupImages->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produk ini tidak memiliki gambar motif.'
            ], 404);
        }

        // Hapus file dan record
        foreach ($mockupImages as $image) {
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
            $image->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Gambar motif berhasil direset.'
        ]);
    }

    // 9. Upload Bulk Gambar Motif / Mockup
    public function bulkCreateMotif()
    {
        $arr['versions'] = MVersion::all();
        return view('productVersion.bulk-create-mockup', $arr);
    }

    public function storeBulkCreateMotif(Request $request)
    {
        $request->validate([
            'type' => 'required|in:mockup,motif',
            'version_id' => 'required|exists:m_versions,id',
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $folder = $request->type == 'mockup' ? 'mockup'  : 'motif';
            foreach ($request->file('image') as $file) {
                $path = $this->imageServices->store($file, $folder);

                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $part = explode(' ', $filename);
                $kode = trim(implode(' ', array_slice($part, -2)));
                $kode = strtoupper($kode);

                $product = TProduct::where('code', $kode)->first();
                $productVersion = $product->productVersions()->where('version_id', $request->version_id)->first();
                if (!$product) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Kode produk $kode tidak ditemukan."
                    ], 404);
                }

                if ($request->type == 'mockup') {
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
                } elseif ($request->type == 'motif') {
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
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'berhasil diupload.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengupload mockup.'
            ], 500);
        }
    }

    public function create()
    {
        $arr['product'] = TProduct::with('category')->get();
        $arr['versions'] = MVersion::all();
        return view('productVersion.create', $arr);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|array',
            'product_id.*' => 'exists:t_products,id',
            'version_id' => 'required|exists:m_versions,id',
        ]);

        $version = MVersion::findOrFail($request->version_id);
        $addedProducts = [];
        $skippedProducts = [];

        foreach ($request->product_id as $productId) {
            $product = TProduct::find($productId);

            // 1. Cek apakah kombinasi product_id + version_id sudah ada
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

        return response()->json([
            'status' => 'success',
            'message' => $message,
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->ids;
        ProductVersion::whereIn('id', $ids)->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Paket berhasil dihapus.',
        ]);
    }
}
