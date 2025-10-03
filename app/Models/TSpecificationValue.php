<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TSpecificationValue extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_specification_values';
    protected $guarded = ['id'];

    public function specification()
    {
        return $this->belongsTo(MSpecification::class, 'specification_id', 'id');
    }
}
