<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageServices
{
    public function store(UploadedFile $file, string $folder, ?int $resizeWidth = 800): string
    {
        $filename = time() . '_' . uniqid() . '.webp';
        $directory = "images/{$folder}/" . now()->format('Y/m/d');
        $path = "{$directory}/{$filename}";
        $fullPath = storage_path('app/public/' . $path);
        $directory = dirname($fullPath);
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }
        $image = Image::make($file);
        if ($resizeWidth) {
            $image->resize($resizeWidth, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
        }
        $image->encode('webp', 100);
        Storage::disk('public')->put($path, (string) $image);
        return $path;
    }

    public function storeWithoutCompress(UploadedFile $file, string $folder): string
    {
        $folderPath = "images/{$folder}/" . now()->format('Y/m/d');
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Simpan file ORIGINAL saja
        $path = $file->storeAs($folderPath, $filename, 'public');
        return $path;
    }
}
