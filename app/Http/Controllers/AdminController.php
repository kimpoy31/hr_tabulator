<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityModel;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AdminController
{
    function show () {
        $activities = ActivityModel::all();
        $user = Auth::user();
        $role = $user->userInformation->role;

        if($role !== 'admin'){
            return to_route('welcome');
        }

        return Inertia::render('AdminPage', [
            'activities' => $activities,
        ]);
    }
}
