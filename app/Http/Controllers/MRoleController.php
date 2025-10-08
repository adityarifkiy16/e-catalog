<?php

namespace App\Http\Controllers;

use App\Models\MRole;
use App\Models\MPermissions;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class MRoleController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:management_roles', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MRole::with('permissions')->orderBy('id', 'desc');
        if ($request->ajax()) {
            return DataTables::of($query)
                ->filter(function ($query) use ($request) {
                    if ($request->has('search') && $request->search['value']) {
                        $search = $request->search['value'];
                        $query->where(function ($q) use ($search) {
                            $q->where('m_roles.name', 'like', "%{$search}%")
                                ->orWhereHas('permissions', function ($q2) use ($search) {
                                    $q2->where('m_permissions.name', 'like', "%{$search}%");
                                });
                        });
                    }
                })
                ->addIndexColumn()
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('role.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arr['permissions'] = MPermissions::all()->groupBy(function ($item) {
            return explode('_', $item->name)[1];
        });
        return view('role.create', $arr);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'permission' => 'nullable|array|min:1',
        ]);

        $role = MRole::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        $role->permissions()->sync($request->permission);

        return response()->json(['status' => 'success', 'message' => 'Role created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(MRole $mRole)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MRole $role)
    {
        $arr['role'] = $role;
        $arr['permissions'] = MPermissions::all()->groupBy(function ($item) {
            return explode('_', $item->name)[1];
        });
        return view('role.edit', $arr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MRole $role)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'permission' => 'nullable|array|min:1',
        ]);

        $role->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        $role->permissions()->sync($request->permission);

        return response()->json(['message' => 'Role updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MRole $role)
    {
        $roleUser = $role->users;
        if ($roleUser->count() > 0) {
            return response()->json(['status' => 'error', 'message' => 'Role cannot be deleted because it has users.']);
        }
        $role->permissions()->detach();
        $role->update([
            'name' => $role->name . ' (deleted ' . now()->format('Y-m-d H:i:s') . ')',
        ]);
        $role->delete();
        return response()->json(['status' => 'success', 'message' => 'Role deleted successfully.']);
    }
}
