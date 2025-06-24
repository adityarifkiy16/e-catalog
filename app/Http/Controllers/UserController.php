<?php

namespace App\Http\Controllers;

use App\Models\MCategories;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $arr['users'] = \App\Models\User::with('role')->get();
        // dd($arr['users']);
        return view('user.index', $arr);
    }

    public function create()
    {
        $arr['roles'] = \App\Models\MRole::with('permissions')->get();
        return view('user.create', $arr);
    }

    public function store(Request $request)
    {

        // dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:m_roles,id',
        ]);

        \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully.',
        ], 201);
    }

    public function edit(User $user)
    {
        $arr['user'] = $user;
        $arr['roles'] = \App\Models\MRole::with('permissions')->get();
        return view('user.edit', $arr);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:m_roles,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'role_id' => $request->role_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully.',
        ], 200);
    }


    public function search(Request $request)
    {
        $arr['users'] = \App\Models\User::where('name', 'LIKE', '%' . $request->search . '%')->get();
        return view('user.index', $arr);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully.',
        ], 200);
    }
}
