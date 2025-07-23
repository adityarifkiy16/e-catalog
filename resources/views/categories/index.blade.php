@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Categories', 'url' => route('categories.index')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card card-primary">
                <div class="card-body table-responsive">

                    <form action="{{ route('categories.index') }}" method="GET">
                        <div class="d-flex justify-content-between align-items-center mb-3 ">
                            <select id="jenis-filter" class="custom-select mr-2" name="filter">
                                <option value="">--Pilih Jenis---</option>
                                @foreach ($jenises as $jenis)
                                    <option value="{{ $jenis->id }}"
                                        {{ old('jenis', request()->query('filter')) == $jenis->id ? 'selected' : '' }}>
                                        {{ $jenis->name }}
                                    </option>
                                @endforeach
                            </select>
                            <button class="btn btn-secondary" type="submit" id="btn-filter-jenis" style="width: 100px;">
                                Filter
                            </button>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end align-items-center mb-3">
                        <a href="{{ route('categories.create') }}" class="btn btn-success ml-2">
                            <i class="fa fa-plus"></i> Tambah Kategory
                        </a>
                    </div>
                    <table id="category-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 0.5rem;">No</th>
                                <th>Nama Kategori</th>
                                <th>Jenis</th>
                                <th>Jumlah Produk</th>
                                <th>Foto</th>
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
        $(document).on('submit', '.delete-category', function(e) {
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
                                $('#category-table').DataTable().ajax.reload(null, false);
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

            $("#category-table").DataTable({
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
                    searchPlaceholder: 'Cari Category',
                    'search': '',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('categories.index') }}",
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
                        data: 'DT_RowIndex',
                        orderable: false,
                        searchable: false
                    },
                    {
                        data: 'name',
                        orderable: false,
                    },
                    {
                        data: 'jenis',
                        orderable: false,
                    },
                    {
                        data: 'product_count',
                        orderable: false,
                    },
                    {
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data) {
                            if (data.path) {
                                return `<div class="d-flex flex-wrap gap-2">
                                    <img src="storage/${data.path}" alt="${data.name}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
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
                            <a href="/categories/${data.id}/edit"><button type="button" class="btn btn-primary mx-2"><i class="fas fa-pencil-alt" title="Edit"></i></button></a>
                                <form action="/categories/${data.id}" style="display: inline;" class="delete-category">
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
@endpush
