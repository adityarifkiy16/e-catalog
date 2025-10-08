<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use Illuminate\Http\Request;

class MJenisController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:management_product', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arr['jenis'] = MJenis::all();
        return view('jenis.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('jenis.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:m_jenis,name',
        ]);

        MJenis::create($request->only('name'));

        return response()->json([
            'status' => 'success',
            'message' => 'jenis created successfully.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MJenis $mJenis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MJenis $jenis)
    {
        $arr['jenis'] = $jenis;
        return view('jenis.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MJenis $jenis)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $jenis->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'jenis updated successfully.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MJenis $jenis)
    {
        if ($jenis->categories()->count() > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot delete jenis with associated categories.',
            ], 400);
        }

        $jenis->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'jenis deleted successfully.',
        ], 200);
    }
}
