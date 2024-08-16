<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ScoreController
{
    public function create (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'scoreRecord' => 'required|array',
            'scoreRecord.*' => 'required|array',
            'scoreRecord.*.*.judge_id' => 'required|integer',
            'scoreRecord.*.*.criteria_id' => 'required|integer',
            'scoreRecord.*.*.activity_id' => 'required|integer',
            'scoreRecord.*.*.contestant_id' => 'required|integer',
            'scoreRecord.*.*.score' => 'required|numeric|min:0|max:100',
        ]);
        

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        foreach ($validated['scoreRecord'] as $scoreGroup) {
            foreach ($scoreGroup as $scoreData) {
                Score::updateOrCreate(
                    [
                        'activity_id' => $scoreData['activity_id'],
                        'judge_id' => $scoreData['judge_id'],
                        'criteria_id' => $scoreData['criteria_id'],
                        'contestant_id' => $scoreData['contestant_id'],
                    ],
                    [
                        'score' => $scoreData['score'],
                    ]
                );
            }
        }

        return response()->json(['message' => 'Scores updated or created successfully'], 200);
    }


    function update (Request $request) {

        $contestants = $request->contestants;

        foreach($contestants as $contestant){
            foreach($contestant['scoresheet'] as $score){
                $Score = Score::findOrFail($score['id']);

                if($score['score'] > 0){
                    $Score->score = $score['score'];
                    $Score->save();
                }
            }
        }

        return response()->json(['message' => 'Scores updated successfully'], 200);
    }

    function fetch (Request $request){
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'admin'){
            return to_route('judge.show');
        }

        $validatedData = $request->validate([
            'activity_id' => 'integer|required',
        ]);

        $scores = Score::where('activity_id',$validatedData['activity_id'])->get();

        return response()->json(['scores' => $scores], 200);
    }

}