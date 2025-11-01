<?php

namespace App\Http\Controllers;

use App\Models\MVersion;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class MVersionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MVersion::orderBy('id', 'desc');
        if ($request->ajax()) {
            if ($request->has('search') && $request->search['value']) {
                $search = $request->search['value'];
                $query->where('path', 'LIKE', "%{$search}%");
            }

            return DataTables::of($query)
                ->addIndexColumn()
                ->rawColumns(['action'])
                ->toJson();
        }
        return view('version.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('version.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'version' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        MVersion::create([
            'version' => $request->version,
            'description' => $request->description,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Version updated successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(MVersion $mVersion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MVersion $mVersion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MVersion $mVersion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MVersion $mVersion)
    {
        //
    }
}
