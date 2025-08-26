<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MCategories;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $arr['users'] = \App\Models\User::with('role')->get();
        return view('user.index', $arr);
    }

    public function create()
    {
        $arr['roles'] = \App\Models\MRole::with('permissions')->get();
        return view('user.create', $arr);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:m_roles,id',
            'path_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id
        ];

        if ($request->hasFile('path_image')) {
            $file = $request->file('path_image');
            $filename = time() . '_' . uniqid() . '.webp';
            $folder = 'images/users/' . now()->format('Y/m/d');
            $path = $folder . '/' . $filename;
            $fullPath = storage_path('app/public/' . $path);

            if (!file_exists(dirname($fullPath))) {
                mkdir(dirname($fullPath), 0755, true);
            }

            Image::make($file)
                ->resize(100, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 100)
                ->save($fullPath);
            $data['path_image'] = $path;
        }

        \App\Models\User::create($data);
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
            'path_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,jfif|max:2048',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'role_id' => $request->role_id,
        ];

        if ($request->hasFile('path_image')) {
            $file = $request->file('path_image');
            $filename = time() . '_' . uniqid() . '.webp';
            $folder = 'images/users/' . now()->format('Y/m/d');
            $path = $folder . '/' . $filename;
            $fullPath = storage_path('app/public/' . $path);

            if (!file_exists(dirname($fullPath))) {
                mkdir(dirname($fullPath), 0755, true);
            }

            // Hapus gambar lama jika ada
            if ($user->path_image) {
                $oldPath = storage_path('app/public/' . $user->path_image);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }

            Image::make($file)
                ->resize(100, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 100)
                ->save($fullPath);

            $updateData['path_image'] = $path;
        }

        $user->update($updateData);

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
        $user->update(['email' => $user->email . '_deleted']);
        $user->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully.',
        ], 200);
    }
}
