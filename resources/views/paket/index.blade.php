@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Paket', 'url' => route('package.index')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card card-primary">
                <div class="card-body table-responsive">
                    <div class="d-flex justify-content-end align-items-center mb-3">
                        <a href="{{ route('package.create') }}" class="btn btn-success ml-2">
                            <i class="fa fa-plus"></i> Tambah Paket
                        </a>
                        <a href="{{ route('package.bulk.create') }}" class="btn btn-success ml-2">
                            <i class="fa fa-plus"></i> Upload Bulk
                        </a>
                        <div class="d-flex justify-content-between align-items-center ml-2">
                            <select id="jenis-filter" class="form-control select2">
                                <option value="">Semua Jenis</option>
                                @foreach ($jenises as $jenis)
                                    <option value="{{ $jenis->id }}">{{ $jenis->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <form action="{{ route('package.index') }}" method="GET">
                            <div class="d-flex justify-content-between align-items-center ml-2">
                                <select id="category-filter" class="form-control select2" name="filter">
                                    <option value="">All Categories</option>
                                </select>
                                <button class="btn btn-secondary ml-2" type="submit" id="btn-filter-category"
                                    style="width: 100px;">
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="mb-3" id="bulk-delete-wrapper" style="display:none;">
                        <button id="bulk-delete-btn" class="btn btn-danger">
                            <i class="fa fa-trash"></i> Hapus Terpilih
                        </button>
                    </div>
                    <table id="type-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="select-all">
                                </th>
                                <th style="width: 0.5rem;">No</th>
                                <th>Nama</th>
                                <th>Produk</th>
                                <th>Thumbnail</th>
                                <th style="text-align: end; width: 2rem;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
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

        // ==== Delete Paket ====
        $(document).on('submit', '.delete-paket', function(e) {
            e.preventDefault();
            const form = $(this);
            const url = form.attr('action');

            Swal.fire({
                title: 'Yakin ingin menghapus?',
                text: "Data tidak bisa dikembalikan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: form.serialize(),
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function(response) {
                            if (response.status === 'success') {
                                Swal.fire('Berhasil!', response.message, 'success');
                                // Jika pakai DataTables
                                $('#type-table').DataTable().ajax.reload(null, false);
                            } else {
                                Swal.fire('Gagal!', response.message, 'error');
                            }
                        },
                        error: function(xhr) {
                            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
                        }
                    });
                }
            });
        });

        $(document).ready(function() {
            // SELECT ALL checkbox
            $(document).on('change', '#select-all', function() {
                $('.row-checkbox').prop('checked', this.checked);
                toggleBulkDeleteButton();
            });

            // Checkbox per baris
            $(document).on('change', '.row-checkbox', function() {
                toggleBulkDeleteButton();
            });

            // Fungsi menampilkan tombol bulk delete
            function toggleBulkDeleteButton() {
                let checked = $('.row-checkbox:checked').length;
                if (checked > 0) {
                    $('#bulk-delete-wrapper').show();
                } else {
                    $('#bulk-delete-wrapper').hide();
                }
            }

            $('#jenis-filter').on('change', function() {
                let jenisId = $(this).val();
                let url = "{{ route('categories.byJenis', ':id') }}".replace(':id', jenisId);


                $.ajax({
                    url: url,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(response) {
                        console.log(response);
                        let options = '';
                        response.forEach(function(category) {
                            options += '<option value="' + category.id + '">' + category
                                .name + '</option>';
                        });
                        $('#category-filter').html(options);
                    }
                })

            })


            // ==== Bulk Delete Paket ====
            $('#bulk-delete-btn').on('click', function() {
                let ids = $('.row-checkbox:checked').map(function() {
                    return $(this).val();
                }).get();

                if (ids.length === 0) return;

                Swal.fire({
                    title: 'Hapus semua yang dipilih?',
                    text: "Data tidak bisa dikembalikan!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Ya, hapus!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        $.ajax({
                            url: "{{ route('package.bulk.destroy') }}",
                            type: 'POST',
                            data: {
                                _token: $('meta[name="csrf-token"]').attr('content'),
                                ids: ids
                            },
                            success: function(response) {
                                Swal.fire('Berhasil!', response.message, 'success');
                                $('#type-table').DataTable().ajax.reload(null, false);
                                $('#bulk-delete-wrapper').hide();
                            }
                        });
                    }
                });
            });

            $("#type-table").DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
                "order": [],
                serverSide: true,
                processing: true,
                pageLength: 5,
                lengthMenu: [5, 10, 25, 50, 100],
                language: {
                    searchPlaceholder: 'Cari Paket',
                    'search': '',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('package.index') }}",
                    type: "GET",
                    data: function(d) {
                        let urlParams = new URLSearchParams(window.location.search);
                        let filter = urlParams.get('filter');
                        if (filter) {
                            d.filter = filter;
                        }
                    },
                    dataSrc: function(response) {
                        return response.data;
                    }
                },

                columns: [{
                        data: 'id',
                        orderable: false,
                        searchable: false,
                        render: function(id) {
                            return `<input type="checkbox" class="row-checkbox" value="${id}">`;
                        }
                    },
                    {
                        data: 'DT_RowIndex',
                        orderable: false,
                        searchable: false
                    },
                    {
                        data: 'name',
                        orderable: false,
                    },
                    {
                        data: 'product',
                        orderable: false,
                        searchable: true
                    },
                    {
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data) {
                            if (data.image) {
                                return `<div class="d-flex flex-wrap gap-2">
                                    <img src="storage/${data.image}" alt="${data.name}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
                                </div>`;
                            } else {
                                return '<span class="text-muted">No Photos</span>';
                            }
                        }
                    },
                    {
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data) {
                            return `
                        <div class="d-flex flex-row justify-content-end align-items-end">
                            <a href="/package/${data.id}/edit"><button type="button" class="btn btn-primary mx-2"><i class="fas fa-pencil-alt" title="Edit"></i></button></a>
                                <form action="/package/${data.id}" style="display: inline;" class="delete-paket">
                                            <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <button type="submit" class="btn btn-danger delete-task-button" data-user-id="${data.id}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                </form>
                        </div>`;
                        }
                    }
                ],
            });


            $('#btn-filter-jenis').on('click', function() {
                const selectedJenis = $('#jenis-filter').val();
                const url = new URL(window.location.href);

                // Update or remove parameter
                if (selectedJenis) {
                    url.searchParams.set('jenis', selectedJenis);
                }

                // Optional: Remove empty 'search' if exists
                const search = url.searchParams.get('search');
                if (!search || search.trim() === '') {
                    url.searchParams.delete('search');
                }

                // Redirect to updated URL
                window.location.href = url.toString();
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
