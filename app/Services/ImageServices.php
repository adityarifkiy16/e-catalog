<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageServices
{
    public function store(UploadedFile $file, string $folder, ?int $resizeWidth = 800): string
    {
        $sanitizeName = str_replace(' ', '_', $file->getClientOriginalName());
        $filename = $sanitizeName . '_' . uniqid() . '.webp';
        $directory = "images/{$folder}/" . now()->format('Y/m/d');
        $path = "{$directory}/{$filename}";
        $fullPath = storage_path('app/public/' . $path);
        $directory = dirname($fullPath);
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        if ($folder == 'products') {
            $n = $sanitizeName . '_' . uniqid() . '-164' . '.webp';
            $p = $directory . '/' . $n;
            $s = 164;
            $this->resizeImage($file, $s, $p); // Simpan thumbnail
        } else if ($folder == 'mockupcategories') {
            $n = $sanitizeName . '_' . uniqid() . '-517' . '.webp';
            $p = $directory . '/' . $n;
            $s = 517;
            $this->resizeImage($file, $s, $p);
        }

        $this->resizeImage($file, $resizeWidth, $fullPath);

        return $path;
    }

    public function storeWithoutCompress(UploadedFile $file, string $folder): string
    {
        $folderPath = "images/{$folder}/" . now()->format('Y/m/d');
        $filename = $file->getClientOriginalName() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Simpan file ORIGINAL saja
        $path = $file->storeAs($folderPath, $filename, 'public');
        return $path;
    }


    protected function resizeImage($file, $resizeWidth, $path)
    {
        $image = Image::make($file);
        if ($resizeWidth) {
            $image->resize($resizeWidth, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
        }
        $image->encode('webp', 80);
        Storage::disk('public')->put($path, (string) $image);
    }
}
