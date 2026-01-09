<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class OptimizeAllImages extends Command
{
    protected $signature = 'optimize:products';
    protected $description = 'Resize and optimize all product images';

    public function handle()
    {
        $files = Storage::disk('public')->allFiles('images/products');

        // foreach ($files as $file) {
        //     $base = basename($file);

        //     if (!str_ends_with($base, '.webp')) continue;
        //     if (str_ends_with($base, '-164.webp')) continue;

        //     $fullPath = storage_path('app/public/' . $file);
        //     if (!file_exists($fullPath)) continue;

        //     $dir  = dirname($file);
        //     $name = pathinfo($file, PATHINFO_FILENAME);

        //     // ===== THUMB 164 =====
        //     Image::make($fullPath)
        //         ->resize(164, 164, function ($c) {
        //             $c->aspectRatio();
        //             $c->upsize();
        //         })
        //         ->encode('webp', 100)
        //         ->save(storage_path("app/public/{$dir}/{$name}-164.webp"));

        //     // ===== OVERWRITE ORIGINAL =====
        //     Image::make($fullPath)
        //         ->resize(800, 800, function ($c) {
        //             $c->aspectRatio();
        //             $c->upsize();
        //         })
        //         ->encode('webp', 70)
        //         ->save($fullPath);
        // }

        foreach ($files as $file) {
            $base = basename($file);
            if (!str_ends_with($base, '.webp')) continue;
            if (!str_ends_with($base, '-164.webp')) continue;

            $fullPath = storage_path('app/public/' . $file);
            if (!file_exists($fullPath)) continue;

            Image::make($fullPath)
                ->resize(164, 164, function ($c) {
                    $c->aspectRatio();
                    $c->upsize();
                })
                ->encode('webp', 100)
                ->save($fullPath);
        }

        $this->info("\nAll folders optimized successfully!");
    }
}
