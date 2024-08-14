<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\UsersInformation;
use App\Models\ActivityModel;
use App\Models\Criteria;
use App\Models\Contestant;
use App\Models\Judge;

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
        
        return Inertia::render('Welcome', [
            'activity' => $activity,
            'criterias' => $criterias,
            'contestants' => $contestants,
            'judge' => $judge,
        ]);
    }
}
