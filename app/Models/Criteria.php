<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    protected $fillable = [
        'activity_id',
        'criteria',
        'percentage',
    ];

    use HasFactory;
}
