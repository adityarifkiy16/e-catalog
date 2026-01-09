<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageServices
{
    public function store(UploadedFile $file, string $folder, ?int $resizeWidth = 800): string
    {
        $sanitizeName = preg_replace('/[^A-Za-z0-9\-_]/', '_', $file->getClientOriginalName()) . '_' . uniqid();
        $filename = $sanitizeName  . '.webp';
        $directory = "images/{$folder}/" . now()->format('Y/m/d');

        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        $path = "{$directory}/{$filename}";

        if ($folder == 'products') {
            $filename164 = $sanitizeName  . '-164.webp';
            $path164 = "{$directory}/{$filename164}";
            $this->resizeImage($file, 164, $path164);
        } else if ($folder == 'mockupcategories') {
            $filename517 = $sanitizeName  . '-517.webp';
            $path517 = "{$directory}/{$filename517}";
            $this->resizeImage($file, 517, $path517);
        }

        $this->resizeImage($file, $resizeWidth, $path);

        return $path;
    }

    public function storeWithoutCompress(UploadedFile $file, string $folder): string
    {
        $folderPath = "images/{$folder}/" . now()->format('Y/m/d');
        $sanitizeName = preg_replace('/[^A-Za-z0-9\-_]/', '_', $file->getClientOriginalName());
        $filename = $sanitizeName . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($folderPath, $filename, 'public');
        return $path;
    }


    protected function resizeImage(UploadedFile $file, ?int $resizeWidth, string $path): void
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

    public function deleteImages($image, $size = null): void
    {
        if (!$image) return;

        $imagePath = storage_path('app/public/' . $image->path);

        // delete responsive images
        if ($size) {
            $iName = pathinfo($image->path, PATHINFO_FILENAME);
            $iDir = pathinfo($image->path, PATHINFO_DIRNAME);
            $responsiveImages = $iName . '-' . $size . '.' . pathinfo($image->path, PATHINFO_EXTENSION);
            $iPath = $iDir . '/' . $responsiveImages;

            if (file_exists($iPath)) {
                @unlink($iPath);
            }
        }

        if (file_exists($imagePath)) {
            @unlink($imagePath);
        }
        $image->delete();
    }
}
