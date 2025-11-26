@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Laporan', 'url' => route('package.index')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        @if (auth()->check() && auth()->user()->hasPermission('view_reports'))
            <div class="col-12 mb-3">
                <div class="d-flex justify-content-end align-items-center">
                    <input type="text" id="date-range" class="form-control" style="width: 230px;"
                        placeholder="Pilih rentang tanggal">
                    <button class="btn btn-success ml-2 text-capitalize" id="btn-download">Print Laporan</button>
                </div>
            </div>
            <div class="col-6 h-100">
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
                            style="min-height: 400px; height: 400px; max-height: 400px; max-width: 100%;"></canvas>
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
            <div class="col-12">
                <div class="card">
                    <div class="card">
                        <div class="card-header bg-warning text-white">
                            <h4 class="card-title mb-0"><i class="fas fa-globe mr-2"></i> Log View Produk (Browser & IP)
                            </h4>
                        </div>
                        <div class="card-body table-responsive">
                            <table id="product-view-log-table" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Produk</th>
                                        <th>IP Address</th>
                                        <th>Browser / User Agent</th>
                                        <th>Dilihat Pada</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </div>
@endsection
@push('scripts')
    <script type="text/javascript">
        $(function() {
            $('.select2').select2()
            $('#date-range').daterangepicker({
                autoUpdateInput: false,
                locale: {
                    format: 'YYYY-MM-DD',
                    cancelLabel: 'Batal',
                    applyLabel: 'Terapkan'
                }
            });
        })

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
                pageLength: 5,
                lengthMenu: [5, 10, 25, 50, 100],
                searching: false,
                language: {
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('products.viewed') }}",
                    type: "GET",
                    data: function(data) {
                        data.filter = $('#date-range').val();
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

            $('#product-view-log-table').DataTable({
                paging: true,
                lengthChange: true,
                searching: true,
                info: true,
                autoWidth: false,
                responsive: true,
                order: [],
                serverSide: false,
                processing: true,
                pageLength: 5,
                lengthMenu: [5, 10, 25, 50, 100],
                searching: false,
                language: {
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('products.viewed.log') }}",
                    type: "GET",
                    data: function(data) {
                        data.filter = $('#date-range').val();
                    },
                    dataSrc: function(response) {
                        return response.data;
                    }
                },
                columns: [{
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex',
                        orderable: false,
                        searchable: false
                    },
                    {
                        data: 'product_name',
                        name: 'product_name'
                    },
                    {
                        data: 'ip_address',
                        name: 'ip_address'
                    },
                    {
                        data: 'browser',
                        name: 'browser'
                    },
                    {
                        data: 'viewed_at',
                        name: 'viewed_at'
                    }
                ]
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

            $('#date-range').on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format(
                    'YYYY-MM-DD'));
                table.ajax.reload();
                $('#product-view-log-table').DataTable().ajax.reload(); // >>> reload log

            });

            $('#date-range').on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('');
                table.ajax.reload();
                $('#product-view-log-table').DataTable().ajax.reload(); // >>> reload log
            });

            $('#btn-download').on('click', function() {
                let filter = $('#date-range').val();
                let url = "{{ route('laporan.download') }}";
                let params = new URLSearchParams();
                if (filter) params.append('filter', filter);
                window.open(params.toString() ? `${url}?${params.toString()}` : url, '_blank');
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
