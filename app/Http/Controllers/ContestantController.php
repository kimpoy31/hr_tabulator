<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contestant;
use App\Models\Criteria;
use App\Models\Score;
use App\Models\UsersInformation;

class ContestantController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity_id' => 'required|integer',
            'contestant' => 'string|required',
        ]);

        $createdContestant = Contestant::create($validatedData);

        if($createdContestant){

            $judges = UsersInformation::where('activity_id', $createdContestant->activity_id)
                    ->where('status','active')
                    ->get();

            $contestants = Contestant::where('activity_id', $createdContestant->activity_id)
                    ->where('status', 'active')
                    ->get();

            $criterias = Criteria::where('activity_id', $createdContestant->activity_id)
                    ->where('status', 'active')
                    ->get();

            if($judges->count() > 0 && $contestants->count() > 0 && $criterias->count() > 0 ){
                foreach($judges as $judge){
                    foreach($criterias as $criteria){
                        Score::create(
                            [
                                'activity_id' => $createdContestant->activity_id,
                                'judge_id' => $judge->user_id,
                                'criteria_id' => $criteria->id,
                                'contestant_id' => $createdContestant->id,
                                'score' => 0,
                            ]
                        );
                    }
                }
            }

        }

        return response()->json(['contestant' => $createdContestant], 201);
    }
}
