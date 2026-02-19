<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visitor extends Model
{
    use HasFactory;
    protected $table = 'visitors';
    protected $guarded = ['id'];
    protected $fillable = [
        'ip_address',
        'user_agent',
        'visited_at',
    ];
}
