<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\TImage;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;

class TProductController extends Controller
{
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
                ->select('id', 'photo', 'code', 'category_id')
                ->orderBy('code', 'asc');
            if ($request->has('filter')) {
                $query = $query->where('category_id', $request->filter);
            }
            if ($request->has('search') && $request->search['value'] !== null) {
                $search = $request->search['value'];
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', '%' . $search . '%')
                        ->orWhere('name', 'like', '%' . $search . '%');
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
                    $filename = time() . '_' . uniqid() . '.webp';
                    $folder = 'images/products/' . now()->format('Y/m/d');
                    $fullPath = storage_path('app/public/' . $folder . '/' . $filename);
                    $path =  $folder . '/' . $filename;

                    $directory = dirname($fullPath);
                    if (!file_exists($directory)) {
                        mkdir($directory, 0755, true);
                    }

                    // // Buat watermark dan resize (misal lebar 100px)
                    // $watermark = Image::make(public_path('dist/img/osborn.png'))
                    //     ->resize(200, null, function ($constraint) {
                    //         $constraint->aspectRatio();
                    //         $constraint->upsize();
                    //     });

                    if (!TProduct::where('code', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->exists()) {

                        $product = TProduct::create([
                            'code' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                            'photo' => $path,
                            'category_id' => $request->input('category_id'),
                        ]);

                        // Proses gambar
                        Image::make($file)
                            ->resize(800, null, function ($constraint) {
                                $constraint->aspectRatio();
                                $constraint->upsize();
                            })
                            ->encode('webp', 100)
                            ->save($fullPath);
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
    public function show(TProduct $tProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TProduct $product)
    {
        $arr['product'] = $product;
        $arr['categories'] = MCategories::all();
        return view('product.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TProduct $product)
    {
        $request->validate([
            'code' => [
                'required',
                Rule::unique('t_products', 'code')
                    ->ignore($product->id)
                    ->whereNull('deleted_at')
            ],
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-mockup' => 'nullable|array',
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:5024',
            'category_id' => 'required|exists:m_categories,id',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'code' => $request->code,
                'name' => $request->name,
                'category_id' => $request->category_id,
            ];

            if ($request->hasFile('image-mockup')) {
                // Hapus semua gambar sebelumnya dari relasi dan storage
                foreach ($product->images as $existingImage) {
                    $oldPath = storage_path('app/public/' . $existingImage->path);

                    // Hapus file dari storage jika ada
                    if (file_exists($oldPath)) {
                        @unlink($oldPath);
                    }

                    // Hapus record dari tabel pivot (detach)
                    $product->images()->detach($existingImage->id);

                    // Hapus record dari tabel images (optional, jika tidak dipakai di tempat lain)
                    $existingImage->delete();
                }

                // Simpan gambar baru
                foreach ($request->file('image-mockup') as $file) {
                    $filename = time() . '_' . uniqid() . '.webp';
                    $folder = 'images/mockup/' . now()->format('Y/m/d');
                    $path = $folder . '/' . $filename;
                    $fullPath = storage_path('app/public/' . $path);

                    // Buat folder jika belum ada
                    if (!file_exists(dirname($fullPath))) {
                        mkdir(dirname($fullPath), 0755, true);
                    }

                    // Simpan file gambar baru
                    Image::make($file)
                        ->resize(800, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        })
                        ->encode('webp', 100)
                        ->save($fullPath);

                    // Simpan gambar ke database images
                    $image = TImage::create([
                        'path' => $path,
                    ]);

                    // Tambahkan relasi produk dengan gambar
                    $product->images()->attach($image->id);
                }
            }

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . uniqid() . '.webp';
                $folder = 'images/products/' . now()->format('Y/m/d');
                $path = $folder . '/' . $filename;
                $fullPath = storage_path('app/public/' . $path);

                // Hapus photo thumbnail lama
                if ($product->photo) {
                    $imagePath = storage_path('app/public/' . $product->photo);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                }

                // Simpan file gambar baru
                Image::make($file)
                    ->resize(800, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    })
                    ->encode('webp', 100)
                    ->save($fullPath);

                $data = [
                    'photo' => $path
                ];
            }

            $product->update($data);

            // 🔥 Auto delete gambar yang orphan (tidak dipakai produk manapun)
            $this->deleteUnusedImages();

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
        // Optionally, you can also delete the image file from storage
        if ($product->photo) {
            $imagePath = storage_path('app/public/' . $product->photo);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
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

    public function getCategoriesByJenis(Request $request)
    {
        $jenisId = $request->input('jenis_id');
        $categories = MCategories::where('jenis_id', $jenisId)->get();
        return response()->json($categories);
    }

    public function downloadPdf(Request $request)
    {

        $query = TProduct::with('category', 'category.jenis')->select('id', 'code', 'photo', 'category_id');

        if ($request->filled('category')) {
            $arr['products'] =  $query->whereHas('category', function ($q) use ($request) {
                $q->where('id', $request->category);
            })->get();

            $convertedImgs = [];
            foreach ($arr['products'] as $product) {
                $photopath = public_path('storage/' . $product->photo);
                if (file_exists($photopath) && Str::endsWith($product->photo, '.webp')) {
                    $jpgName = Str::replaceLast('.webp', '.jpg', $product->photo);
                    $jpgPath = public_path('storage/temp_images/' . $jpgName);
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

    public function deleteImage()
    {
        $folderPath = storage_path('app/public/images/products/2025/07/02');
        $files = File::glob($folderPath . '/*.webp');

        foreach ($files as $file) {
            // Ubah path absolut jadi relatif ke public storage
            $relativePath = str_replace(storage_path('app/public/'), '', $file); // misal: images/products/2025/07/02/xxx.webp

            // Hapus file jika tidak ditemukan di DB
            if (!TProduct::where('photo', $relativePath)->exists()) {
                if (file_exists($file)) {
                    unlink($file);
                }
            }
        }
    }

    protected function deleteUnusedImages()
    {
        $unusedImages = TImage::doesntHave('product')->get();

        foreach ($unusedImages as $image) {
            $filePath = 'public/' . $image->path;
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }

            $image->delete();
        }
    }

    public function downloadPdfProduct(Request $request)
    {
        if ($request->query('id')) {
            $product = TProduct::with('category', 'category.jenis')->find($request->query('id'));
            $arr['product'] = $product;
            $convertedImgs = [];
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
            // dd($product);
            $pdf = FacadePdf::loadView('product.pdf', $arr)->setPaper('a4', 'landscape');
            $output = $pdf->stream('products.pdf');

            foreach ($convertedImgs as $img) {
                if (file_exists($img)) {
                    @unlink($img);
                }
            }

            return $output;
        }
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
}
