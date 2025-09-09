<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MType;
use App\Models\TImage;
use App\Models\TPackage;
use App\Models\TProduct;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TImageController extends Controller
{
    public function clear()
    {
        $images = [];
        $dbImages = TImage::pluck('path')->toArray();
        $dbProducts = TProduct::pluck('photo')->toArray();
        $dbPackages = TPackage::pluck('image')->toArray();
        $dbCategories = MCategories::pluck('path')->toArray();
        $dbTypes = MType::pluck('thumbnail')->toArray();
        $dbUsers = User::pluck('path_image')->toArray();

        $images = array_merge($dbImages, $dbProducts, $dbPackages, $dbCategories, $dbTypes, $dbUsers);
        $storageImages = Storage::disk('public')->allFiles('images');

        $unusedImages = array_diff($storageImages, $images);

        if (empty($unusedImages)) {
            return response()->json(['message' => 'Tidak ada gambar yang dapat dihapus']);
        }

        foreach ($unusedImages as $image) {
            Storage::disk('public')->delete($image);
        }

        return response()->json(['message' => 'Gambar berhasil dihapus']);
    }
}
