<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

// Include admin routes
require __DIR__.'/admin.php';
// Include activity routes
require __DIR__.'/activity.php';
// Include judge routes
require __DIR__.'/judge.php';
// Include criteria routes
require __DIR__.'/criteria.php';
// Include contestant routes
require __DIR__.'/contestant.php';

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('welcome');

    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

});

Route::middleware(['guest'])->group(function () {

    Route::get('/login', function () {
        return Inertia::render('LoginPage');
    });
    
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    
});

