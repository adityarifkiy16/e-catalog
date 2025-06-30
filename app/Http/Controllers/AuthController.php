<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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
                    "message" => "You are redirected to dashboard...",
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
        return redirect()->route("login")->with("message", "Profile has been logged out");
    }

    public function forgetPassword()
    {
        return view("auth.forget-password");
    }

    public function forgetPasswordPost(Request $request)
    {
        $request->validate([
            "email" => "required|email",
        ]);

        $user = User::where("email", $request->email)->first();
        if (!$user) {
            return response()->json(["message" => "email not found", "status" => "error"], 401);
        }

        $rawToken = bin2hex(random_bytes(16));
        $token = bcrypt($rawToken);
        Mail::to($user->email)->send(new \App\Mail\ForgetEmail($user, $token));
        return response()->json(["message" => "email sent", "status" => "success", "url" => route("login")], 200);
    }

    public function resetPassword(Request $request)
    {
        $email = $request->email;
        $token = $request->token;
        $arr = ["email" => $email, "token" => $token];
        return view("auth.reset-password", $arr);
    }

    public function resetPasswordPost(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "token" => "required",
            "password" => "required|confirmed",
        ]);
        $user = \App\Models\User::where("email", $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(["message" => "password updated", "status" => "success", "url" => route("login")], 200);
    }
}
