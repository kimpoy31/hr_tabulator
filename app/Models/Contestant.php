<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Contestant extends Model
{
    protected $fillable = [
        'activity_id',
        'contestant',
    ];

    protected $appends = [
        'scoresheet',
    ];

    public function getScoresheetAttribute () {
        $user = Auth::user();

        return $scoresheet = Score::where('activity_id',$this->activity_id)
                    ->where('judge_id',$user->id)
                    ->where('contestant_id',$this->id)
                    ->get();
        }

    use HasFactory;
}
