<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVersion extends Model
{
    use HasFactory;

    protected $table = 't_product_m_versions';
    protected $guarded = ['id'];

    public function version()
    {
        return $this->belongsTo(MVersion::class, 'version_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(TProduct::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(TImage::class, 'product_version_id', 'id');
    }
}
