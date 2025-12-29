<?php

namespace App\Services;

use Mpdf\Mpdf;
use App\Models\MVersion;
use Illuminate\Support\Str;
use App\Models\ProductVersion;
use Intervention\Image\Facades\Image;



class PdfServices
{
    protected Mpdf $mpdf;
    protected array $tempImages = [];

    public function __construct()
    {
        $this->mpdf = new Mpdf([
            'format' => 'A4-L',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 15,
            'margin_bottom' => 15,
        ]);

        $this->mpdf->SetTitle('Catalog Produk');
        $this->mpdf->SetAuthor(config('app.name'));
    }

    public function generateCatalogPdf(MVersion $version, int $jenisId, ?int $typeId, ?array $categories,  bool $saveToStorage = true)
    {
        $query = ProductVersion::with(['images', 'product.category.jenis', 'product.category.type'])
            ->where('version_id', $version->id)
            ->join('t_products', 't_products.id', '=', 't_product_m_versions.product_id')
            ->orderBy('t_products.code', 'asc')
            ->select('t_product_m_versions.*');

        if ($categories) {
            $query->whereHas('product', function ($q) use ($categories) {
                $q->whereIn('category_id', $categories);
            });
        } else {
            $query->whereHas('product.category', function ($q) use ($jenisId, $typeId) {
                $q->where('jenis_id', $jenisId);
                if ($typeId) {
                    $q->where('type_id', $typeId);
                }
            });
        }

        $pvs = $query->get();
        $this->convertImages($pvs);

        $grouped = $pvs->groupBy(function ($item) {
            return $item->product->category->name;
        });

        foreach ($grouped as $cat => $p) {
            $this->mpdf->Bookmark($cat, 0);

            $thumb = $p->first()?->product?->category?->type?->thumbnail;
            $thumbPath = $thumb ? storage_path('app/public/' . $thumb) : null;
            $html = view('product.catalog', [
                'categoryName' => $cat,
                'products' => $p,
                'version' => $version,
                'thumbnail' => $thumbPath,
            ])->render();

            $this->mpdf->WriteHTML($html);
            if ($cat !== $grouped->keys()->last()) {
                $this->mpdf->AddPage();
            }
        }

        $filename = 'E-Catalog-Osborn-v'
            . $version->version
            . '-jenis-' . $jenisId
            . ($typeId ? '-type-' . $typeId : '')
            . '.pdf';

        if ($saveToStorage) {
            $path = 'pdf_catalogs/' . $filename;
            $fullPath = storage_path('app/public/' . $path);

            if (!file_exists(dirname($fullPath))) {
                mkdir(dirname($fullPath), 0755, true);
            }

            $this->mpdf->Output($fullPath, 'F');
            $this->cleanup();

            return $path;
        }

        $pdfContent = $this->mpdf->Output('', 'S'); // ambil sebagai STRING
        $this->cleanup();

        return [
            'content' => $pdfContent,
            'filename' => $filename,
        ];
    }

    protected function convertImages($pvs): void
    {
        foreach ($pvs as $pv) {
            foreach ($pv->images as $img) {
                $source = storage_path('app/public/' . $img->path);

                if (Str::endsWith($img->path, '.webp') && file_exists($source)) {
                    $jpg = Str::replaceLast('.webp', '.jpg', $img->path);
                    $target = storage_path('app/public/temp_images/' . basename($jpg));

                    if (!file_exists(dirname($target))) {
                        mkdir(dirname($target), 0755, true);
                    }

                    if (!file_exists($target)) {
                        Image::make($source)
                            ->resize(200, null, function ($c) {
                                $c->aspectRatio();
                                $c->upsize();
                            })
                            ->encode('jpg', 60)
                            ->save($target);
                    }

                    $img->converted_photo = $target;
                    $this->tempImages[] = $target;
                } else {
                    $img->converted_photo = $source;
                }
            }
        }
    }

    /**
     * Cleanup temp images
     */
    protected function cleanup(): void
    {
        foreach ($this->tempImages as $img) {
            if (file_exists($img)) {
                @unlink($img);
            }
        }
    }
}
