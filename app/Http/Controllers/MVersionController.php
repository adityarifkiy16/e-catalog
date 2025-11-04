<?php

namespace App\Http\Controllers;

use App\Models\MVersion;
use App\Models\TProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class MVersionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MVersion::orderBy('id', 'desc');
        if ($request->ajax()) {
            if ($request->has('search') && $request->search['value']) {
                $search = $request->search['value'];
                $query->where('path', 'LIKE', "%{$search}%");
            }

            return DataTables::of($query)
                ->addIndexColumn()
                ->rawColumns(['action'])
                ->toJson();
        }
        return view('version.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('version.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'version' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        // 1. Ambil versi sebelumnya sebelum membuat versi baru
        $previousVersion = MVersion::latest('id')->first();

        DB::beginTransaction();

        try {
            // 2. Buat versi baru
            $newVersion = MVersion::create([
                'version' => $request->version,
                'description' => $request->description,
            ]);

            // 3. Kalau belum ada versi sebelumnya → ambil dari produk utama
            if (!$previousVersion) {
                $products = TProduct::all();

                foreach ($products as $p) {
                    $newProductVersion = $newVersion->productVersion()->create([
                        'product_id' => $p->id,
                        'name'       => $p->name,
                    ]);


                    if ($p->images) {
                        foreach ($p->images as $image) {
                            $newProductVersion->images()->create([
                                'path' => $image->path,
                                'type' => $image->type,
                                'product_id' => $p->id
                            ]);
                        }
                    }

                    if ($p->photo) {
                        $newProductVersion->images()->create([
                            'path' => $p->photo,
                            'type' => 'thumbnail',
                            'product_id' => $p->id
                        ]);
                    }
                }
            } else {
                // 4. Duplikasi dari versi sebelumnya
                foreach ($previousVersion->productVersion as $oldProduct) {
                    $newProductVersion = $newVersion->productVersion()->create([
                        'product_id' => $oldProduct->product_id,
                        'name'       => $oldProduct->name,
                    ]);

                    foreach ($oldProduct->images as $oldImage) {
                        $newProductVersion->images()->create([
                            'path' => $oldImage->path, // ✅ fix: gunakan 'path', bukan 'image'
                            'type' => $oldImage->type,
                            'product_id' => $oldProduct->product_id
                        ]);
                    }
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Version created successfully.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(MVersion $version)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MVersion $version)
    {
        return view('version.edit', compact('version'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MVersion $version)
    {
        $request->validate([
            'version' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $version->update([
            'version' => $request->version,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Version updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MVersion $version)
    {
        if ($version->productVersion->count() > 0) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Version cannot be deleted because it is in use.'
            ]);
        }
        $version->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Version deleted successfully.'
        ]);
    }
}
