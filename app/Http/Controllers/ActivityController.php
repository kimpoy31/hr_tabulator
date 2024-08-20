<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\UsersInformation;
use App\Models\ActivityModel;
use App\Models\Criteria;
use App\Models\Contestant;
use App\Models\Score;
use Inertia\Inertia;

class ActivityController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity' => 'required|string',
            'description' => 'string|nullable',
        ]);

        $activity = ActivityModel::create($validatedData);

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

        return Inertia::render('Tabulation', [
            'activity' => $activity,
            'contestants' => $contestants,
            'criterias' => $criterias,
            'judge' => $judge,
        ]);
    }

}
