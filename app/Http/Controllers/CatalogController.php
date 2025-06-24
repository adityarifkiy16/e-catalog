<?php

namespace App\Http\Controllers;

use App\Models\TProduct;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $arr = [];
        if ($request->ajax()) {
            $query = TProduct::with('category', 'category.jenis');

            if ($request->has('category')) {
                $query->whereHas('categories', function ($q) use ($request) {
                    $q->where('id', $request->query('category'));
                });
            }

            if ($request->has('search')) {
                $query->where('code', 'like', '%' . $request->query('search') . '%');
            }

            if ($request->has('jenis')) {
                $query->whereHas('jenis', function ($q) use ($request) {
                    $q->where('id', $request->query('jenis'));
                });
            }
            $arr['data'] = $query->get();
            return response()->json(['data' => $query->get()]);
        } else {
            $arr['data'] = TProduct::with('category', 'category.jenis')->get();
        }
        return view('catalog.index', $arr);
    }
}
