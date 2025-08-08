<?php

namespace App\Http\Controllers;


use App\Models\MJenis;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CatalogController extends Controller
{
    public function index()
    {
        return view('catalog.index', [
            'products' => TProduct::with(['category', 'category.jenis', 'images'])
                ->whereIn('category_id', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42])
                ->get()
                ->groupBy(function ($product) {
                    return $product->category->name ?? 'Tanpa Kategori';
                })
                ->map(function ($group) {
                    return $group->random();
                })
                ->values(),
            'jenis' => MJenis::withCount([
                'categories as products_count' => function ($query) {
                    $query->select(DB::raw('count(t_products.id)'))
                        ->join('t_products', 'm_categories.id', '=', 't_products.category_id')
                        ->whereNull('t_products.deleted_at');
                }
            ])->whereNull('deleted_at')->get()
        ]);
    }
    public function catalog(Request $request)
    {
        $isAjax = $request->ajax();
        $categoryId = $request->query('category');
        $search = $request->query('search');
        $jenisId = $request->query('jenis');

        $query = TProduct::with(['category', 'category.jenis', 'images', "category.images"]);

        // Filter jika ada kategori
        if ($categoryId) {
            $query->where('category_id', $categoryId);

            if ($categoryId == 32) {
                $query->orderByRaw("CAST(SUBSTRING_INDEX(code, 'mm', 1) AS UNSIGNED) ASC");
            } else {
                $query->orderBy('code', 'asc');
            }
        }

        // Filter kode produk (search)
        if ($search) {
            $query->where('code', 'like', '%' . $search . '%');
        }

        // Filter berdasarkan jenis (relasi category.jenis)
        if ($jenisId) {
            $query->whereHas('category.jenis', function ($q) use ($jenisId) {
                if (is_array($jenisId)) {
                    $q->whereIn('id', $jenisId);
                } else {
                    $q->where('id', $jenisId);
                }
            });
        }

        if ($isAjax) {
            $data = $query->paginate(12);
            $response = ['data' => $data];

            if ($categoryId) {
                $category = MCategories::with(['jenis', 'images'])->find($categoryId);
                $response['category'] = $category;
            } else {
                $category = MCategories::with(['jenis', 'images'])->first();
                $response['category'] = $category;
            }

            if (is_array($jenisId)) {
                $jenisCollection = MJenis::with('categories.products')->whereIn('id', $jenisId)->get();
                // Jika perlu, kamu bisa menggabungkan semua categories dari collection ini jadi 1 object:
                $categories = $jenisCollection->flatMap->categories->unique('id')->values();
                $response['jenis'] = [
                    'name' => 'Multiple',
                    'categories' => $categories,
                ];
            } else if ($jenisId) {
                $jenis = MJenis::with('categories.products')->find($jenisId);
                $response['jenis'] = $jenis;
            }


            return response()->json($response);
        }
        if (!$categoryId) {
            $query->orderBy('code', 'asc');
        }
        return view('catalog.catalog', [
            'data' => $query->get(),
            'jenis' => MJenis::with('categories.products.images')->get(),
            'categories' => MCategories::all(),
        ]);
    }
}
