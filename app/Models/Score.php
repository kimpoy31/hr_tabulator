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

    // Append Users basic information
    protected $appends = [
        'judgeInformation',
        'criteriaInformation',
        'activityInformation',
        'computedScore',
    ];

    public function getJudgeInformationAttribute () {
        return $judgeInfo = UsersInformation::find($this->judge_id);
    }

    public function getCriteriaInformationAttribute () {
        return $criteriaInfo = Criteria::find($this->criteria_id);
    }

    public function getActivityInformationAttribute () {
        return $activityInfo = ActivityModel::find($this->activity_id);
    }

    public function getContestantInformationAttribute () {
        return $contestantInfo = Contestant::find($this->contestant_id);
    }

    public function getComputedScoreAttribute () {
        if($this->score === 0){
            return 0;
        }
        
        $score = ($this->score / 100) * ($this->criteriaInformation->percentage / 100) * 100;
        return $score;
    }

    use HasFactory;
}
