<?php

namespace App\Models;

use App\Models\TImage;
use App\Models\MCategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_products';
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo(MCategories::class, 'category_id', 'id');
    }

    public function images()
    {
        return $this->belongsToMany(TImage::class, 'image_product', 'product_id', 'image_id');
    }
}
