<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Yajra\DataTables\Facades\DataTables;

class MCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $arr['jenises'] = MJenis::all();
        if ($request->ajax()) {
            $query = MCategories::with('jenis')->orderBy('id', 'desc');
            if ($request->has('filter')) {
                $query = $query->where('jenis_id', $request->filter);
            }
            if ($request->has('search') && $request->search['value'] !== null) {
                $search = $request->search['value'];
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('type', function ($row) {
                    return $row->types ? $row->types->name : '-';
                })
                ->addColumn('jenis', function ($row) {
                    return $row->jenis ? $row->jenis->name : '-';
                })
                ->addColumn('product_count', function ($row) {
                    return $row->products()->count();
                })
                ->rawColumns(['action'])
                ->make(true);
        }
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
            'image' => 'nullable',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'display_style' => 'nullable|string|max:255|in:square,rectangle',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'images/categories/' . now()->format('Y/m/d');
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
                ->encode('webp', 100)
                ->save($fullPath);

            MCategories::create([
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'type_id' => $request->type_id,
                'path' => $path,
                'display_style' => $request->display_style
            ]);
        } else {
            MCategories::create([
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'type_id' => $request->type_id,
                'display_style' => $request->display_style
            ]);
        }
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
        $arr['types'] = \App\Models\MType::with('jenis')->get();
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
            'type_id' => 'nullable|exists:m_types,id',
            'image' => 'nullable',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'display_style' => 'nullable|string|max:255|in:square,rectangle',
            'order' => 'nullable|numeric',
            'image-mockup' => 'nullable',
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'images/3Dcategories/' . now()->format('Y/m/d');
            $filename = time() . '_' . uniqid() . '.webp';
            $fullPath = storage_path('app/public/' . $folder . '/' . $filename);
            $path = $folder . '/' . $filename;

            $directory = dirname($fullPath);
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            // Hapus gambar lama jika ada
            if ($categories->path) {
                $oldPath = storage_path('app/public/' . $categories->path);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Proses gambar
            Image::make($file)
                ->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 100)
                ->save($fullPath);

            $categories->update([
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'path' => $path,
                'display_style' => $request->display_style,
                'order' => $request->order,
                'type_id' => $request->type_id
            ]);
        } else {
            $categories->update([
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'display_style' => $request->display_style,
                'order' => $request->order,
                'type_id' => $request->type_id
            ]);
        }

        if ($request->hasFile('image-mockup')) {
            $files = $request->file('image-mockup');
            $folder = 'images/mockupcategories/' . now()->format('Y/m/d');

            foreach ($files as $file) {
                $filename = time() . '_' . uniqid() . '.webp';
                $fullPath = storage_path('app/public/' . $folder . '/' . $filename);
                $path = $folder . '/' . $filename;

                $directory = dirname($fullPath);
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }

                // Hapus gambar lama jika ada
                foreach ($categories->images as $oldImage) {
                    $oldPath = storage_path('app/public/' . $oldImage->path);
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                    $oldImage->delete();
                }

                // Proses gambar
                Image::make($file)
                    ->resize(1200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    })
                    ->encode('webp', 100)
                    ->save($fullPath);

                // Simpan ke relasi images (One to Many)
                $categories->images()->create([
                    'path' => $path,
                ]);
            }

            // Update data kategori
            $categories->update([
                'name' => $request->name,
                'jenis_id' => $request->jenis_id,
                'display_style' => $request->display_style,
                'order' => $request->order,
                'type_id' => $request->type_id
            ]);
        }

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
