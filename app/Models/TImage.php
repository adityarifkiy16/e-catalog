<?php

namespace App\Models;

use App\Models\MCategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TImage extends Model
{
    use HasFactory;

    protected $table = 't_images';
    protected $guarded = ['id'];

    public function productVersion()
    {
        return $this->belongsTo(ProductVersion::class, 'product_version_id', 'id');
    }
}
