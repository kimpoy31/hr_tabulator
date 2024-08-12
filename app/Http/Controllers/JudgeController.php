<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsersInformation;
use Illuminate\Http\Request;

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
            
            UsersInformation::create([
                'user_id' => $createdUser->id,
                'activity_id' => $validatedData['activity_id'],
                'fullname' => $validatedData['fullname'],
                'role' => 'judge',
            ]);

        }

        return response()->json(['judge' => $createdUser], 200);
    }
}
