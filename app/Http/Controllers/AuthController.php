<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController
{

    function login (Request $request) {
        // Validate the request
         $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication was successful
            $request->session()->regenerate();


            // Get the authenticated user
            $user = Auth::user();
            $roles = $user->role;

            // Check if the user's roles include 'admin'
            $isAdmin = in_array('admin', json_decode($roles, true));

            // Redirect to the dashboard using Inertia with a success message
            return to_route($isAdmin ? "admin" : 'welcome');
        }

        // Authentication failed
        return Inertia::render('Login', [
            'errors' => [
                'username' => 'The provided credentials are incorrect.',
            ],
        ]);
    }


    public function logout(Request $request)
    {
        // Log out the user
        Auth::logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the CSRF token
        $request->session()->regenerateToken();

        // Redirect to the login page or welcome page
        return to_route('login');
    }


}
