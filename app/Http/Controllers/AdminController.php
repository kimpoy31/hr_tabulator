<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityModel;
use Inertia\Inertia;

class AdminController
{
    function show () {
        $activities = ActivityModel::all();

        return Inertia::render('AdminPage', [
            'activities' => $activities,
        ]);
    }
}
