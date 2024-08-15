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

    // Append Judge information
    protected $appends = [
        'judgeInformation',
        'criteriaInformation', 
        'contestantInformation', 
    ];

    public function getJudgeInformationAttribute () {
        return $judgeInfo = UsersInformation::find($this->judge_id);
    }

    // Append Criteria information
    public function getCriteriaInformationAttribute () {
        return $criteriaInfo = Criteria::find($this->criteria_id);
    }

    // Append Criteria information
    public function getContestantInformationAttribute () {
        return $contestantInfo = Contestant::find($this->contestant_id);
    }

    use HasFactory;
}
