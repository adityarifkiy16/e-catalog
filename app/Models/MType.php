<?php

namespace App\Models;

use App\Models\MJenis;
use App\Models\ImageTypes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MType extends Model
{
    use HasFactory;

    protected $table = 'm_types';

    protected $guarded = ['id'];

    public function jenis()
    {
        return $this->belongsTo(MJenis::class, 'jenis_id', 'id');
    }

    public function categories()
    {
        return $this->hasMany(MCategories::class, 'type_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ImageTypes::class, 'type_id', 'id');
    }
}
