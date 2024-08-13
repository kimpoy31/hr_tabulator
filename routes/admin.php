<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;

Route::middleware(['auth'])->group(function () {

    Route::get('/admin', [AdminController::class, 'show'])->name('admin.show');

});
