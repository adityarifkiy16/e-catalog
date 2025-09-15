<?php

namespace App\Models;

use App\Models\MJenis;
use App\Models\TProduct;
use App\Models\ImageCategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MCategories extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_categories';
    protected $guarded = ['id'];

    public function products()
    {
        return $this->hasMany(TProduct::class, 'category_id', 'id');
    }

    public function jenis()
    {
        return $this->belongsTo(MJenis::class, 'jenis_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ImageCategories::class, "category_id", "id");
    }

    public function types()
    {
        return $this->belongsTo(MType::class, 'type_id', 'id');
    }
}
