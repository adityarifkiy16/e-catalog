<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class OptimizeType extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'optimize:type';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $files = Storage::disk('public')->allFiles('images/thumbnail');
        $this->optimize($files);
    }

    protected function optimize($files)
    {
        foreach ($files as $file) {
            $base = basename($file);

            if (!str_ends_with($base, '.webp')) continue;

            $fullPath = storage_path('app/public/' . $file);
            if (!file_exists($fullPath)) continue;

            $dir  = dirname($file);
            $name = pathinfo($file, PATHINFO_FILENAME);

            $image200 = storage_path("app/public/{$dir}/{$name}-200.webp");
            $image100 = storage_path("app/public/{$dir}/{$name}-100.webp");

            // ===== OVERWRITE ORIGINAL =====
            Image::make($fullPath)
                ->resize(200, 200, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 85)
                ->save($image200);

            Image::make($fullPath)
                ->resize(100, 100, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 85)
                ->save($image100);
        }

        return $this->info("\nAll folders optimized successfully!");
    }
}
