@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Versi Produk', 'url' => route('product-versions.index')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-end">
                        <div class="d-flex justify-content-between align-items-center">
                            <form action="{{ route('product-versions.index') }}" method="GET">
                                <div class="d-flex justify-content-between align-items-center ml-2">
                                    <div class="mr-2">
                                        <select id="category-filter" class="form-control select2" name="filter">
                                            <option value="">All Categories</option>
                                            @foreach ($categories as $category)
                                                <option value="{{ $category->id }}"
                                                    {{ old('category', request()->query('filter')) == $category->id ? 'selected' : '' }}>
                                                    {{ $category->name }} ({{ $category->jenis->name ?? 'Unknown' }})
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="mr-2">
                                        <select id="version" class="form-control select2 mr-2" name="version">
                                            <option value="">All Version</option>
                                            @foreach ($versions as $item)
                                                <option value="{{ $item->id }}"
                                                    {{ old('category', request()->query('version')) == $item->id ? 'selected' : '' }}>
                                                    {{ $item->version }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <button class="btn btn-secondary" type="submit" id="btn-filter-category"
                                        style="width: 100px;">
                                        Filter
                                    </button>
                                </div>
                            </form>
                            @if ($isAuthenticated && $user->hasPermission('management_product'))
                                <a href="{{ route('product-versions.create.bulk') }}" class="btn btn-success ml-2">
                                    <i class="fa fa-plus"></i> <span class="text-capitalize">upload produk</span>
                                </a>
                                <a href="{{ route('product-versions.bulk.create-motif') }}" class="btn btn-primary ml-2">
                                    <i class="fa fa-plus"></i> <span class="text-capitalize">upload desain</span>
                                </a>
                                <a href="{{ route('product-versions.create') }}" class="btn btn-warning ml-2">
                                    <i class="fa fa-upload"></i> <span class="text-capitalize">sync data</span>
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-primary">
                <div class="card-body table-responsive">
                    <table id="product-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 0.5rem;">No</th>
                                <th>Kode</th>
                                <th>Nama Produk</th>
                                <th>Jenis</th>
                                <th>Kategori</th>
                                <th>Versi Katalog</th>
                                <th>Foto</th>
                                @if ($isAuthenticated && $user->hasPermission('management_product'))
                                    <th style="text-align: end; width: 2rem;">Action</th>
                                @endif
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="detailModal">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Gambar Produk</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modal-body-content">

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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

        $(function() {
            $('.select2').select2()
        })

        $(document).on('submit', '.delete-product', function(e) {
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
                                $('#product-table').DataTable().ajax.reload(null, false);
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

        $(document).on('submit', '.reset-mockup', function(e) {
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
                                $('#product-table').DataTable().ajax.reload(null, false);
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

        $(document).on('submit', '.reset-motif', function(e) {
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
                                $('#product-table').DataTable().ajax.reload(null, false);
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
            $("#product-table").DataTable({
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
                    searchPlaceholder: 'Cari Produk by Kode, Jenis, Kategori',
                    'search': '',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('product-versions.index') }}",
                    type: "GET",
                    data: function(d) {
                        let urlParams = new URLSearchParams(window.location.search);
                        let filter = urlParams.get('filter');
                        let version = urlParams.get('version');
                        if (filter) {
                            d.filter = filter;
                        }
                        if (version) {
                            d.version = version;
                        }
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
                        data: 'product.code',
                        orderable: false,
                    },
                    {
                        data: 'name',
                        orderable: false,
                    },
                    {
                        data: 'product.category.jenis.name',
                        orderable: false,
                        searchable: true
                    },
                    {
                        data: 'product.category.name',
                        orderable: false,
                        searchable: true
                    },
                    {
                        data: 'version.version',
                        orderable: false,
                        searchable: false
                    },
                    {
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data) {
                            if (data.images.length > 0) {
                                return `<div class="d-flex flex-wrap gap-2">
                                    ${data.images.map(image => `<img src="storage/${image.path}" alt="${data.name}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">`).join('')}
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
                                <a href="/product-versions/${data.id}/edit" title="Edit Produk"><button type="button" class="btn btn-primary mx-2"><i class="fas fa-pencil-alt"></i></button></a>
                                <form action="/product-versions/${data.id}" style="display: inline;" class="delete-product">
                                            <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <button type="submit" class="btn btn-danger delete-task-button" data-user-id="${data.id}" title="Hapus Produk">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                </form>
                                <form action="/product-versions/reset-mockup/${data.id}" style="display: inline;" class="reset-mockup mx-2">
                                            <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <button type="submit" class="btn btn-success" data-user-id="${data.id}" title="Reset Gambar 1">
                                                <i class="fas fa-undo"></i>
                                            </button>
                                </form>
                                <form action="/product-versions/reset-motif/${data.id}" style="display: inline;" class="reset-motif">
                                            <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <button type="submit" class="btn btn-warning" data-user-id="${data.id}" title="Reset Gambar 2">
                                                <i class="fas fa-undo"></i>
                                            </button>
                                </form>
                        </div>`;
                        }
                    }
                ],
            });


            $(document).on('click', '.img-thumbnail', function(e) {
                e.preventDefault();

                var imgsrc = $(this).attr('src');

                $('#detailModal').modal('show');
                $('#modal-body-content').html('<img src="' + imgsrc + '" class="img-fluid">');
            });

            $('#btn-filter-category').on('click', function() {
                const selectedCategory = $('#category-filter').val();
                const selectedVersion = $('#version').val();
                const url = new URL(window.location.href);

                // Update or remove 'category' parameter
                if (selectedCategory) {
                    url.searchParams.set('category', selectedCategory);
                }

                if (selectedVersion) {
                    url.searchParams.set('version', selectedVersion);
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
