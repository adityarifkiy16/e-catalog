<?php

namespace App\Models;

use App\Models\MCategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImageCategories extends Model
{
    use HasFactory;

    protected $table = 'image_categories';

    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo(MCategories::class);
    }
}
