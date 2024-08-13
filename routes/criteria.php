<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CriteriaController;

Route::middleware(['auth'])->group(function () {
    
    Route::post('/criteria-create', [CriteriaController::class, 'create'])->name('criteria.create');

});