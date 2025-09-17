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

    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'id');
    }

    public function permissions()
    {
        return $this->belongsToMany(MPermissions::class, 'm_permissions_m_role', 'm_role_id', 'm_permissions_id');
    }
}
