@extends('layouts.app')

@section('title', 'Welcome Page')

@section('header-title') WELCOME
@endsection

@section('breadcrumb-title', 'Dashboard')

@section('breadcrumb-sub', 'Dashboard')

@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card card-primary">
                <div class="card-body">
                    <h2 class="fw-bold text-muted">Selamat Datang, {{ Auth::user()->name }}
                        ☄</h2>
                </div>
            </div>
        </div>
    </div>
@endsection
