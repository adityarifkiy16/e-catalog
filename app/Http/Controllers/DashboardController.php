<?php

namespace App\Http\Controllers;

use App\Models\ImageCategories;
use App\Models\User;
use App\Models\MJenis;
use App\Models\TImage;
use App\Models\TProduct;
use App\Models\MCategories;
use App\Models\MType;
use App\Models\TPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $produkPerJenis = TProduct::with('category.jenis')->whereNull('deleted_at')
            ->get()
            ->groupBy(function ($item) {
                return $item->category->jenis->name ?? 'Tanpa Jenis';
            })
            ->map(function ($group) {
                return $group->count();
            })
            ->toArray();

        $imageCount = TImage::count() + TProduct::where('photo', '!=', null)->count() + TPackage::where('image', '!=', null)->count() + MType::where('thumbnail', '!=', null)->count() + MCategories::where('path', '!=', null)->count() + ImageCategories::where('path', '!=', null)->count();

        $arr['count'] = [
            'produk' => TProduct::count(),
            'kategori' => MCategories::count(),
            'gambar' => $imageCount,
        ];
        $arr['produkPerJenis'] = $produkPerJenis;
        // dd($arr);
        return view('dashboard.index', $arr);
    }
}
