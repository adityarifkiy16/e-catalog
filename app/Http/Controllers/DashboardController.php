<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MJenis;
use App\Models\TProduct;
use App\Models\MCategories;
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

        $arr['count'] = [
            'user' => User::count(),
            'product' => TProduct::count(),
            'jenis' => MJenis::count(),
            'category' => MCategories::count(),
        ];
        $arr['produkPerJenis'] = $produkPerJenis;
        // dd($arr);
        return view('dashboard.index', $arr);
    }
}
