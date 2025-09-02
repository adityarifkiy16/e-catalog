<?php

namespace App\Models;

use App\Models\TProduct;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TPackage extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 't_packages';
    protected $guarded = ['id'];

    public function product()
    {
        return $this->belongsTo(TProduct::class, 'product_id', 'id');
    }
}
