<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class Optimize3D extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'optimize:3d';

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
        $files = Storage::disk('public')->allFiles('images/3Dcategories');

        $this->optimize($files);

        $files2 = Storage::disk('public')->allFiles('images/categories');

        $this->optimize($files2);
    }

    protected function optimize($files)
    {
        foreach ($files as $file) {
            $base = basename($file);

            if (!str_ends_with($base, '.webp')) continue;

            $fullPath = storage_path('app/public/' . $file);
            if (!file_exists($fullPath)) continue;

            // ===== OVERWRITE ORIGINAL =====
            Image::make($fullPath)
                ->resize(51, 51, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 70)
                ->save($fullPath);
        }

        return $this->info("\nAll folders optimized successfully!");
    }
}
