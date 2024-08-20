<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScoresRange extends Model
{
    protected $fillable = [
        'activity_id',
        'range',
        'status',
    ];

    use HasFactory;
}
