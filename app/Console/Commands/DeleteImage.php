<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Mpdf\Tag\S;

class DeleteImage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-image';

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
        $files = Storage::disk('public')->allFiles('images/products');

        foreach ($files as $file) {
            if (str_ends_with($file, '-164.webp')) Storage::disk('public')->delete($file);
        }
        $this->info('Images deleted successfully.');
    }
}
