<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\JudgeController;

Route::middleware(['auth'])->group(function () {
    
    Route::post('/judge-create', [JudgeController::class, 'create'])->name('judge.create');

});