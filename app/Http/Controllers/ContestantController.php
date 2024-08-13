<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contestant;

class ContestantController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity_id' => 'required|integer',
            'contestant' => 'string|required',
        ]);

        $createdContestant = Contestant::create($validatedData);

        return response()->json(['contestant' => $createdContestant], 201);
    }
}
