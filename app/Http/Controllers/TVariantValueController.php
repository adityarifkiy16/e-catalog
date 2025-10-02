<?php

namespace App\Http\Controllers;

use App\Models\MVariant;
use Illuminate\Http\Request;
use App\Models\TVariantValue;
use Yajra\DataTables\Facades\DataTables;

class TVariantValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = TVariantValue::with('variant')->orderBy('id', 'desc');
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('variant', function ($row) {
                    return $row->variant ? $row->variant->name : '-';
                })
                ->rawColumns(['action'])
                ->toJson();
        }

        return view('variant_values.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['variants'] = MVariant::with('jenis')->get();
        return view('variant_values.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'variant_id' => 'required|exists:m_variants,id',
        ]);

        TVariantValue::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'variant value created successfully.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TVariantValue $variant_value)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TVariantValue $variant_value)
    {
        $arr['variant_value'] = $variant_value;
        $arr['variants'] = MVariant::with('jenis')->get();
        return view('variant_values.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TVariantValue $variant_value)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'variant_id' => 'required|exists:m_variants,id',
        ]);

        $variant_value->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'variant value updated successfully.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TVariantValue $variant_value)
    {
        $variant_value->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'variant value deleted successfully.',
        ]);
    }
}
