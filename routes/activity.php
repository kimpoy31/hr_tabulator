<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivityController;

Route::middleware(['auth'])->group(function () {
    
    Route::post('/activity-create', [ActivityController::class, 'create'])->name('activity.create');
    Route::get('/activity-fetch', [ActivityController::class, 'fetchAll'])->name('activity.fetchAll');

   // Add the new route for activity by ID
   Route::get('/activity/{id}', [ActivityController::class, 'show'])->name('activity.show');
});