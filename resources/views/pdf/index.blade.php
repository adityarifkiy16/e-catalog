@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Master PDF Katalog', 'url' => route('products.index')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h3 class="h3 font-weight-bold">Daftar PDF Katalog</h3>
                    </div>
                </div>
            </div>
            <div class="card card-primary">
                <div class="card-body table-responsive">
                    <table id="pdf-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 0.5rem;">No</th>
                                <th>Path</th>
                                <th>Version</th>
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
                                $('#pdf-table').DataTable().ajax.reload(null, false);
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
            $("#pdf-table").DataTable({
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
                    searchPlaceholder: 'Cari data...',
                    'search': '',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('pdf.index') }}",
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
                        data: 'path',
                        orderable: false,
                    },
                    {
                        data: 'version',
                        orderable: false,
                    },
                    {
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data) {
                            return `
                        <div class="d-flex flex-row justify-content-end align-items-end">
                                <a href="/pdf/${data.id}/edit" title="Edit Produk"><button type="button" class="btn btn-primary mx-2"><i class="fas fa-pencil-alt"></i></button></a>
                                <form action="/pdf/${data.id}" style="display: inline;" class="delete-product">
                                            <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <button type="submit" class="btn btn-danger delete-task-button" data-user-id="${data.id}" title="Hapus Produk">
                                                <i class="fas fa-trash"></i>
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
                const url = new URL(window.location.href);

                // Update or remove 'category' parameter
                if (selectedCategory) {
                    url.searchParams.set('category', selectedCategory);
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
