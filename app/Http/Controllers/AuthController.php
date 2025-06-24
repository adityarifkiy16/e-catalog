<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return view("auth.login");
    }

    public function store(Request $request)
    {
        $credentials = $this->validate($request, [
            "email" => "required|email",
            "password" => "required",
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // if (!$user->is_verified) {
            //     Auth::logout();
            //     return response()->json(
            //         [
            //             "message" => "email belum diaktivasi",
            //             "status" => "error",
            //         ],
            //         401
            //     );
            // }
            $request->session()->regenerate();
            return response()->json(
                [
                    "message" => "success login",
                    "url" => route("dashboard"),
                    "status" => "success",
                ],
                200
            );
        }

        return response()->json(
            ["message" => "invalid credentials", "status" => "error"],
            401
        );
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route("login")->with("message", "success logout");
    }
}
