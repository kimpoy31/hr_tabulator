<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContestantController;

Route::middleware(['auth'])->group(function () {
    
    Route::post('/contestant-create', [ContestantController::class, 'create'])->name('contestant.create');

});