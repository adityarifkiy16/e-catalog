<?php

namespace App\Models;

use App\Models\User;
use App\Models\MPermissions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MRole extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_roles';
    protected $guarded = ["id"];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(MPermissions::class);
    }
}
