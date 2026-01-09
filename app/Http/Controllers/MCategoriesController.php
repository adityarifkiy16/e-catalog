<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MCategories;
use Illuminate\Http\Request;
use App\Services\ImageServices;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;

class MCategoriesController extends Controller
{
    protected ImageServices $imageServices;

    public function __construct(ImageServices $imageServices)
    {
        $this->middleware('permission:management_product', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
        $this->imageServices = $imageServices;
    }

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
                    return $row->type ? $row->type->name : '-';
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

    public function create()
    {
        $arr['jenis'] = MJenis::all();
        return view('categories.create', $arr);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-mockup' => 'nullable',
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'display_style' => 'nullable|string|max:255|in:square,rectangle',
            'order' => 'required|numeric',
        ]);

        $data = [
            'name' => $request->name,
            'jenis_id' => $request->jenis_id,
            'type_id' => $request->type_id,
            'display_style' => $request->display_style,
            'order' => $request->order
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'categories';
            $path = $this->imageServices->store($file, $folder, 50);
            $data['path'] = $path;
        }

        $categories = MCategories::create($data);

        if ($request->hasFile('image-mockup')) {
            $files = $request->file('image-mockup');
            $folder = 'mockupcategories';
            foreach ($files as $file) {
                $path = $this->imageServices->store($file, $folder, 800);
                $categories->images()->create([
                    'path' => $path,
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'category created successfully.',
        ], 201);
    }

    public function show(MCategories $mCategories)
    {
        //
    }

    public function edit(MCategories $categories)
    {
        $arr['categories'] = $categories;
        $arr['jenis'] = MJenis::all();
        $arr['types'] = \App\Models\MType::with('jenis')->get();
        return view('categories.edit', $arr);
    }

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
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp',
            'existing_images' => 'nullable|string',
        ]);

        $data = [
            'name' => $request->name,
            'jenis_id' => $request->jenis_id,
            'type_id' => $request->type_id,
            'display_style' => $request->display_style,
            'order' => $request->order
        ];

        // save 3d image
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'categories';

            if ($categories->path) {
                $this->imageServices->deleteImages($categories);
            }

            $path = $this->imageServices->store($file, $folder, 50);
            $data['path'] = $path;
        }

        if ($request->hasFile('image-mockup') || $request->has('existing_images')) {
            $folder = 'mockupcategories';

            $existingImagesIds = $request->existing_images ? json_decode($request->existing_images, true) : [];
            $existingToDelete = $categories->images()->whereNotIn('id', $existingImagesIds)->get();
            if ($existingToDelete->count() > 0) {
                foreach ($existingToDelete as $oldImage) {
                    $this->imageServices->deleteImages($oldImage, '517');
                }
            }
            if ($request->hasFile('image-mockup')) {
                foreach ($request->file('image-mockup') as $file) {
                    $path = $this->imageServices->store($file, $folder, 800);
                    // $path = $this->imageServices->storeWithoutCompress($file, $folder);
                    $categories->images()->create([
                        'path' => $path,
                    ]);
                }
            }
        }

        $categories->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully.',
        ], 200);
    }

    public function destroy(MCategories $categories)
    {

        if ($categories->products()->count() > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category cannot be deleted because it has associated products.',
            ], 200);
        }

        if ($categories->images()->count() > 0) {
            foreach ($categories->images as $image) {
                $this->imageServices->deleteImages($image, '517');
            }
        }

        $categories->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully.',
        ], 200);
    }

    public function getByType(Request $request)
    {
        if ($request->ajax()) {
            $categories = MCategories::where('type_id', $request->type_id)->get();
            return response()->json($categories);
        }
    }

    public function getByJenis(Request $request)
    {
        if ($request->ajax()) {
            $categories = MCategories::where('jenis_id', $request->jenis_id)->get();
            return response()->json($categories);
        }
    }
}
