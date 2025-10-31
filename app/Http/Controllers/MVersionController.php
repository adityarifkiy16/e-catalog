<?php

namespace App\Http\Controllers;

use App\Models\MVersion;
use Illuminate\Http\Request;

class MVersionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arr['version'] = MVersion::first();
        return view('version.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

        $version = MVersion::first();

        if (!$version) {
            $version = new MVersion();
        }

        $version->fill($request->only([
            'version',
            'description',
        ]));
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
