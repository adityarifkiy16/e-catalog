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

        $query = MCategories::with(['products', 'jenis'])->orderBy('name', 'asc');
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
                $query->where('code', 'like', '%' . $request->search . '%');
            }

            // Ambil data hasil filter
            $arr['data'] = $query->paginate(8);

            return response()->json($arr);
        }
        $arr['data'] = MCategories::with(['products', 'jenis'])->get();
        return view('catalog.index', $arr);
    }
    public function show(Request $request, $id)
    {
        $arr = [];

        // Inisialisasi query produk dengan eager loading
        $query = TProduct::with(['category', 'category.jenis', 'images'])->where('category_id', $id)->orderBy('code', 'asc');

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

                $jenis = MJenis::with('categories.products')->find($jenisId);
                $arr['jenis'] = $jenis;
            }


            // Ambil data hasil filter
            $arr['data'] = $query->paginate(8);

            return response()->json($arr);
        }

        // Request biasa (bukan AJAX)
        $arr['data'] = TProduct::with('category', 'category.jenis')->get();
        $arr['jenis'] = MJenis::with('categories')->get();
        $arr['categories'] = MCategories::all();

        return view('catalog.show', $arr);
    }
}
