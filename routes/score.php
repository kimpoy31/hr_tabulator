<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ScoreController;

Route::middleware(['auth'])->group(function () {
    
    Route::get('/score-fetch', [ScoreController::class, 'fetch'])->name('score.fetch');
    Route::post('/score-create', [ScoreController::class, 'create'])->name('score.create');
    Route::post('/score-update', [ScoreController::class, 'update'])->name('score.update');

});