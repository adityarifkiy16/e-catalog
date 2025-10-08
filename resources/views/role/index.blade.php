@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Role', 'url' => route('role.index')],
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
                        <a href="{{ route('role.create') }}" class="btn btn-success ml-2">
                            <i class="fa fa-plus"></i> Tambah Role
                        </a>
                    </div>
                    <table id="type-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 0.5rem;">No</th>
                                <th>Role</th>
                                <th>Deskripsi</th>
                                <th>Permissions</th>
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
        $(document).on('submit', '.delete-role', function(e) {
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
                pageLength: 10,
                lengthMenu: [5, 10, 25, 50, 100],
                language: {
                    searchPlaceholder: 'Cari',
                    'search': '',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>',
                        previous: '<i class="fas fa-arrow-left"></i>'
                    }
                },
                ajax: {
                    url: "{{ route('role.index') }}",
                    type: "GET",
                    data: function(d) {
                        let urlParams = new URLSearchParams(window.location.search);
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
                        data: 'description',
                        orderable: false,
                    },
                    {
                        data: null,
                        orderable: false,
                        render: function(data) {
                            if (data.permissions) {
                                if (data.permissions.length > 0) {
                                    return data.permissions.map(permission =>
                                        `<span class="px-3 py-1 badge bg-warning rounded-pill">${permission.name.replace(/_/g, ' ')}</span>`
                                    ).join(' ');
                                } else {
                                    return '<span class="text-muted">No Permissions</span>';
                                }
                            } else {
                                return '<span class="text-muted">No Permissions</span>';
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
                            <a href="/role/${data.id}/edit"><button type="button" class="btn btn-primary mx-2"><i class="fas fa-pencil-alt" title="Edit"></i></button></a>
                                <form action="/role/${data.id}" style="display: inline;" class="delete-role">
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
        });
    </script>
@endpush
