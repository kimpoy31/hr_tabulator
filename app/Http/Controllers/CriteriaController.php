<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Criteria;

class CriteriaController
{
    function create (Request $request) {
        $validatedData = $request->validate([
            'activity_id' => 'required|integer',
            'criteria' => 'required|string',
            'percentage' => 'required|integer',
        ]);

        $createdCriteria = Criteria::create($validatedData);

        return response()->json(['criteria' => $createdCriteria], 201);
    }
}
