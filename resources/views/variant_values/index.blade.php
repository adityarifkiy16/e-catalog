@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Variant Value', 'url' => route('variant_values.index')],
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
                        <a href="{{ route('variant_values.create') }}" class="btn btn-success ml-2">
                            <i class="fa fa-plus"></i> Tambah Value
                        </a>
                    </div>
                    <table id="variant-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 0.5rem;">No</th>
                                <th>varian</th>
                                <th>name</th>
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
        $(document).on('submit', '.delete-variant', function(e) {
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
                                $('#variant-table').DataTable().ajax.reload(null, false);
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

            $("#variant-table").DataTable({
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
                    url: "{{ route('variant_values.index') }}",
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
                        data: 'variant',
                        orderable: false,
                    },
                    {
                        data: 'name',
                        orderable: false,
                    },
                    {
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data) {
                            return `
                        <div class="d-flex flex-row justify-content-end align-items-end">
                            <a href="/variant_values/${data.id}/edit"><button type="button" class="btn btn-primary mx-2"><i class="fas fa-pencil-alt" title="Edit"></i></button></a>
                                <form action="/variant_values/${data.id}" style="display: inline;" class="delete-variant">
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
