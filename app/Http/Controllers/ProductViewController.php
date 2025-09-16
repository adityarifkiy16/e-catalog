<?php

namespace App\Http\Controllers;

use App\Models\TProduct;
use App\Models\ProductView;
use Illuminate\Http\Request;
use App\Services\ProductViewServices;
use Yajra\DataTables\Facades\DataTables;

class ProductViewController extends Controller
{

    protected $viewServices;

    public function __construct(ProductViewServices $viewServices)
    {
        $this->viewServices = $viewServices;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TProduct::withCount('views')->orderBy('views_count', 'desc')->limit(5);
        if ($request->ajax()) {
            if ($request->has('filter') && $request->filter !== null) {
                $query = $this->viewServices->filter($request->filter);
            }
            return DataTables::of($query)
                ->addIndexColumn()
                ->toJson();
        }
    }
}
