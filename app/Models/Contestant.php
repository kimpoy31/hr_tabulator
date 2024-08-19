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
        'submittedScoresheet',
        'totalAverage',
        'overallTotalAverage',
    ];

    public function getScoresheetAttribute () {
        $user = Auth::user();

        return $scoresheet = Score::where('activity_id',$this->activity_id)
                    ->where('judge_id',$user->id)
                    ->where('contestant_id',$this->id)
                    ->get();
    }

    public function getSubmittedScoresheetAttribute () {
        return $scoresheet = Score::where('activity_id',$this->activity_id)
                    ->where('contestant_id',$this->id)
                    ->get();
    }

    public function getTotalAverageAttribute() {
        $averageTotalPerJudge = [];
    
        foreach ($this->submittedScoresheet as $scores) {
            $judgeId = $scores['judge_id'];
    
            // Check if judge ID already exists in the array
            $existingIndex = array_search($judgeId, array_column($averageTotalPerJudge, 'judge_id'));
    
            if ($existingIndex !== false) {
                // Judge ID found, add computed score to existing entry
                $averageTotalPerJudge[$existingIndex]['totalScore'] += $scores['computedScore'];
            } else {
                // Judge ID not found, create new entry
                $averageTotalPerJudge[] = [
                    'judge_id' => $judgeId,
                    'judge_name' => $scores['judgeInformation']->fullname,
                    'totalScore' => $scores['computedScore']
                ];
            }
        }
        
        return $averageTotalPerJudge;
        // Calculate averages here based on $averageTotalPerJudge
    }

    public function getOverallTotalAverageAttribute () {
        $overallTotalAverage = 0;

        foreach($this->totalAverage as $average){
            $overallTotalAverage += $average['totalScore'];
        }

        return count($this->totalAverage) > 0 ? $overallTotalAverage / count($this->totalAverage) : 0;
    }
   

    use HasFactory;
}
