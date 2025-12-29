<?php

namespace App\Http\Controllers;

use App\Models\MJenis;
use App\Models\MVersion;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use App\Models\ProductVersion;
use App\Services\ImageServices;
use App\Services\ProductVersionServices;
use Illuminate\Support\Facades\DB;

class ProductVersionController extends Controller
{
    protected ImageServices $imageServices;
    protected ProductVersionServices $productVersionServices;

    public function __construct(ImageServices $imageServices, ProductVersionServices $productVersionServices)
    {
        $this->middleware('permission:management_product')->except(['downloadPdf', 'downloadPdfProduct', 'show']);
        $this->imageServices = $imageServices;
        $this->productVersionServices = $productVersionServices;
    }
    public function index(Request $request)
    {
        $request->validate([
            'filter' => 'nullable|numeric|exists:m_categories,id',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);
        $arr['categories'] = MCategories::with('jenis')->get();
        $arr['versions'] = MVersion::all();
        if ($request->ajax()) {
            return $this->productVersionServices->getDataTable($request);
        }
        return view('productVersion.index', $arr);
    }

    /**
     * 2. Menampilkan form create
     */
    public function bulkCreate()
    {
        $arr['jenis'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();
        return view('productVersion.bulk-create', $arr);
    }

    /**
     * 3. Menyimpan data product secara masal dengan gambar
     */
    public function storeBulkCreate(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'category_id' => 'required|exists:m_categories,id',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ]);

        try {
            $result = DB::transaction(fn() => $this->productVersionServices->bulkCreate($validated));
            $response = ['status' => 'success', 'message' => 'Produk berhasil ditambahkan secara massal.'];
            if (!empty($result['warning'])) $response['warning'] = $result['warning'];
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Gagal update: ' . $e->getMessage()]);
        }
    }

    // 4. Edit Product Version
    public function edit(ProductVersion $productVersion)
    {
        $arr['productVersion'] = $productVersion;
        $arr['jenises'] = MJenis::with('categories')->get();
        $arr['versions'] = MVersion::all();
        return view('productVersion.edit', $arr);
    }

    /**
     * 5. Update Product Version
     */
    public function update(Request $request, ProductVersion $productVersion)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'image-motif' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image-mockup' => 'nullable|array|max:5',
            'image-mockup.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:5024',
            'version_id' => 'required|numeric|exists:m_versions,id',
        ]);

        try {
            DB::transaction(fn() => $this->productVersionServices->update($validated, $productVersion));
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Gagal update: ' . $e->getMessage()], 500);
        }

        return response()->json(['status' => 'success', 'message' => 'Versi Produk berhasil diperbarui']);
    }

    // 6. Hapus Product Version
    public function destroy(ProductVersion $productVersion)
    {
        $this->productVersionServices->delete($productVersion);
        return response()->json([
            'status' => 'success',
            'message' => 'Versi Produk berhasil dihapus',
        ]);
    }

    // 7. Reset Gambar Mockup
    public function resetMockup(ProductVersion $productVersion)
    {
        $this->productVersionServices->resetImage($productVersion, 'product');
        return response()->json([
            'status' => 'success',
            'message' => 'Gambar mockup berhasil direset.'
        ]);
    }

    // 8. Reset Gambar Motif
    public function resetMotif(ProductVersion $productVersion)
    {
        $this->productVersionServices->resetImage($productVersion, 'motif');
        return response()->json([
            'status' => 'success',
            'message' => 'Gambar motif berhasil direset.'
        ]);
    }

    // 9. Upload Bulk Gambar Motif / Mockup
    public function bulkCreateMotif()
    {
        $arr['versions'] = MVersion::all();
        return view('productVersion.bulk-create-mockup', $arr);
    }

    public function storeBulkCreateMotif(Request $request)
    {
        $request->validate([
            'type' => 'required|in:mockup,motif',
            'version_id' => 'required|exists:m_versions,id',
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        try {
            DB::transaction(fn() => $this->productVersionServices->bulkImage($request, $request->type));
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Gagal upload: ' . $e->getMessage()], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'berhasil diupload.'
        ]);
    }

    public function create()
    {
        $arr['product'] = TProduct::with('category')->get();
        $arr['versions'] = MVersion::all();
        return view('productVersion.create', $arr);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|array',
            'product_id.*' => 'exists:t_products,id',
            'version_id' => 'required|exists:m_versions,id',
        ]);
        $message = $this->productVersionServices->create($validated);
        return response()->json([
            'status' => 'success',
            'message' => $message,
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->ids;
        $this->productVersionServices->bulkDestroy($ids);
        return response()->json([
            'status' => 'success',
            'message' => 'Paket berhasil dihapus.',
        ]);
    }
}
