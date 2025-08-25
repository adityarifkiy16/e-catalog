<?php

namespace App\Http\Controllers;

use App\Models\TPackage;
use App\Models\TProduct;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Yajra\DataTables\Facades\DataTables;

class TPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = TPackage::orderBy('id', 'desc');
            if ($request->has('search') && $request->search['value'] !== null) {
                $search = $request->search['value'];
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhereHas('products', function ($q2) use ($search) {
                            $q2->where('code', 'like', '%' . $search . '%')
                                ->orWhere('name', 'like', '%' . $search . '%');
                        });
                });
            }
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('product', function ($row) {
                    return $row->products ? $row->products->code : '-';
                })
                ->rawColumns(['action'])
                ->toJson();
        }
        return view('paket.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['products'] = TProduct::all();
        return view('paket.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'product_id' => 'required|exists:t_products,id',
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'images/packages/' . now()->format('Y/m/d');
            $filename = time() . '_' . uniqid() . '.webp';
            $fullPath = storage_path('app/public/' . $folder . '/' . $filename);
            $path = $folder . '/' . $filename;

            $directory = dirname($fullPath);
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            // Proses gambar
            Image::make($file)
                ->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->save($fullPath);

            TPackage::create([
                'name' => $request->name,
                'product_id' => $request->product_id,
                'image' => $path,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Paket berhasil ditambahkan.',
        ], 200);
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
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'images/packages/' . now()->format('Y/m/d');
            $filename = time() . '_' . uniqid() . '.webp';
            $fullPath = storage_path('app/public/' . $folder . '/' . $filename);
            $path = $folder . '/' . $filename;

            $directory = dirname($fullPath);
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            // Proses gambar
            Image::make($file)
                ->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->save($fullPath);

            if ($package->image) {
                if (file_exists(storage_path('app/public/' . $package->image))) {
                    unlink(storage_path('app/public/' . $package->image));
                }
            }

            $package->update([
                'name' => $request->name,
                'product_id' => $request->product_id,
                'image' => $path,
            ]);
        }

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
}
