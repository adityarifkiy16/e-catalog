<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
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
            $query = TProduct::with('category', 'category.jenis')->orderBy('created_at', 'desc');
            if ($request->has('filter')) {
                $query = $query->where('category_id', $request->filter);
            }
            if ($request->has('search') && $request->search['value'] !== null) {
                $search = $request->search['value'];
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', '%' . $search . '%')
                        ->orWhere('name', 'like', '%' . $search . '%');
                });
            }
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('category', function ($row) {
                    return $row->category ? $row->category->name : '-';
                })
                ->addColumn('jenis', function ($row) {
                    return $row->category->jenis ? $row->category->jenis->name : "Tidak ada jenis";
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
        $arr['jenis'] = MJenis::with('categories')->get();
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

        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $file) {
                $filename = time() . '_' . uniqid() . '.webp';
                $folder = 'images/products/' . now()->format('Y/m/d');
                $fullPath = storage_path('app/public/' . $folder . '/' . $filename);
                $path =  $folder . '/' . $filename;
                Image::make($file)
                    ->resize(800, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    })
                    ->encode('webp', 75) // kualitas 75%
                    ->save($fullPath);

                if (!TProduct::where('code', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->exists()) {
                    TProduct::create([
                        'code' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                        'photo' => $path,
                        'category_id' => $request->input('category_id'),
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Product with this code already exists.',
                    ], 200);
                }
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

    public function getCategoriesByJenis(Request $request)
    {
        $jenisId = $request->input('jenis_id');
        $categories = MCategories::where('jenis_id', $jenisId)->get();
        return response()->json($categories);
    }
}
