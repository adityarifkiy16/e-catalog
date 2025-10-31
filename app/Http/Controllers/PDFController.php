<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use App\Models\MVersion;
use App\Models\TProduct;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Yajra\DataTables\Facades\DataTables;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;

class PDFController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('generated_pdfs')
            ->join('m_versions', 'generated_pdfs.version_id', '=', 'm_versions.id')
            ->select('generated_pdfs.id', 'generated_pdfs.path', 'generated_pdfs.version_id', 'm_versions.version')
            ->orderBy('generated_pdfs.id', 'desc')
            ->get();


        if ($request->ajax()) {
            if ($request->has('search') && $request->search['value']) {
                $search = $request->search['value'];
                $query->where('path', 'LIKE', "%{$search}%");
            }

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

    public function generatePdf(Request $request)
    {
        $request->validate([
            'category' => "required|array|min:1",
            'category.*' => "required|exists:m_categories,id",
            'version' => 'required|exists:m_versions,id',
        ]);

        $version = MVersion::find($request->version);
        $filename = 'Osborn-' . $version->name . '.pdf';

        if ($request->filled('category')) {
            $products = DB::table('t_products as p')
                ->leftJoin('m_categories as c', 'c.id', '=', 'p.category_id')
                ->leftJoin('m_jenis as j', 'j.id', '=', 'c.jenis_id')
                ->select(
                    'p.id',
                    'p.code',
                    'p.photo',
                    'p.category_id',
                    'c.name as category_name',
                    'j.name as jenis_name'
                )
                ->whereIn('p.category_id', $request->category)
                ->orderBy('p.code', 'asc')
                ->get();

            // Konversi gambar webp ke jpg
            $convertedImgs = [];
            foreach ($products as $product) {
                $photopath = storage_path('app/public/' . $product->photo);
                if (file_exists($photopath) && Str::endsWith($product->photo, '.webp')) {
                    $jpgName = Str::replaceLast('.webp', '.jpg', $product->photo);
                    $jpgPath = storage_path('app/public/temp_images/' . $jpgName);
                    $directory = dirname($jpgPath);
                    if (!file_exists($directory)) {
                        mkdir($directory, 0755, true);
                    }

                    if (!file_exists($jpgPath)) {
                        Image::make($photopath)
                            ->resize(200, null, function ($constraint) {
                                $constraint->aspectRatio();
                                $constraint->upsize();
                            })
                            ->encode('jpg', 50)
                            ->save($jpgPath);
                    }

                    $product->converted_photo = $jpgPath;
                    $convertedImgs[] = $jpgPath;
                } else {
                    $product->converted_photo = $photopath;
                }
            }

            $grouped = collect($products)->groupBy('category_name');


            // 🔹 Inisialisasi mPDF
            $mpdf = new Mpdf([
                'format' => 'A4-L',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 15,
                'margin_bottom' => 15,
            ]);

            $mpdf->SetTitle('Catalog Produk');
            $mpdf->SetAuthor(config('app.name'));

            // 🔹 Loop tiap kategori
            foreach ($grouped as $cat => $list) {
                // Bookmark sisi kiri PDF
                $mpdf->Bookmark($cat, 0);

                // Render hanya bagian kategori ini
                $html = view('product.catalog', [
                    'categoryName' => $cat,
                    'products' => $list,
                    'version' => $version,
                ])->render();

                $mpdf->WriteHTML($html);

                if ($cat !== $grouped->keys()->last()) {
                    $mpdf->AddPage();
                }
                $filename = 'Osborn-' . $list->first()->jenis_name . '-' . $cat . '-v' . $version->name . '.pdf';
            }

            // 🔹 Hapus file sementara
            foreach ($convertedImgs as $img) {
                if (file_exists($img)) {
                    @unlink($img);
                }
            }


            $filePath = storage_path('app/public/pdf_catalogs/' . $filename);
            if (!file_exists(dirname($filePath))) {
                mkdir(dirname($filePath), 0755, true);
            }

            // Simpan path ke database
            DB::table('generated_pdfs')->insert([
                'path' => $filePath,
                'version_id' => $version->id,
            ]);

            // 🔹 Output PDF
            return response($mpdf->Output('OsbornCatalog.pdf', 'F'))
                ->header('Content-Type', 'application/pdf');
        }
    }


    public function downloadPdf(Request $request) {}

    public function downloadPdfProduct(Request $request)
    {
        $productId = $request->query('id');
        $product = TProduct::with('category', 'category.jenis', 'images')->find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $arr['specifications'] = DB::table('t_product_m_specification as tps')
            ->join('m_specifications as ms', 'ms.id', '=', 'tps.specification_id')
            ->join('t_specification_values as tsv', 'tsv.id', '=', 'tps.specification_value_id')
            ->select(
                'ms.id as specification_id',
                'ms.name as specification_name',
                'tsv.id as specification_value_id',
                'tsv.name as specification_value',
                'tsv.unit as specification_unit'
            )
            ->where('tps.product_id', $productId)
            ->get();

        $arr['product'] = $product;

        $convertedImgs = [];

        // Handle conversion WEBP TO JPG
        if ($product->photo && Str::endsWith($product->photo, '.webp')) {
            $jpgName = Str::replaceLast('.webp', '.jpg', $product->photo);
            $paths = [
                'mockup' => storage_path("app/public/temp_images/mockup/$jpgName"),
                'motif' => storage_path("app/public/temp_images/motif/$jpgName"),
            ];

            foreach ($paths as $key => $jpgPath) {
                $directory = dirname($jpgPath);
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }

                if (!file_exists($jpgPath)) {
                    $relativePath = $key === 'mockup'
                        ? ($product->images->first()->path ?? $product->photo)
                        : $product->photo;

                    // Pastikan path relatif (tanpa awalan slash)
                    $relativePath = ltrim($relativePath, '/');

                    // Gunakan path absolut ke public/storage
                    $source = storage_path("app/public/$relativePath");

                    Image::make($source)
                        ->resize($key === 'mockup' ? 1200 : 200, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        })
                        ->encode('jpg', 70)
                        ->save($jpgPath);
                }
                $convertedImgs[] = $jpgPath;
            }
            $product->converted_photo = $paths['mockup'];
            $product->converted_photo2 = $paths['motif'];
        } else {
            $product->converted_photo = $product->photo;
        }

        // Generate PDF
        $pdf = FacadePdf::loadView('product.pdf', $arr)->setPaper('a4', 'landscape')->stream('products.pdf', ['Attachment' => false]);

        foreach ($convertedImgs as $img) {
            if (file_exists($img)) {
                @unlink($img);
            }
        }

        return $pdf;
    }
}
