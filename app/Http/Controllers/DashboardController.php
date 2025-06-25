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
        $arr['count'] = [
            'user' => User::count(),
            'product' => TProduct::count(),
            'jenis' => MJenis::count(),
            'category' => MCategories::count(),
        ];
        // dd($arr['count']);
        return view('dashboard.index', $arr);
    }
}
