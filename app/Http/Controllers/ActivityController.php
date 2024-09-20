<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\UsersInformation;
use App\Models\ActivityModel;
use App\Models\Criteria;
use App\Models\Contestant;
use App\Models\Score;
use App\Models\ScoresRange;
use Inertia\Inertia;

class ActivityController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity' => 'required|string',
            'description' => 'string|nullable',
        ]);

        $activity = ActivityModel::create($validatedData);

        if( $activity ){

            ScoresRange::create(['activity_id' => $activity['id']]);

        }

        return response()->json([
            'createdData' => $activity,
        ], 201); // 201 is the status code for "Created"
    }

    function fetchAll () {
        $activities = ActivityModel::all();

        return response()->json(['activities' => $activities], 200);
    }

    function show ($id) {
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'admin'){
            return to_route('judge.show');
        }

        $activity = ActivityModel::find($id);
        $criterias = Criteria::where('activity_id', $id)->where('status','active')->get();
        $contestants = Contestant::where('activity_id', $id)->where('status','active')->get();
        $judges = UsersInformation::where('activity_id', $id)->where('status','active')->get();

        return Inertia::render('Activity', [
            'judges' => $judges,
            'activity' => $activity,
            'criterias' => $criterias,
            'contestants' => $contestants
        ]);
    }

    function judgeTabulation ($activity_id, $judge_id){
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'admin'){
            return to_route('judge.show');
        }
 
        $activity = ActivityModel::find($activity_id);
        $contestants = Contestant::where('activity_id', $activity_id)->where('status','active')->get();
        $criterias = Criteria::where('activity_id', $activity_id)->where('status','active')->get();
        $judge = UsersInformation::find($judge_id);
        $scores = Score::where('activity_id', $activity_id)->where('judge_id', $judge_id)->where('status','active')->get();
        $judges = UsersInformation::where('activity_id', $activity_id)->where('status','active')->get();

        return Inertia::render('Tabulation', [
            'activity' => $activity,
            'contestants' => $contestants,
            'criterias' => $criterias,
            'judge' => $judge,
            'scores' => $scores,
            'judges' => $judges,
        ]);
    }

    function updateScoringRange (Request $request) {
        $validatedData = $request->validate([
            'range' => 'required|integer',
            'id' => 'required|integer'
        ]);

        $toUpdate = ScoresRange::findOrFail($validatedData['id']);
        $toUpdate->update(['range' => $validatedData['range']]);
        
        return response()->json(['updatedRange' => $validatedData['range']], 200);
    }

    function winnersPerCriteria ($activity_id){
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'admin'){
            return to_route('judge.show');
        }
 
        $activity = ActivityModel::find($activity_id);
        $contestants = Contestant::where('activity_id', $activity_id)
        ->where('status', 'active')
        ->orderBy('created_at', 'asc') // Use 'desc' for descending order
        ->get();
        $criterias = Criteria::where('activity_id', $activity_id)->where('status','active')->get();
        $judges = UsersInformation::where('activity_id', $activity_id)->where('status','active')->get();
        // $judge = UsersInformation::find($judge_id);
        // $scores = Score::where('activity_id', $activity_id)->where('judge_id', $judge_id)->where('status','active')->get();
       
        return Inertia::render('TabulationPerCriteria', [
            'activity' => $activity,
            'contestants' => $contestants,
            'criterias' => $criterias,
            'judges' => $judges,
    //     'judge' => $judge,
    //     'scores' => $scores,
        ]);
    }


    // THIS FUNCTION IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    // THIS FUNCTION IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    // THIS FUNCTION IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    // THIS FUNCTION IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    function finalResult ($activity_id){
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'admin'){
            return to_route('judge.show');
        }
 
        $activity = ActivityModel::find($activity_id);
        $contestants = Contestant::where('activity_id', $activity_id)
        ->where('status', 'active')
        ->orderBy('created_at', 'asc') // Use 'desc' for descending order
        ->get();
        $criterias = Criteria::where('activity_id', $activity_id)->where('status','active')->get();
        $judges = UsersInformation::where('activity_id', $activity_id)->where('status','active')->get();
        // $judge = UsersInformation::find($judge_id);
        // $scores = Score::where('activity_id', $activity_id)->where('judge_id', $judge_id)->where('status','active')->get();
       
        return Inertia::render('FinalResult', [
            'activity' => $activity,
            'contestants' => $contestants,
            'criterias' => $criterias,
            'judges' => $judges,
        ]);
    }
}
