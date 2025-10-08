@extends('layouts.app')

@section('title', 'Akses Ditolak')

@section('content')
    <div class="d-flex flex-column justify-content-center align-items-center card shadow w-50 mx-auto p-5">
        <div class="position-absolute d-flex" style="top: 15px; right: 20px;">
            <span style="width: 14px; height: 14px; background-color: #ff5f56; border-radius: 50%; display: inline-block;"
                class="mr-2"></span>
            <span style="width: 14px; height: 14px; background-color: #ffbd2e; border-radius: 50%; display: inline-block;"
                class="mr-2"></span>
            <span
                style="width: 14px; height: 14px; background-color: #27c93f; border-radius: 50%; display: inline-block;"></span>
        </div>

        {{-- Judul --}}
        <h1 class="display-3 font-weight-bold text-info">403</h1>

        {{-- Gambar ilustrasi --}}
        <img src="{{ asset('dist/img/error/403.svg') }}" alt="Akses Ditolak" class="img-fluid mb-4"
            style="max-width: 100px;">
        <h2 class="mb-2">Access Denied</h2>
        <p class="text-muted mb-4 font-weight-light">You do not have permission to access this page</p>

        {{-- Tombol kembali --}}
        <a href="{{ route('dashboard') }}" class="btn btn-outline-info">
            <i class="fa fa-home me-2"></i> Home
        </a>
    </div>
@endsection
