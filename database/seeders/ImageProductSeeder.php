<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\TImage;
use App\Models\TProduct;

class ImageProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pivotRows = DB::table('image_product')->get();
        foreach ($pivotRows as $row) {
            $image = TImage::find($row->image_id);
            if (!$image) continue;
            $image->update([
                'product_id' => $row->product_id,
                'type' => $row->motif ? 'motif' : 'product'
            ]);
        }
    }
}
