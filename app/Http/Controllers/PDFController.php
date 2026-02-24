<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateCatalogPdfJob;
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

        GenerateCatalogPdfJob::dispatch($request->version_id, $request->jenis_id, $request->type_id);

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

            $result = $this->pdfService->generateCatalogPdf(
                $version,
                $request->jenis_id,
                $request->type_id,
                $request->category,
                false
            );

            return response($result['content'], 200)
                ->header('Content-Type', 'application/pdf')
                ->header(
                    'Content-Disposition',
                    'inline; filename="' . $result['filename'] . '"'
                );
        } else {
            return response()->json(['message' => 'Category is required'], 400);
        }
    }

    public function destroy(GeneratePdf $pdf)
    {
        if (file_exists(storage_path('app/public/' . $pdf->path))) {
            unlink(storage_path('app/public/' . $pdf->path));
        }
        $pdf->delete();
        return response()->json(['status' => 'success', 'message' => 'PDF deleted successfully'], 200);
    }
}
