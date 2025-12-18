<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use App\Models\MJenis;
use App\Models\TImage;
use App\Models\MVersion;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use App\Imports\ProductImport;
use App\Models\MSpecification;
use App\Services\ImageServices;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Models\TSpecificationValue;
use Maatwebsite\Excel\Facades\Excel;
use App\Services\ProductViewServices;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;

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
     * 1. Menampilkan Tabel product
     */
    public function index(Request $request)
    {
        $request->validate([
            'filter' => 'nullable|numeric|exists:m_categories,id',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);
        $arr['jenises'] = MJenis::all();
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

            if ($request->has('version') && $request->version !== null) {
                $query = $query->whereHas('productVersions', function ($q) use ($request) {
                    $q->where('version_id', $request->version);
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
     * 2. Menampilkan form create
     */
    public function create()
    {
        $arr['jenises'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();
        return view('product.create', $arr);
    }

    /**
     * 3. Menyimpan data product
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:255|unique:t_products',
            'name' => 'nullable|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'category_id' => 'required|exists:m_categories,id',
            'url_video' => 'nullable|url',
            'specifications' => 'nullable|array',
            'specifications.*.name' => 'nullable|string|max:255',
            'specifications.*.value' => 'nullable|string|max:255',
            'specifications.*.unit' => 'nullable|string|max:255',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'code' => $request->code,
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'type_id' => $request->type_id,
                'category_id' => $request->category_id,
                'url_video' => $request->url_video
            ];
            $product = TProduct::create($data);

            $syncData = [];

            // Spesifikasi
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

            $product->specifications()->sync($syncData);


            if ($request->has('version')) {
                $product->productVersions()->create([
                    'version_id' => $request->version,
                ]);
            }

            DB::commit();

            return response()->json(['status' => 'success', 'message' => 'Product created successfully.']);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal update: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 4. Menampilkan detail product
     */
    public function show(TProduct $product, Request $request)
    {
        $this->viewServices->store($product, $request);
        return response()->json(['status' => 'success', 'message' => 'Product viewed successfully.']);
    }

    /**
     * 5. Menampilkan form edit
     */
    public function edit(TProduct $product)
    {
        $arr['product'] = $product;
        $arr['jenises'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();

        // 1. Ambil spesifikasi dari pivot + join ke tabel terkait
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
     * 6. Memperbarui data master produk
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
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'category_id' => 'required|exists:m_categories,id',
            'url_video' => 'nullable|url',
            'specifications' => 'nullable|array',
            'specifications.*.name' => 'nullable|string|max:255',
            'specifications.*.value' => 'nullable|string|max:255',
            'specifications.*.unit' => 'nullable|string|max:255',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'code' => $request->code,
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'type_id' => $request->type_id,
                'category_id' => $request->category_id,
                'url_video' => $request->url_video
            ];

            $syncData = [];

            // Spesifikasi
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
        if ($product->productVersions->count() > 0) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Product cannot be deleted because it is in use.'
            ]);
        }
        $product->delete();
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

    public function importExcel()
    {
        return view('product.import');
    }

    public function import(Request $request)
    {
        $import = new ProductImport();
        Excel::import($import, $request->file('file'));

        return response()->json([
            'status'  => 'success',
            'message' => 'Data imported successfully.',
            'errors'  => $import->errors, // ← kirim error ke frontend
        ]);
    }
}
