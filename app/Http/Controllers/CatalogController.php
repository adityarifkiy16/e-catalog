<?php

namespace App\Http\Controllers;


use App\Models\MType;
use App\Models\MJenis;
use App\Models\MSetting;
use App\Models\MVersion;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CatalogController extends Controller
{
    public function index()
    {
        $arr['setting'] = MSetting::first();

        // Ambil semua file dalam folder
        $arr['files'] = File::files(public_path('dist/img/slide-depan'));

        // Ambil nama file tanpa path dan tanpa suffix  
        $arr['sliders'] = collect($arr['files'])->map(fn($f) => $f->getFilename())
            ->filter(function ($name) {
                return !preg_match('/-\d{2,4}\.(jpg|jpeg|png|webp)$/i', $name);
            })
            ->values();

        $arr['firstVersion'] = MVersion::first();

        // Ambil jenis dan kategori
        $arr['jenis'] = MJenis::with([
            'categories.products.productVersions',
            'categories' => function ($q) {
                $q->whereNull('deleted_at')
                    ->orderBy('id');
            }
        ])
            ->withCount([
                'categories as products_count' => function ($query) {
                    $query
                        ->join('t_products', 'm_categories.id', '=', 't_products.category_id')
                        ->join(
                            't_product_m_versions',
                            't_products.id',
                            '=',
                            't_product_m_versions.product_id'
                        )
                        ->whereNull('t_products.deleted_at');
                }
            ])
            ->whereNull('deleted_at')
            ->get()
            ->map(function ($jenis) {
                $jenis->categories = $jenis->categories->take(1);
                return $jenis;
            });

        return view('catalog.index', $arr);
    }

    public function catalog(Request $request)
    {
        $data = $request->validate([
            'jenis' => 'required|exists:m_jenis,id',
            'type' => 'nullable|exists:m_types,id',
            'version' => 'required|exists:m_versions,id',
            'category' => 'required|exists:m_categories,id',
        ]);
        $images = collect();

        if (isset($request->type)) {
            $type = MType::with('images')->find($request->type);
            $images = $type->images ?? collect();
        } else if (isset($data['category'])) {
            $categories  = MCategories::with('images')->find($data['category']);
            $images = $categories->images ?? collect();
        } else {
            $categories = MCategories::with('images')->where('jenis_id', $request->jenis)->first();
            $images = $categories->images ?? collect();
        }

        return view('catalog.catalog', [
            'jenis' => MJenis::with('categories')->get(),
            'imageCarousel' => $images,
            'categories' => MCategories::all(),
            'type' => \App\Models\MType::with('jenis')->get(),
            'versions' => MVersion::orderBy('id', 'desc')->get(),
        ]);
    }

    public function product(Request $request)
    {
        $query = TProduct::with([
            'category',
            'category.jenis',
            "category.images",
            'category.type.images',
            'packages',
            'specifications.specification_values',
            'productVersions.images'
        ]);

        $query->whereHas('productVersions', function ($q) use ($request) {
            if (is_array($request->version)) {
                $q->whereIn('version_id', $request->version);
            } else {
                $q->where('version_id', $request->version);
            }
        });

        // Filter kategori
        if ($request->category) {
            $query->where('category_id', $request->category);

            if ($request->category == 32) {
                $query->orderByRaw("CAST(SUBSTRING_INDEX(code, 'mm', 1) AS UNSIGNED) ASC");
            } else {
                $query->orderBy('code', 'asc');
            }
        } else {
            $category = MCategories::where('jenis_id', $request->jenis)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Filter search
        if ($request->search) {
            $query->where('code', 'like', '%' . $request->search . '%');
        }

        // Filter jenis
        if ($request->jenis) {
            $query->whereHas('category.jenis', function ($q) use ($request) {
                if (is_array($request->jenis)) {
                    $q->whereIn('id', $request->jenis);
                } else {
                    $q->where('id', $request->jenis);
                }
            });
        }

        // Filter type
        if ($request->type) {
            $query->whereHas('category.type', function ($q) use ($request) {
                if (is_array($request->type)) {
                    $q->whereIn('id', $request->type);
                } else {
                    $q->where('id', $request->type);
                }
            });
        }

        // Default order jika tidak ada categoryId
        if (!$request->category) {
            $query->orderBy('code', 'asc');
        }

        $data = $query->paginate(12);

        $response = ['products' => $data];

        // Jika categoryId spesifik
        if ($request->type) {
            $categories = MCategories::with(['jenis', 'images', 'type.images'])
                ->whereHas('type', function ($q) use ($request) {
                    if (is_array($request->type)) {
                        $q->whereIn('id', $request->type);
                    } else {
                        $q->where('id', $request->type);
                    }
                })
                ->get();
            if ($categories->isEmpty()) {
                $response['category'] = [];
                $response['message'] = 'Kategori dengan type tersebut tidak ditemukan';
            } else {
                $response['category'] = $categories;
            }
        } elseif ($request->jenis) {
            $response['category'] = MCategories::with(['jenis', 'images'])
                ->where('jenis_id', $request->jenis)
                ->get();
        }

        // Tambahan data jenis
        if ($request->jenis) {
            $jenis = MJenis::with('categories.products')->find($request->jenis);
            if ($jenis) {
                $response['jenis'] = $jenis;
                if ($jenis->types->isNotEmpty()) {
                    $response['types'] = $jenis->types;
                }
            }
        }
        $response['active_version_id'] = $request->version;
        return response()->json($response);
    }
}
