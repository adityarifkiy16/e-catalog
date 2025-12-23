<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MVersion;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use App\Imports\ProductImport;
use App\Services\ImageServices;
use Illuminate\Support\Facades\DB;
use App\Services\ProductServices;
use Maatwebsite\Excel\Facades\Excel;
use App\Services\ProductViewServices;
use Yajra\DataTables\Facades\DataTables;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class TProductController extends Controller
{
    protected ImageServices $imageServices;
    protected ProductViewServices $viewServices;
    protected ProductServices $productServices;

    public function __construct(ImageServices $imageServices, ProductViewServices $viewServices, ProductServices $productServices)
    {
        $this->middleware('permission:management_product')->except(['downloadPdf', 'downloadPdfProduct', 'show']);
        $this->imageServices = $imageServices;
        $this->viewServices = $viewServices;
        $this->productServices = $productServices;
    }
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
    public function create()
    {
        $arr['jenises'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();
        return view('product.create', $arr);
    }
    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();
        try {
            $product = $this->productServices->create($request->validated());
            $this->productServices->sync($product, $request->specifications);
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
    public function show(TProduct $product, Request $request)
    {
        $this->viewServices->store($product, $request);
        return response()->json(['status' => 'success', 'message' => 'Product viewed successfully.']);
    }
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
    public function update(UpdateProductRequest $request, TProduct $product)
    {
        DB::beginTransaction();
        try {
            $this->productServices->update($product, $request->validated());
            $this->productServices->sync($product, $request->specifications);
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
    public function destroy(TProduct $product)
    {
        DB::beginTransaction();
        try {
            $this->productServices->delete($product);
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
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
        $this->productServices->deleteByCategory($categoryId);
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
            'errors'  => $import->errors,
        ]);
    }
}
