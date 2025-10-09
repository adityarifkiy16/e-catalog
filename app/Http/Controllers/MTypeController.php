<?php

namespace App\Http\Controllers;

use App\Models\MType;
use App\Models\MJenis;
use App\Services\ImageServices;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Yajra\DataTables\Facades\DataTables;

class MTypeController extends Controller
{

    protected ImageServices $imageServices;

    public function __construct(ImageServices $imageServices)
    {
        $this->middleware('permission:management_product', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
        $this->imageServices = $imageServices;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $arr['jenises'] = MJenis::all();
        if ($request->ajax()) {
            $query = MType::with('jenis')->orderBy('id', 'desc');
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
                ->addColumn('jenis', function ($row) {
                    return $row->jenis ? $row->jenis->name : '-';
                })
                ->rawColumns(['action'])
                ->make(true);
        }
        return view('type.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['jenis'] = MJenis::all();
        return view('type.create', $arr);
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
            'thumbnail' => 'nullable',
            'thumbnail.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'mockups' => 'nullable',
            'mockups.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'jenis_id' => $request->jenis_id,
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'types';
            $path = $this->imageServices->store($file, $folder, 800);
            $data['image'] = $path;
        }

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $folder = 'types';
            $path = $this->imageServices->store($file, $folder, 800);
            $data['thumbnail'] = $path;
        }

        $type = MType::create($data); //create type

        if ($request->hasFile('mockups')) {
            foreach ($request->file('mockups') as $file) {
                $folder = 'types';
                $path = $this->imageServices->store($file, $folder, 1200);
                $type->images()->create([
                    'path' => $path
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Type created successfully.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MType $type)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MType $type)
    {
        $arr['type'] = $type;
        $arr['jenis'] = MJenis::all();
        return view('type.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MType $type)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
            'image' => 'nullable',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'thumbnail' => 'nullable',
            'thumbnail.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'mockups' => 'nullable',
            'mockups.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'jenis_id' => $request->jenis_id,
        ];

        if ($request->has('jenis_id')) {
            if ($request->jenis_id != $type->jenis_id) {
                if ($type->categories()->exists()) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Type cannot be updated because it has categories.',
                    ], 200);
                }
            }
        }


        if ($request->hasFile('mockups')) {
            foreach ($request->file('mockups') as $file) {
                foreach ($type->images as $oldImage) {
                    $oldPath = storage_path('app/public/' . $oldImage->path);
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                    $oldImage->delete();
                }
                $folder = 'types';
                $path = $this->imageServices->store($file, $folder, 1200);
                $type->images()->create([
                    'path' => $path
                ]);
            }
        }

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $folder = 'types';
            if ($type->thumbnail) {
                $oldPath = storage_path('app/public/' . $type->thumbnail);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $path = $this->imageServices->store($file, $folder, 800);
            $data['thumbnail'] = $path;
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $folder = 'types';
            if ($type->image) {
                $oldPath = storage_path('app/public/' . $type->image);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $path = $this->imageServices->store($file, $folder, 800);
            $data['image'] = $path;
        }

        $type->update($data);
        return response()->json([
            'status' => 'success',
            'message' => 'Type updated successfully.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MType $type)
    {
        if ($type->categories()->count() > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'type cannot be deleted because it has associated category.',
            ], 200);
        }

        foreach ($type->images as $image) {
            $imagePath = storage_path('app/public/' . $image->path);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
            $image->delete();
        }

        $type->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully.',
        ], 200);
    }
    public function getByJenis($jenisId)
    {
        $types = \App\Models\MType::where('jenis_id', $jenisId)->get();
        return response()->json($types);
    }
}
