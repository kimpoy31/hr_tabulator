<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityModel extends Model
{
    protected $fillable = [
        'activity',
        'description',
    ];

    use HasFactory;
}
