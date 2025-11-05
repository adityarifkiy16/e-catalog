<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratePdf extends Model
{
    use HasFactory;

    protected $table = 'generated_pdfs';
    protected $guarded = ['id'];

    public function jenis()
    {
        return $this->belongsTo(MJenis::class);
    }
}
