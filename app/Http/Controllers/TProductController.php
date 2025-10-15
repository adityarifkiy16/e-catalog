<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\TImage;
use App\Models\TProduct;
use App\Models\MCategories;
use App\Models\MSpecification;
use App\Models\ProductView;
use App\Models\TSpecificationValue;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\ImageServices;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Services\ProductViewServices;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;

class TProductController extends Controller
{
    protected ImageServices $imageServices;
    protected ProductViewServices $viewServices;

    public function __construct(ImageServices $imageServices, ProductViewServices $viewServices)
    {
        $this->middleware('permission:management_product')->except(['downloadPdf', 'downloadPdfProduct', 'show']);
        $this->imageServices = $imageServices;
        $this->viewServices = $viewServices;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $arr['categories'] = MCategories::with('jenis')->get();
        if ($request->ajax()) {
            $query = TProduct::with([
                'category' => fn($q) => $q->select('id', 'name', 'jenis_id'),
                'category.jenis' => fn($q) => $q->select('id', 'name'),
            ])
                ->select('id', 'photo', 'code', 'category_id', 'name')
                ->orderBy('code', 'asc');

            if ($request->has('filter')) {
                $query = $query->where('category_id', $request->filter);
            }

            if ($request->has('search') && $request->search['value'] !== null) {
                $search = $request->search['value'];
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', '%' . $search . '%')
                        ->orWhere('name', 'like', '%' . $search . '%')
                        ->orWhereHas('category', function ($q2) use ($search) {
                            $q2->where('m_categories.name', 'like', '%' . $search . '%');
                        })
                        ->orWhereHas('category.jenis', function ($q3) use ($search) {
                            $q3->where('m_jenis.name', 'like', '%' . $search . '%');
                        });
                });
            }

            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('category', function ($row) {
                    return $row->category ? $row->category->name : '-';
                })
                ->addColumn('jenis', function ($row) {
                    return ($row->category && $row->category->jenis)
                        ? $row->category->jenis->name
                        : "Tidak ada jenis";
                })
                ->rawColumns(['action'])
                ->toJson();
        }
        return view('product.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['jenis'] = MJenis::with('categories')->get();
        return view('product.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'category_id' => 'required|exists:m_categories,id',
        ]);

        DB::beginTransaction();
        try {
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    if (!TProduct::where('code', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->exists()) {
                        $path = $this->imageServices->store($file, 'products', 800);

                        TProduct::create([
                            'code' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                            'photo' => $path,
                            'category_id' => $request->input('category_id'),
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

    /**
     * Display the specified resource.
     */
    public function show(TProduct $product, Request $request)
    {
        $this->viewServices->store($product, $request);
        return response()->json(['status' => 'success', 'message' => 'Product viewed successfully.']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TProduct $product)
    {
        $arr['product'] = $product;
        $arr['jenises'] = MJenis::with('categories')->get();

        // Ambil spesifikasi dari pivot + join ke tabel terkait
        $arr['specifications'] = DB::table('t_product_m_specification as tps')
            ->join('m_specifications as ms', 'ms.id', '=', 'tps.specification_id')
            ->join('t_specification_values as tsv', 'tsv.id', '=', 'tps.specification_value_id')
            ->select(
                'ms.id as specification_id',
                'ms.name as specification_name',
                'tsv.id as specification_value_id',
                'tsv.name as specification_value',
                'tsv.unit as specification_unit'
            )
            ->where('tps.product_id', $product->id)
            ->get();

        return view('product.edit', $arr);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TProduct $product)
    {
        // dd($request->all());
        $request->validate([
            'code' => [
                'required',
                Rule::unique('t_products', 'code')
                    ->ignore($product->id)
                    ->whereNull('deleted_at')
            ],
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-motif' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-mockup' => 'nullable|array|max:5',
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:5024',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'category_id' => 'required|exists:m_categories,id',
            'url_video' => 'nullable|url',
            'specifications' => 'nullable|array',
            'specifications.*.name' => 'nullable|string|max:255',
            'specifications.*.value' => 'nullable|string|max:255',
            'specifications.*.unit' => 'nullable|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'code' => $request->code,
                'name' => $request->name,
                'category_id' => $request->category_id,
                'url_video' => $request->url_video
            ];

            $syncData = [];

            if (!empty($request->specifications)) {
                foreach ($request->specifications as $specificationData) {
                    // skip kalau kosong semua
                    if (empty($specificationData['name']) || empty($specificationData['value'])) {
                        continue;
                    }

                    // 1. Cari atau buat specification
                    $specification = MSpecification::firstOrCreate(
                        [
                            'name' => $specificationData['name'],
                            'jenis_id' => $product->category->jenis_id
                        ]
                    );

                    // 2. Cari atau buat value
                    $specificationValue = TSpecificationValue::updateOrCreate(
                        [
                            'specification_id' => $specification->id,
                            'name' => $specificationData['value'],
                        ],
                        [
                            'unit' => $specificationData['unit'],
                        ]
                    );


                    // 3. Masukkan ke array sync
                    $syncData[] = [
                        'specification_id' => $specification->id,
                        'specification_value_id' => $specificationValue->id
                    ];
                }
            }

            if ($request->hasFile('image-mockup')) {
                // Hapus semua gambar sebelumnya dari relasi dan storage
                foreach ($product->images->where('type', 'mockup')->get() as $existingImage) {
                    $oldPath = storage_path('app/public/' . $existingImage->path);
                    if (file_exists($oldPath)) {
                        @unlink($oldPath);
                    }
                    $existingImage->delete();
                }

                // Simpan gambar baru
                foreach ($request->file('image-mockup') as $file) {
                    $path = $this->imageServices->store($file, 'mockup', 800);

                    // Simpan gambar ke database images
                    TImage::create([
                        'path' => $path,
                        'type' => 'mockup',
                        'product_id' => $product->id
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $path = $this->imageServices->store($file, 'products', 800);

                // Hapus photo thumbnail lama
                if ($product->photo) {
                    $imagePath = storage_path('app/public/' . $product->photo);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                }
                $data = [
                    'photo' => $path
                ];
            }

            if ($request->hasFile('image-motif')) {
                $file = $request->file('image-motif');
                $path = $this->imageServices->store($file, 'motif', 800);
                $motifImage = $product->images->where('type', 'motif')->first();

                // Hapus photo motif lama
                if ($motifImage) {
                    $imagePath = storage_path('app/public/' . $motifImage->path);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                    $motifImage->delete();
                }

                TImage::create([
                    'path' => $path,
                    'type' => 'motif',
                    'product_id' => $product->id
                ]);
            }

            $product->specifications()->sync($syncData);

            // setelah sync, hapus spec_values yang sudah tidak dipakai produk manapun
            TSpecificationValue::whereDoesntHave('products')->delete();

            $product->update($data);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Produk berhasil diperbarui (gambar dipertahankan sebagian).',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal update: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TProduct $product)
    {
        $product->delete();

        if ($product->photo) {
            $imagePath = storage_path('app/public/' . $product->photo);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
        }

        if ($product->images) {
            foreach ($product->images as $image) {
                $imagePath = storage_path('app/public/' . $image->path);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
                $image->delete();
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully.',
        ]);
    }

    public function search(Request $request)
    {
        $arr['categories'] = MCategories::all();
        $arr['products'] = TProduct::where('name', 'LIKE', '%' . $request->search . '%')->orWhere('code', 'LIKE', '%' . $request->search . '%')->get();
        return view('product.index', $arr);
    }

    public function downloadPdf(Request $request)
    {

        $query = TProduct::with('category', 'category.jenis')->select('id', 'code', 'photo', 'category_id')->orderBy('code', 'asc');

        if ($request->filled('category')) {
            $arr['products'] =  $query->whereHas('category', function ($q) use ($request) {
                $q->where('id', $request->category);
            })->get();

            $convertedImgs = [];
            foreach ($arr['products'] as $product) {
                $photopath = storage_path('app/public/' . $product->photo);
                if (file_exists($photopath) && Str::endsWith($product->photo, '.webp')) {
                    $jpgName = Str::replaceLast('.webp', '.jpg', $product->photo);
                    $jpgPath = storage_path('app/public/temp_images/' . $jpgName);
                    $directory = dirname($jpgPath);
                    if (!file_exists($directory)) {
                        mkdir($directory, 0755, true);
                    }

                    if (!file_exists($jpgPath)) {
                        Image::make($photopath)
                            ->resize(600, null, function ($constraint) {
                                $constraint->aspectRatio();
                                $constraint->upsize();
                            })
                            ->encode('jpg', 70)
                            ->save($jpgPath);
                    }

                    $product->converted_photo = $jpgPath;
                    $convertedImgs[] = $jpgPath;
                } else {
                    $product->converted_photo = $photopath;
                }
            }
            $pdf = FacadePdf::loadView('product.catalog', $arr)->setPaper('a4', 'landscape');
            $output = $pdf->stream('products.pdf');

            foreach ($convertedImgs as $img) {
                if (file_exists($img)) {
                    @unlink($img);
                }
            }

            return $output;
        }
    }

    public function downloadPdfProduct(Request $request)
    {
        $productId = $request->query('id');
        $product = TProduct::with('category', 'category.jenis', 'images')->find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $arr['specifications'] = DB::table('t_product_m_specification as tps')
            ->join('m_specifications as ms', 'ms.id', '=', 'tps.specification_id')
            ->join('t_specification_values as tsv', 'tsv.id', '=', 'tps.specification_value_id')
            ->select(
                'ms.id as specification_id',
                'ms.name as specification_name',
                'tsv.id as specification_value_id',
                'tsv.name as specification_value',
                'tsv.unit as specification_unit'
            )
            ->where('tps.product_id', $productId)
            ->get();

        $arr['product'] = $product;

        $convertedImgs = [];

        // Handle conversion WEBP TO JPG
        if ($product->photo && Str::endsWith($product->photo, '.webp')) {
            $jpgName = Str::replaceLast('.webp', '.jpg', $product->photo);
            $paths = [
                'mockup' => storage_path("app/public/temp_images/mockup/$jpgName"),
                'motif' => storage_path("app/public/temp_images/motif/$jpgName"),
            ];

            foreach ($paths as $key => $jpgPath) {
                $directory = dirname($jpgPath);
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }

                if (!file_exists($jpgPath)) {
                    $relativePath = $key === 'mockup'
                        ? ($product->images->first()->path ?? $product->photo)
                        : $product->photo;

                    // Pastikan path relatif (tanpa awalan slash)
                    $relativePath = ltrim($relativePath, '/');

                    // Gunakan path absolut ke public/storage
                    $source = storage_path("app/public/$relativePath");

                    Image::make($source)
                        ->resize($key === 'mockup' ? 1200 : 200, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        })
                        ->encode('jpg', 70)
                        ->save($jpgPath);
                }
                $convertedImgs[] = $jpgPath;
            }
            $product->converted_photo = $paths['mockup'];
            $product->converted_photo2 = $paths['motif'];
        } else {
            $product->converted_photo = $product->photo;
        }

        // Generate PDF
        $pdf = FacadePdf::loadView('product.pdf', $arr)->setPaper('a4', 'landscape');
        $output = $pdf->stream('products.pdf');

        foreach ($convertedImgs as $img) {
            if (file_exists($img)) {
                @unlink($img);
            }
        }

        return $output;
    }

    public function destroyByCategory(Request $request)
    {
        $categoryId = $request->query('category');

        $products = TProduct::where('category_id', $categoryId)->get();

        foreach ($products as $product) {
            // Hapus foto jika ada
            if ($product->photo) {
                $imagePath = storage_path('app/public/' . $product->photo);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
            }

            // Hapus produk
            $product->delete();
        }

        return response()->json([
            'message' => 'Produk dalam kategori berhasil dihapus.'
        ]);
    }

    public function bulkUpload()
    {
        return view('product.bulk-create');
    }

    public function storeBulkUpload(Request $request)
    {
        $request->validate([
            'type' => 'required|in:mockup,motif',
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

                if (!$product) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Kode produk $kode tidak ditemukan."
                    ], 404);
                }

                if ($request->type == 'mockup') {
                    foreach ($product->images->where('type', 'mockup')->get() as $img) {
                        $oldPath = storage_path('app/public/' . $img->path);
                        if (file_exists($oldPath)) {
                            @unlink($oldPath);
                        }
                        $img->delete();
                    }

                    TImage::create([
                        'path' => $path,
                        'product_id' => $product->id,
                        'type' => 'mockup'
                    ]);
                } elseif ($request->type == 'motif') {
                    $motifImage = $product->images->where('type', 'motif')->first();
                    if ($motifImage) {
                        $oldPath = storage_path('app/public/' . $motifImage->path);
                        if (file_exists($oldPath)) {
                            @unlink($oldPath);
                        }
                        $motifImage->delete();
                    }

                    TImage::create([
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

    public function resetMockup(TProduct $product)
    {
        $mockupImages = $product->images()
            ->where('type', 'mockup')
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
    public function resetMotif(TProduct $product)
    {
        $mockupImages = $product->images()
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
}
