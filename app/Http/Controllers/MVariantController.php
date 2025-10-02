<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MVariant;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class MVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = MVariant::with('jenis')->orderBy('id', 'desc');
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('jenis', function ($row) {
                    return $row->jenis ? $row->jenis->name : '-';
                })
                ->rawColumns(['action'])
                ->toJson();
        }

        return view('variants.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['jenis'] = MJenis::all();
        return view('variants.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
        ]);

        MVariant::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'variant created successfully.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MVariant $mVariant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MVariant $variant)
    {
        $arr['variant'] = $variant;
        $arr['jenis'] = MJenis::with('variants')->get();
        return view('variants.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MVariant $variant)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
        ]);

        $variant->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'variant updated successfully.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MVariant $variant)
    {
        if ($variant->products()->count() > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'variant cannot be deleted because it has associated product.',
            ]);
        }

        $variant->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'variant deleted successfully.',
        ]);
    }
}
