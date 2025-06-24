<?php

namespace App\Http\Controllers;

use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Yajra\DataTables\Facades\DataTables;

class TProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $arr['categories'] = MCategories::all();
        if ($request->ajax()) {
            $query = TProduct::with('category');
            if ($request->has('filter')) {
                $query = $query->where('category_id', $request->filter);
            }
            if ($request->has('search') && $request->search['value'] !== null) {
                $search = $request->search['value'];
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', '%' . $search . '%')
                        ->orWhere('name', 'like', '%' . $search . '%')
                        ->orwhereHas('category', function ($q) use ($search) {
                            $q->where('name', 'like', '%' . $search . '%');
                        });
                });
            }
            $product = $query->get();
            return DataTables::of($product)
                ->addIndexColumn()
                ->addColumn('category', function ($row) {
                    return $row->category ? $row->category->name : '-';
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
        $arr['categories'] = MCategories::all();
        return view('product.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|array',
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|exists:m_categories,id',
        ]);

        $uploadedImages = [];

        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $file) {
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('images/products/' . now()->format('Y/m/d'), $filename, 'public');

                // Simpan ke database jika perlu
                $uploadedImages[] = $path;
                TProduct::create([
                    'photo' => $path,
                    'category_id' => $request->input('category_id'),
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully.',
        ]);
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
}
