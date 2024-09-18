<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivityController;

Route::middleware(['auth'])->group(function () {
    
    Route::post('/activity-create', [ActivityController::class, 'create'])->name('activity.create');
    Route::post('/activity-update-range', [ActivityController::class, 'updateScoringRange'])->name('range.update');
    Route::get('/activity-fetch', [ActivityController::class, 'fetchAll'])->name('activity.fetchAll');

    // Add the new route for activity by ID
   Route::get('/activity/{id}', [ActivityController::class, 'show'])->name('activity.show');
    //  Tabulation data    
   Route::get('/activity/{activity_id}/judge/{judge_id}', [ActivityController::class, 'judgeTabulation'])->name('activity.judge.tabulation');
   Route::get('/activity/{activity_id}/winners-per-criteria', [ActivityController::class, 'winnersPerCriteria'])->name('activity.winnersPerCriteria');

    // THIS ROUTE IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    // THIS ROUTE IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    // THIS ROUTE IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
    // THIS ROUTE IS SPECIFICALLY FOR THATS MY BOBORDS 2024     
   Route::get('/activity/{activity_id}/final-result', [ActivityController::class, 'finalResult'])->name('activity.finalResult');

});