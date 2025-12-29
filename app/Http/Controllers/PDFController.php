<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MVersion;
use App\Models\GeneratePdf;
use Illuminate\Http\Request;
use App\Services\PdfServices;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class PDFController extends Controller
{

    protected PdfServices $pdfService;

    public function __construct(PdfServices $pdfService)
    {
        $this->pdfService = $pdfService;
    }

    public function index(Request $request)
    {
        $query = DB::table('generated_pdfs')
            ->join('m_versions', 'generated_pdfs.version_id', '=', 'm_versions.id')
            ->select('generated_pdfs.id', 'generated_pdfs.path', 'generated_pdfs.version_id', 'm_versions.version')
            ->orderBy('generated_pdfs.id', 'desc')
            ->get();


        if ($request->ajax()) {
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('version', function ($item) {
                    return $item->version;
                })
                ->rawColumns(['action'])
                ->toJson();
        }

        return view('pdf.index');
    }

    public function create(Request $request)
    {
        $arr['jenis'] = MJenis::all();
        $arr['version'] = MVersion::all();
        return view('pdf.create', $arr);
    }

    // Create ALL PDF
    public function store(Request $request)
    {
        $request->validate([
            'version_id' => 'required|exists:m_versions,id',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
        ]);

        $version = MVersion::find($request->version_id);
        $exists = DB::table('generated_pdfs')
            ->where('version_id', $version->id)
            ->where('jenis_id', $request->jenis_id)
            ->where('type_id', $request->type_id)
            ->first();

        if ($exists && file_exists(storage_path('app/public/' . $exists->path))) {
            unlink(storage_path('app/public/' . $exists->path));
            DB::table('generated_pdfs')->where('id', $exists->id)->delete();
        }


        $path = $this->pdfService->generateCatalogPdf(
            $version,
            $request->jenis_id,
            $request->type_id,
            null,
            true
        );

        // Simpan path ke database
        DB::table('generated_pdfs')->insert([
            'path' => $path,
            'version_id' => $version->id,
            'jenis_id' => $request->jenis_id,
            'type_id' => $request->type_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'PDF generated successfully.',
        ]);
    }


    // Donwload PDF by Categories
    public function downloadPdf(Request $request)
    {
        $request->validate([
            'version_id' => 'required|exists:m_versions,id',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'category' => 'nullable|array',
            'category.*' => 'exists:m_categories,id'
        ]);

        $version = MVersion::find($request->version_id);
        if (!$request->has('category')) {
            $exists = GeneratePdf::where('version_id', $version->id)
                ->where('jenis_id', $request->jenis_id)
                ->where('type_id', $request->type_id)
                ->first();

            if ($exists && file_exists(storage_path('app/public/' . $exists->path))) {
                $path = storage_path('app/public/' . $exists->path);
                $newFilename = 'E-Catalog-Osborn-v' . $version->version . "-" . $exists->jenis->name . '.pdf';
                return response()->file($path, [
                    'Content-Disposition' => 'inline; filename="' . $newFilename . '"',
                    'Content-Type' => 'application/pdf',
                ]);
            }
            return redirect()->back()->with('error', 'PDF not found.');
        }

        if ($request->filled('category')) {
            if (count($request->category) > 3) {
                return redirect()->back()->with('error', 'Pilih maksimal 3 kategori.');
            }

            return $this->pdfService->generateCatalogPdf(
                $version,
                $request->jenis_id,
                $request->type_id,
                $request->category,
                false
            );
        } else {
            return response()->json(['message' => 'Category is required'], 400);
        }
    }

    // public function downloadPdfProduct(Request $request)
    // {
    //     $productId = $request->query('id');
    //     $product = TProduct::with('category', 'category.jenis', 'images')->find($productId);

    //     if (!$product) {
    //         return response()->json(['message' => 'Product not found'], 404);
    //     }

    //     $arr['specifications'] = DB::table('t_product_m_specification as tps')
    //         ->join('m_specifications as ms', 'ms.id', '=', 'tps.specification_id')
    //         ->join('t_specification_values as tsv', 'tsv.id', '=', 'tps.specification_value_id')
    //         ->leftJoin('t_product_m_versions as pmv', 'pmv.product_id', '=', 'p.id')
    //         ->leftJoin('t_images as i', function ($join) {
    //             $join->on('i.product_version_id', '=', 'pmv.id')
    //                 ->where('i.type', '=', 'thumbnail'); // 🔍 hanya ambil image thumbnail
    //         })
    //         ->select(
    //             'ms.id as specification_id',
    //             'ms.name as specification_name',
    //             'tsv.id as specification_value_id',
    //             'tsv.name as specification_value',
    //             'tsv.unit as specification_unit'
    //         )
    //         ->where('tps.product_id', $productId)
    //         ->get();

    //     $arr['product'] = $product;

    //     $convertedImgs = [];

    //     // Handle conversion WEBP TO JPG
    //     if ($product->photo && Str::endsWith($product->photo, '.webp')) {
    //         $jpgName = Str::replaceLast('.webp', '.jpg', $product->photo);
    //         $paths = [
    //             'mockup' => storage_path("app/public/temp_images/mockup/$jpgName"),
    //             'motif' => storage_path("app/public/temp_images/motif/$jpgName"),
    //         ];

    //         foreach ($paths as $key => $jpgPath) {
    //             $directory = dirname($jpgPath);
    //             if (!file_exists($directory)) {
    //                 mkdir($directory, 0755, true);
    //             }

    //             if (!file_exists($jpgPath)) {
    //                 $relativePath = $key === 'mockup'
    //                     ? ($product->images->first()->path ?? $product->photo)
    //                     : $product->photo;

    //                 // Pastikan path relatif (tanpa awalan slash)
    //                 $relativePath = ltrim($relativePath, '/');

    //                 // Gunakan path absolut ke public/storage
    //                 $source = storage_path("app/public/$relativePath");

    //                 Image::make($source)
    //                     ->resize($key === 'mockup' ? 1200 : 200, null, function ($constraint) {
    //                         $constraint->aspectRatio();
    //                         $constraint->upsize();
    //                     })
    //                     ->encode('jpg', 70)
    //                     ->save($jpgPath);
    //             }
    //             $convertedImgs[] = $jpgPath;
    //         }
    //         $product->converted_photo = $paths['mockup'];
    //         $product->converted_photo2 = $paths['motif'];
    //     } else {
    //         $product->converted_photo = $product->photo;
    //     }

    //     // Generate PDF
    //     $pdf = FacadePdf::loadView('product.pdf', $arr)->setPaper('a4', 'landscape')->stream('products.pdf', ['Attachment' => false]);

    //     foreach ($convertedImgs as $img) {
    //         if (file_exists($img)) {
    //             @unlink($img);
    //         }
    //     }

    //     return $pdf;
    // }

    public function destroy(GeneratePdf $pdf)
    {
        if (file_exists(storage_path('app/public/' . $pdf->path))) {
            unlink(storage_path('app/public/' . $pdf->path));
        }
        $pdf->delete();
        return response()->json(['status' => 'success', 'message' => 'PDF deleted successfully'], 200);
    }
}
