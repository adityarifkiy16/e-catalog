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
        @if (auth()->check() && auth()->user()->hasPermission('management_product'))
            <div class="col-12 mb-3">
                <form action="{{ route('products.viewed') }}" method="GET"
                    class="d-flex justify-content-end align-items-center">
                    <select name="filter" id="date-filter" class="select2">
                        <option value="">Semua</option>
                        <option value="7">7 Hari Terakhir</option>
                        <option value="30">30 Hari Terakhir</option>
                        <option value="365">1 Tahun Terakhir</option>
                    </select>
                    <button type="button" class="btn btn-primary ml-2" id="btn-filter-date">Filter</button>
                </form>
            </div>
            <div class="col-6">
                <div class="card card-danger">
                    <div class="card-header">
                        <h3 class="card-title">Grafik Top produk</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <canvas id="pieChart"
                            style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card card-primary">
                    <div class="card-header bg-primary">
                        <h4 class="card-title mb-0"><i class="fas fa-chart-bar mr-2"></i> Top Produk Berdasarkan Klik</h4>
                        <div class="card-tools">
                            <!-- Collapse Button -->
                            <button type="button" class="btn btn-tool text-white" data-card-widget="collapse"><i
                                    class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body table-responsive">
                        <table id="product-table" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 0.5rem;">No</th>
                                    <th>Kode</th>
                                    <th>Jumlah Klik</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        @endif
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

        $(function() {
            //Initialize Select2 Elements
            $('.select2').select2()
        })

        $(document).ready(function() {
            // Variable untuk chart biar bisa destroy
            let pieChart = null;

            const table = $("#product-table").DataTable({
                paging: true,
                lengthChange: true,
                searching: true,
                info: true,
                autoWidth: false,
                responsive: true,
                order: [],
                serverSide: false,
                processing: true,
                pageLength: 10,
                lengthMenu: [5, 10, 25, 50, 100],
                language: {
                    searchPlaceholder: 'Cari Produk',
                    search: '',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('products.viewed') }}",
                    type: "GET",
                    data: function(data) {
                        data.filter = $('#date-filter').val();
                    },
                    dataSrc: function(response) {
                        return response.data;
                    }
                },
                columns: [{
                        data: 'DT_RowIndex',
                        orderable: false,
                        searchable: false
                    },
                    {
                        data: 'code',
                        orderable: false
                    },
                    {
                        data: 'views_count'
                    }
                ],
            });

            // Setelah DataTable load data, update Chart
            table.on('xhr.dt', function(e, settings, json, xhr) {
                if (!json || !json.data) return;
                // Ambil data dari response
                let labels = json.data.map(item => item.code);
                let values = json.data.map(item => item.views_count);

                // Buat dataset untuk Chart.js
                let donutData = {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            '#f56954', '#00a65a', '#f39c12',
                            '#00c0ef', '#3c8dbc', '#d2d6de',
                            '#8e44ad', '#2ecc71', '#e74c3c', '#3498db'
                        ],
                    }]
                };

                // Hapus chart lama biar ga dobel
                if (pieChart) {
                    pieChart.destroy();
                }


                // Render chart baru
                let ctx = $('#pieChart').get(0).getContext('2d');
                pieChart = new Chart(ctx, {
                    type: 'pie',
                    data: donutData,
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                });
            });

            $('#btn-filter-date').on('click', function() {
                table.ajax.reload();
            });
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
