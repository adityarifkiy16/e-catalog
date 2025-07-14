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

        $query = MCategories::with(['products', 'jenis'])->orderBy('order', 'asc');
        $arr['jenis'] = MJenis::all();
        if ($request->ajax()) {
            // Filter berdasarkan jenis (lewat relasi category.jenis)
            if ($request->filled('jenis')) {
                $jenisId = $request->jenis;

                $query->whereHas('jenis', function ($q) use ($jenisId) {
                    $q->where('id', $jenisId);
                });

                $jenis = MJenis::with('categories.products')->find($jenisId);
                $arr['jenis'] = $jenis;
            }

            // Filter berdasarkan search (kode produk)
            if ($request->filled('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            // Ambil data hasil filter
            $arr['data'] = $query->paginate(8);

            return response()->json($arr);
        }
        $arr['data'] = MCategories::with(['products', 'jenis'])->get();
        return view('catalog.index', $arr);
    }
    public function show(Request $request)
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
                $query->orderBy('code', 'asc');
            } else {
                $query->orderBy('created_at', 'asc');
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

        // Pastikan orderBy tidak double
        if (!$categoryId) {
            $query->orderBy('code', 'asc');
        }

        // Jika request biasa (non-AJAX)
        return view('catalog.show', [
            'data' => $query->get(),
            'jenis' => MJenis::with('categories')->get(),
            'categories' => MCategories::all(),
        ]);
    }
}
