<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\UsersInformation;
use App\Models\ActivityModel;
use App\Models\Criteria;
use App\Models\Contestant;
use App\Models\Judge;
use App\Models\Score;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JudgeController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity_id' => 'required|integer',
            'fullname' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string',
        ]);

        $createdUser = User::create([
            'username' => $validatedData['username'],
            'password' => $validatedData['password'],
        ]);

        if($createdUser) {
            
            $createdUserInfo = UsersInformation::create([
                'user_id' => $createdUser->id,
                'activity_id' => $validatedData['activity_id'],
                'fullname' => $validatedData['fullname'],
                'role' => 'judge',
            ]);

            $contestants = Contestant::where('activity_id', $createdUserInfo->activity_id)
                            ->where('status', 'active')
                            ->get();

            $criterias = Criteria::where('activity_id', $createdUserInfo->activity_id)
                            ->where('status', 'active')
                            ->get();

            if($contestants->count() > 0 && $criterias->count() > 0 ){

                foreach($contestants as $contestant){
                    foreach ($criterias as $criteria) {
                        Score::create(
                            [
                                'activity_id' => $createdUserInfo->activity_id,
                                'judge_id' => $createdUserInfo->user_id,
                                'criteria_id' => $criteria->id,
                                'contestant_id' => $contestant->id,
                                'score' => 0,
                            ]
                        );
                    }
                }

            }

        }

        return response()->json(['judge' => $createdUser], 201);
    }


    function show () {
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'judge'){
            return to_route('admin.show');
        }

        $activity_id = $user->userInformation->activity_id;

        $activity = ActivityModel::find($activity_id);
        $criterias = Criteria::where('activity_id', $activity_id)->where('status','active')->get();
        $contestants = Contestant::where('activity_id', $activity_id)->where('status','active')->get();
        $judge = UsersInformation::where('activity_id', $activity_id)->where('status','active')->get();
        $scoresheet = Score::where('activity_id', $activity_id)->where('status','active')->get();
        
        return Inertia::render('JudgePage', [
            'activity' => $activity,
            'criterias' => $criterias,
            'contestants' => $contestants,
            'scoresheet' => '',
            'judge' => $judge,
        ]);
    }
}
