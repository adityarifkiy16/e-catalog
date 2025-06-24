<?php

namespace App\Models;

use id;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MJenis extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'm_jenis';

    protected $guarded = ['id'];
    protected $fillable = ['name'];

    public function categories()
    {
        return $this->hasMany(MCategories::class, 'jenis_id', 'id');
    }
}
