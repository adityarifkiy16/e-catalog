<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\TPackage;
use App\Models\TProduct;
use Illuminate\Http\Request;
use App\Services\ImageServices;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class TPackageController extends Controller
{
    protected ImageServices $imageServices;

    public function __construct(ImageServices $imageServices)
    {
        $this->middleware('permission:management_product', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
        $this->imageServices = $imageServices;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = TPackage::with([
                'product' => fn($q) => $q->select('id', 'name', 'code'),
            ])->orderBy('name', 'asc');
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('product', function ($row) {
                    return $row->product ? $row->product->code : '-';
                })
                ->filter(function ($query) use ($request) {
                    if ($request->has('search') && !empty($request->search['value'])) {
                        $search = trim($request->search['value']);

                        $query->where(function ($q) use ($search) {
                            $q->where('t_packages.name', 'like', '%' . $search . '%')
                                ->orWhereHas('product', function ($q2) use ($search) {
                                    $q2->where('code', 'like', '%' . $search . '%')
                                        ->orWhere('name', 'like', '%' . $search . '%');
                                });
                        });
                    }

                    if ($request->has('filter') && !empty($request->filter)) {
                        $query->whereHas('product', fn($q) => $q->where('category_id', $request->filter));
                    }
                })
                ->rawColumns(['action'])
                ->toJson();
        }
        $arr['jenises'] = MJenis::whereHas('categories')->get();
        return view('paket.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['products'] = TProduct::all();
        return view('paket.create', $arr);
    }

    public function bulkUpload()
    {
        return view('paket.bulk-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'product_id' => 'nullable|exists:t_products,id',
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'order' => 'required|numeric',
        ]);

        // dd($request->all());

        DB::beginTransaction();

        try {
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    $folder = 'packages';

                    $product = null;
                    $productFound = false;

                    // Prioritas 1: Cek product_id dari request
                    if ($request->product_id) {
                        $product = TProduct::find($request->product_id);
                        $productFound = true;
                    }
                    // Prioritas 2: Cek berdasarkan nama file jika product_id tidak ada
                    else {
                        $fileCode = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                        $product = TProduct::where('code', $fileCode)->first();

                        if ($product) {
                            $productFound = true;
                        } else {
                            $arr['warning'][] = "Product dengan kode '{$fileCode}' tidak ditemukan";
                            continue;
                        }
                    }

                    // Jika produk ditemukan, proses gambar dan buat package
                    if ($productFound && $product) {
                        $exists = $product->packages()->where('name', $request->name)->exists();
                        if ($exists) {
                            $arr['warning'][] = "paket '{$request->name}' sudah ada untuk produk '{$product->code}'";
                            continue;
                        } else {
                            $path = $this->imageServices->store($file, $folder, 800);
                            TPackage::create([
                                'name' => $request->name,
                                'product_id' => $product->id,
                                'image' => $path,
                                'order' => $request->order
                            ]);
                        }
                    }
                }
            }

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Packages created successfully.',
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
    public function show(TPackage $tPackage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TPackage $package)
    {
        $arr['package'] = $package;
        $arr['products'] = TProduct::all();
        return view('paket.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TPackage $package)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'product_id' => 'required|exists:t_products,id',
            'image' => 'nullable',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'product_id' => $request->product_id,
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'packages';
            if ($package->image) {
                if (file_exists(storage_path('app/public/' . $package->image))) {
                    @unlink(storage_path('app/public/' . $package->image));
                }
            }
            $path = $this->imageServices->store($file, $folder, 800);
            $data['image'] = $path;
        }

        $package->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Paket berhasil diperbarui.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TPackage $package)
    {
        $package->delete();
        if ($package->image) {
            if (file_exists(storage_path('app/public/' . $package->image))) {
                unlink(storage_path('app/public/' . $package->image));
            }
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Paket berhasil dihapus.',
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->ids;
        TPackage::whereIn('id', $ids)->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Paket berhasil dihapus.',
        ]);
    }
}
