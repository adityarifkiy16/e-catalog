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
                    <h2 class="text-muted">Welcome, <span class="font-weight-bold">{{ Auth::user()->name }}</span>
                    </h2>
                </div>
            </div>
        </div>
        @foreach ($count as $item => $value)
            <div class="col-md-3 mb-4">
                <div class="card shadow-sm rounded-lg border-0 h-100">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center p-4"
                        style="background-color: white;">
                        <div class="mb-2">
                            @if ($item == 'product')
                                <i class="fas fa-box fa-2x" style="color: #1B1A55"></i>
                            @endif
                            @if ($item == 'jenis')
                                <i class="fas fa-tags fa-2x" style="color: #1B1A55"></i>
                            @endif
                            @if ($item == 'category')
                                <i class="fas fa-tags fa-2x" style="color: #1B1A55"></i>
                            @endif
                            @if ($item == 'user')
                                <i class="fas fa-users fa-2x" style="color: #1B1A55"></i>
                            @endif
                        </div>
                        <h5 class="fw-bold text-secondary mb-1">{{ ucwords($item) }}</h5>
                        <h2 class="fw-bold text-secondary">{{ $value }}</h2>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@endsection
