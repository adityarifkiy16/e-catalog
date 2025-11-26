<?php

namespace App\Models;

use App\Models\TProduct;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductView extends Model
{
    use HasFactory;
    protected $table = 'product_views';
    protected $guarded = ['id'];
    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(TProduct::class);
    }
}
