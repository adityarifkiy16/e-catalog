<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Yajra\DataTables\Facades\DataTables;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;

class TProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $arr['categories'] = MCategories::all();
        if ($request->ajax()) {
            $query = TProduct::with([
                'category' => fn($q) => $q->select('id', 'name', 'jenis_id'),
                'category.jenis' => fn($q) => $q->select('id', 'name')
            ])
                ->select('id', 'code', 'photo', 'category_id')
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
            'image' => 'required|array',
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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

                    // Buat watermark dan resize (misal lebar 100px)
                    $watermark = Image::make(public_path('dist/img/osborn.png'))
                        ->resize(200, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });

                    if (!TProduct::where('code', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->exists()) {

                        // Proses gambar
                        Image::make($file)
                            ->resize(800, null, function ($constraint) {
                                $constraint->aspectRatio();
                                $constraint->upsize();
                            })
                            ->insert($watermark, 'center', 10, 10)
                            ->encode('webp', 100)
                            ->save($fullPath);

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|exists:m_categories,id',
        ]);

        if (!$request->hasFile('image')) {
            $product->update([
                'code' => $request->input('code'),
                'name' => $request->input('name'),
                'category_id' => $request->input('category_id'),
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully.',
            ]);
        }

        $file = $request->file('image');
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('images/products/' . now()->format('Y/m/d'), $filename, 'public');
        $product->update([
            'code' => $request->input('code'),
            'name' => $request->input('name'),
            'photo' => $path,
            'category_id' => $request->input('category_id'),
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully.',
        ]);
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
                unlink($imagePath);
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
                    $jpgPath = storage_path('app/temp_images/' . $jpgName);
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
}
