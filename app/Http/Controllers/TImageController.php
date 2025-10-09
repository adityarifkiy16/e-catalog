<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MType;
use App\Models\TImage;
use App\Models\TPackage;
use App\Models\TProduct;
use App\Models\ImageTypes;
use App\Models\MCategories;
use Illuminate\Http\Request;
use App\Models\ImageCategories;
use Illuminate\Support\Facades\Storage;

class TImageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function clear()
    {
        $images = [];
        // Master Data
        $dbProducts = TProduct::pluck('photo')->toArray();
        $dbPackages = TPackage::pluck('image')->toArray();
        $dbCategories = MCategories::pluck('path')->toArray();
        $dbTypes = MType::pluck('thumbnail', 'image')->toArray();
        $dbUsers = User::pluck('path_image')->toArray();
        // relasi images
        $dbImages = TImage::pluck('path')->toArray();
        $dbImgType = ImageTypes::pluck('path')->toArray();
        $dbImgCat = ImageCategories::pluck('path')->toArray();

        $images = array_merge($dbImages, $dbProducts, $dbPackages, $dbCategories, $dbTypes, $dbUsers, $dbImgType, $dbImgCat);
        $storageImages = Storage::disk('public')->allFiles('images');

        $unusedImages = array_diff($storageImages, $images);
        // dd($unusedImages);

        if (empty($unusedImages)) {
            return redirect()->back()->with('error', 'Tidak ada gambar yang dapat dihapus!');
        }

        foreach ($unusedImages as $image) {
            Storage::disk('public')->delete($image);
        }

        return redirect()->back()->with('success', 'Semua gambar telah dihapus!');
    }
}
