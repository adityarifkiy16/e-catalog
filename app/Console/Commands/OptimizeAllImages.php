<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Intervention\Image\Facades\Image;

class OptimizeAllImages extends Command
{
    protected $signature = 'optimize:all-images';
    protected $description = 'Resize and optimize all image folders';

    public function handle()
    {
        $folders = [
            'dist/img/slider'      => [800, 1600],    // ukuran desktop (carousel)
            'dist/img/slide-depan' => [300, 600],     // kecil (menu slider)
            'dist/img/product'     => [200, 400],     // thumbnail produk
            'dist/img'             => [130],          // logo osborn
        ];

        foreach ($folders as $folder => $sizes) {
            $this->processFolder($folder, $sizes);
        }

        $this->info("\nAll folders optimized successfully!");
    }

    private function processFolder($folder, $sizes)
    {
        $source = public_path($folder);

        $this->info("\nProcessing folder: $folder");

        foreach (glob("$source/*.{jpg,jpeg,png,webp}", GLOB_BRACE) as $file) {
            $filename = basename($file);

            $this->info("  -> $filename");

            foreach ($sizes as $size) {

                $resizedName = preg_replace('/\.(jpg|jpeg|png|webp)$/i', "-{$size}.webp", $filename);
                $dest = "$source/$resizedName";

                // Skip if exists
                if (file_exists($dest)) {
                    $this->info("     - $size px skipped");
                    continue;
                }

                // Resize
                $img = Image::make($file)->resize($size, null, function ($c) {
                    $c->aspectRatio();
                    $c->upsize();
                });

                $img->encode('webp', 85);
                $img->save($dest);

                $this->info("     - Generated $resizedName");
            }
        }
    }
}
