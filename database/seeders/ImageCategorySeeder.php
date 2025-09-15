<?php

namespace Database\Seeders;

use App\Models\ImageCategories;
use App\Models\TImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ImageCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = DB::table('t_images')->select('path', 'category_id')->get();

        foreach ($categories as $item) {
            if ($item->category_id == null) {
                continue;
            }
            ImageCategories::firstOrCreate([
                'path' => $item->path,
                'category_id' => $item->category_id
            ]);
        }
    }
}
