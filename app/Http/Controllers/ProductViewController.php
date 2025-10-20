<?php

namespace App\Http\Controllers;

use App\Models\TProduct;
use App\Models\ProductView;
use Illuminate\Http\Request;
use App\Services\ProductViewServices;
use Yajra\DataTables\Facades\DataTables;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;

class ProductViewController extends Controller
{

    protected $viewServices;

    public function __construct(ProductViewServices $viewServices)
    {
        $this->viewServices = $viewServices;
        $this->middleware('permission:view_reports')->only(['laporan', 'downloadLaporan']);
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TProduct::withCount('views')->orderBy('views_count', 'desc')->limit(10);
        if ($request->ajax()) {
            if ($request->has('filter') && $request->filter !== null) {
                $query = $this->viewServices->filter($request->filter);
            }
            return DataTables::of($query)
                ->addIndexColumn()
                ->toJson();
        }
    }

    // Laporan
    public function laporan()
    {
        return view('laporan.index');
    }

    public function downloadLaporan(Request $request)
    {
        $dateFilter = $request->query('filter');

        $query = TProduct::with('category', 'category.jenis')->select('id', 'code', 'photo', 'category_id', 'created_at');

        if ($dateFilter) {
            $query->whereDate('created_at', $dateFilter);
        }

        $products = $query->get();

        $pdf = FacadePdf::loadView('laporan.pdf', ['products' => $products, 'dateFilter' => $dateFilter]);
    }
}
