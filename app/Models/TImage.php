<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_images';
    protected $guarded = ['id'];

    public function product()
    {
        return $this->belongsToMany(TProduct::class, 'image_product', 'image_id', 'product_id');
    }
}
