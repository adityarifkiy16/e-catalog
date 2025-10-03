<?php

namespace App\Models;

use App\Models\MJenis;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MSpecification extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_specifications';
    protected $guarded = ['id'];

    public function products()
    {
        return $this->belongsToMany(TProduct::class, 't_product_m_specification', 'specification_id', 'product_id');
    }

    public function jenis()
    {
        return $this->belongsTo(MJenis::class, 'jenis_id', 'id');
    }

    public function specification_values()
    {
        return $this->hasMany(TSpecificationValue::class, 'specification_id', 'id');
    }
}
