<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('welcome');

    Route::get('/admin', function () {
        return Inertia::render('AdminPage');
    })->name('admin');

    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

});

Route::middleware(['guest'])->group(function () {

    Route::get('/login', function () {
        return Inertia::render('LoginPage');
    });
    
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    
});

