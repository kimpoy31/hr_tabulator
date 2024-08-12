<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityModel;
use Inertia\Inertia;

class ActivityController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity' => 'required|string',
            'description' => 'string|nullable',
        ]);

        ActivityModel::create($validatedData);

        return response()->json([
            'message' => 'Activity created successfully!',
            'activity' => $activity
        ], 201); // 201 is the status code for "Created"
    }

    function fetchAll () {
        $activities = ActivityModel::all();

        return response()->json(['activities' => $activities], 200);
    }

    function show ($id) {
        $activity = ActivityModel::find($id);

        return Inertia::render('Activity', [
            'activity' => $activity,
        ]);
    }

}
