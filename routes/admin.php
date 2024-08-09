<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivityController;

Route::middleware(['auth'])->group(function () {

    Route::get('/admin', function () {
        return Inertia::render('AdminPage');
    })->name('admin');

});
