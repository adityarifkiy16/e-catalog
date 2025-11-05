<?php

namespace App\Http\Controllers;


use App\Models\MJenis;
use App\Models\MSetting;
use App\Models\TProduct;
use App\Models\MCategories;
use App\Models\MVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class CatalogController extends Controller
{
    public function index()
    {
        $arr['setting'] = MSetting::first();

        // Ambil semua file dalam folder
        $arr['files'] = File::files(public_path('dist/img/slide-depan'));

        // Ambil nama file tanpa path
        $arr['products'] = collect($arr['files'])->map(function ($file) {
            return $file->getFilename(); // misalnya "01.jpg"
        });

        $arr['jenis'] = MJenis::withCount([
            'categories as products_count' => function ($query) {
                $query->select(DB::raw('count(t_products.id)'))
                    ->join('t_products', 'm_categories.id', '=', 't_products.category_id')
                    ->whereNull('t_products.deleted_at');
            }
        ])->whereNull('deleted_at')->get();

        return view('catalog.index', $arr);
    }
    public function catalog(Request $request)
    {
        $isAjax = $request->ajax();
        $categoryId = $request->query('category');
        $search = $request->query('search');
        $jenisId = $request->query('jenis');
        $typeId = $request->query('type');
        $versionId = $request->query('version');

        $query = TProduct::with(['category', 'category.jenis', "category.images", 'category.types.images', 'packages', 'specifications.specification_values', 'productVersions.images']);

        if ($versionId) {
            $query->whereHas('productVersions', function ($q) use ($versionId) {
                if (is_array($versionId)) {
                    $q->whereIn('version_id', $versionId);
                } else {
                    $q->where('version_id', $versionId);
                }
            });
        }

        // Filter kategori
        if ($categoryId) {
            $query->where('category_id', $categoryId);

            if ($categoryId == 32) {
                $query->orderByRaw("CAST(SUBSTRING_INDEX(code, 'mm', 1) AS UNSIGNED) ASC");
            } else {
                $query->orderBy('code', 'asc');
            }
        }

        // Filter search
        if ($search) {
            $query->where('code', 'like', '%' . $search . '%');
        }

        // Filter jenis
        if ($jenisId) {
            $query->whereHas('category.jenis', function ($q) use ($jenisId) {
                if (is_array($jenisId)) {
                    $q->whereIn('id', $jenisId);
                } else {
                    $q->where('id', $jenisId);
                }
            });
        }

        // Filter type
        if ($typeId) {
            $query->whereHas('category.types', function ($q) use ($typeId) {
                if (is_array($typeId)) {
                    $q->whereIn('id', $typeId);
                } else {
                    $q->where('id', $typeId);
                }
            });
        }

        if ($isAjax) {
            $data = $query->paginate(12);

            $response = ['data' => $data];

            // Jika categoryId spesifik
            if ($typeId) {
                $categories = MCategories::with(['jenis', 'images', 'types.images'])
                    ->whereHas('types', function ($q) use ($typeId) {
                        if (is_array($typeId)) {
                            $q->whereIn('id', $typeId);
                        } else {
                            $q->where('id', $typeId);
                        }
                    })
                    ->get();
                if ($categories->isEmpty()) {
                    $response['category'] = [];
                    $response['message'] = 'Kategori dengan type tersebut tidak ditemukan';
                } else {
                    $response['category'] = $categories;
                }
            } elseif ($jenisId) {
                $response['category'] = MCategories::with(['jenis', 'images'])
                    ->where('jenis_id', $jenisId)
                    ->get();
            }

            // Tambahan data jenis
            if ($jenisId) {
                $jenis = MJenis::with('categories.products')->find($jenisId);
                if ($jenis) {
                    $response['jenis'] = $jenis;
                    if ($jenis->types->isNotEmpty()) {
                        $response['types'] = $jenis->types;
                    }
                }
            }

            return response()->json($response);
        }

        // Default order jika tidak ada categoryId
        if (!$categoryId) {
            $query->orderBy('code', 'asc');
        }

        return view('catalog.catalog', [
            'data' => $query->get(),
            'jenis' => MJenis::with('categories')->get(),
            'categories' => MCategories::all(),
            'types' => \App\Models\MType::with('jenis')->get(),
            'versions' => MVersion::orderBy('id', 'desc')->get(),
        ]);
    }
}
