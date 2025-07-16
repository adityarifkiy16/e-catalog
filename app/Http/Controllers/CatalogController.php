<?php

namespace App\Http\Controllers;


use App\Models\MJenis;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $product =  TProduct::with(['category', 'category.jenis', 'images'])->take(10)->get();
        // dd($product);
        return view('catalog.index', [
            'products' => TProduct::with(['category', 'category.jenis', 'images'])->take(10)->get(),
            'jenis' => MJenis::with('categories')->get(),
        ]);
    }
    public function catalog(Request $request)
    {
        $isAjax = $request->ajax();
        $categoryId = $request->query('category');
        $search = $request->query('search');
        $jenisId = $request->query('jenis');

        $query = TProduct::with(['category', 'category.jenis', 'images']);

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
                $q->where('id', $jenisId);
            });
        }

        if ($isAjax) {
            $data = $query->paginate(8);

            $response = ['data' => $data];

            if ($jenisId) {
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
            'jenis' => MJenis::with('categories')->get(),
            'categories' => MCategories::all(),
        ]);
    }
}
