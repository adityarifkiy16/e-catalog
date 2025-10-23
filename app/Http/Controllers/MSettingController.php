<?php

namespace App\Http\Controllers;

use App\Models\MSetting;
use Illuminate\Http\Request;

class MSettingController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:management_settings');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arr['setting'] = MSetting::first();
        return view('setting.index', $arr);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'last_update' => 'required|date|max:255',
            'version' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        $setting = MSetting::first();

        if (!$setting) {
            $setting = new MSetting();
        }

        $setting->fill($request->only([
            'last_update',
            'version',
            'phone',
            'address',
            'email'
        ]));

        $setting->save();

        return response()->json(['status' => 'success', 'message' => 'Setting updated successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(MSetting $mSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MSetting $mSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MSetting $mSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MSetting $mSetting)
    {
        //
    }
}
