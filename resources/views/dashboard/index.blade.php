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
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h2 class="text-muted">
                            @if (date('H') < 12)
                                Good morning,
                            @elseif (date('H') < 18)
                                Good afternoon,
                            @else
                                Good Night,
                            @endif
                            <span class="font-weight-bold">{{ Auth::user()->name }}</span>
                        </h2>
                        <div class="d-flex align-items-center text-muted flex-column">
                            <div class="small" style="letter-spacing: 0.5px;">
                                {{ now()->setTimezone('Asia/Jakarta')->format('d F Y') }}
                            </div>
                            <div class="h6 mb-0" style="font-weight: 600; font-size: 1rem;">
                                {{ now()->setTimezone('Asia/Jakarta')->format('H:i') }}
                                <span class="text-uppercase" style="font-size: 0.75rem;">WIB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @foreach ($count as $item => $value)
            <div class="col mb-4">
                <div class="card shadow-sm rounded-lg border-0 h-100">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center p-4"
                        style="background-color: white;">
                        <div class="mb-2">
                            @if ($item == 'produk')
                                <i class="fas fa-tags fa-2x" style="color: #bbaa91"></i>
                            @endif
                            @if ($item == 'kategori')
                                <i class="fas fa-tags fa-2x" style="color: #bbaa91"></i>
                            @endif
                            @if ($item == 'gambar')
                                <i class="fas fa-image fa-2x" style="color: #bbaa91"></i>
                            @endif
                        </div>
                        <h5 class="fw-bold text-secondary mb-1">{{ ucwords($item) }}</h5>
                        <h2 class="fw-bold text-secondary">{{ $value }}</h2>
                    </div>
                </div>
            </div>
        @endforeach
        <div class="col-12">
            <div class="card border-0 shadow-sm rounded-lg">
                <div class="card-header bg-primary">
                    <h4 class="card-title mb-0"><i class="fas fa-boxes mr-2"></i> Total Produk Per Jenis</h4>
                    <div class="card-tools">
                        <!-- Collapse Button -->
                        <button type="button" class="btn btn-tool text-white" data-card-widget="collapse"><i
                                class="fas fa-minus"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    @forelse ($produkPerJenis as $key => $value)
                        <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                            <span class="text-dark font-weight-semibold">{{ $key }}</span>
                            <span class="badge badge-pill badge-info">{{ $value }} pcs</span>
                        </div>
                    @empty
                        <p class="text-muted">Belum ada data produk.</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script type="text/javascript">
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    </script>

    @if (session('success'))
        <script>
            Toast.fire({
                icon: 'success',
                title: '{{ session('success') }}'
            });
        </script>
    @endif

    @if (session('error'))
        <script>
            Toast.fire({
                icon: 'error',
                title: '{{ session('error') }}'
            });
        </script>
    @endif
@endpush
