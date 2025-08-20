<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MType extends Model
{
    use HasFactory;

    protected $table = 'm_types';

    protected $guarded = ['id'];

    public function jenis()
    {
        return $this->belongsTo(MJenis::class, 'type_id', 'id');
    }

    public function categories()
    {
        return $this->hasMany(MCategories::class, 'type_id', 'id');
    }
}
