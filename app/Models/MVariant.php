<?php

namespace App\Models;

use App\Models\MJenis;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MVariant extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_variants';
    protected $guarded = ['id'];

    public function products()
    {
        return $this->belongsToMany(TProduct::class, 't_product_m_variant', 'm_variant_id', 't_product_id');
    }

    public function jenis()
    {
        return $this->belongsTo(MJenis::class, 'jenis_id', 'id');
    }

    public function variant_values()
    {
        return $this->hasMany(TVariantValue::class, 'variant_id', 'id');
    }
}
