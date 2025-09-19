<?php

namespace App\Models;

use App\Models\MType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImageTypes extends Model
{
    use HasFactory;

    protected $table = 'image_types';
    protected $guarded = ['id'];

    public function type()
    {
        return $this->belongsTo(MType::class, 'type_id', 'id');
    }
}
