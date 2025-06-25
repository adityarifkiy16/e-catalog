<?php

namespace App\Http\Controllers;

use App\Models\MCategories;
use App\Models\MJenis;
use Illuminate\Http\Request;

class MCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arr['categories'] = MCategories::all();
        $arr['jenis'] = MJenis::all();
        return view('categories.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['jenis'] = MJenis::all();
        return view('categories.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
        ]);

        MCategories::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'category created successfully.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MCategories $mCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MCategories $categories)
    {
        $arr['categories'] = $categories;
        $arr['jenis'] = MJenis::all();
        return view('categories.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MCategories $categories)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
        ]);

        $categories->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MCategories $categories)
    {

        if ($categories->products()->count() > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category cannot be deleted because it has associated products.',
            ], 200);
        }

        $categories->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully.',
        ], 200);
    }
}
