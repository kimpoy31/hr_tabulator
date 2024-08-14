<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = [
        'activity_id',
        'judge_id',
        'criteria_id',
        'contestant_id',
        'score',
    ];

    use HasFactory;
}
