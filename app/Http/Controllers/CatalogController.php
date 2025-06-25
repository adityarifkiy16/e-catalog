<?php

namespace App\Http\Controllers;

use App\Models\MCategories;
use App\Models\MJenis;
use App\Models\TProduct;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $arr = [];

        // Inisialisasi query produk dengan eager loading
        $query = TProduct::with(['category', 'category.jenis']);

        if ($request->ajax()) {
            // Filter berdasarkan kategori
            if ($request->filled('category')) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('id', $request->category);
                });
            }

            // Filter berdasarkan search (kode produk)
            if ($request->filled('search')) {
                $query->where('code', 'like', '%' . $request->search . '%');
            }

            // Filter berdasarkan jenis (lewat relasi category.jenis)
            if ($request->filled('jenis')) {
                $jenisId = $request->jenis;

                $query->whereHas('category.jenis', function ($q) use ($jenisId) {
                    $q->where('id', $jenisId);
                });

                // Ambil kategori yang cocok dengan jenis tersebut
                $arr['categories'] = MCategories::where('jenis_id', $jenisId)->get();
            }

            // Ambil data hasil filter
            $arr['data'] = $query->paginate(4);

            return response()->json($arr);
        }

        // Request biasa (bukan AJAX)
        $arr['data'] = TProduct::with('category', 'category.jenis')->get();
        $arr['jenis'] = MJenis::with('categories')->get();
        $arr['categories'] = MCategories::all();

        return view('catalog.index', $arr);
    }
}
