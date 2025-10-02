<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TVariantValue extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_variant_values';
    protected $guarded = ['id'];

    public function variant()
    {
        return $this->belongsTo(MVariant::class, 'variant_id', 'id');
    }
}
