<?php

namespace App\Console\Commands;

use Mpdf\Tag\S;
use Illuminate\Console\Command;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class OptimizeCarousel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'optimize:carousel';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'command for optimize carousel image to mobile version';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $files = Storage::disk('public')->allFiles('images/mockupcategories');
        foreach ($files as $file) {
            $base = basename($file);
            if (!str_ends_with($base, '.webp')) continue;

            $fullPath = storage_path('app/public/' . $file);

            $dir  = dirname($file);
            $name = pathinfo($file, PATHINFO_FILENAME);

            $image517 = storage_path("app/public/{$dir}/{$name}-517.webp");

            if (!file_exists($fullPath)) continue;

            Image::make($fullPath)
                ->resize(517, 205, fn($c) => $c->aspectRatio())
                ->encode('webp', 80)
                ->save($image517);
        }
        $this->info("\nAll folders optimized successfully!");
    }
}
