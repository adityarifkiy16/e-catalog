<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TSpecificationValue extends Model
{
    use HasFactory;

    protected $table = 't_specification_values';
    protected $guarded = ['id'];

    public function specification()
    {
        return $this->belongsTo(MSpecification::class, 'specification_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(TProduct::class, 't_product_m_specification', 'specification_value_id', 'product_id')->withPivot('specification_id');
    }
}
