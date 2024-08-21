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

    protected $appends = [
        'scoringRange',
    ];

    public function getScoringRangeAttribute () {
        return ScoresRange::where('activity_id', $this->id)->first();
    }

    use HasFactory;
}
