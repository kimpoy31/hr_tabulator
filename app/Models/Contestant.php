<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contestant extends Model
{
    protected $fillable = [
        'activity_id',
        'contestant',
    ];

    use HasFactory;
}
