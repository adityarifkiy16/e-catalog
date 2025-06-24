<?php

namespace App\Models;

use App\Models\MRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MPermissions extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'm_permissions';
    protected $guarded = ['id'];

    public function roles()
    {
        return $this->belongsToMany(MRole::class);
    }
}
