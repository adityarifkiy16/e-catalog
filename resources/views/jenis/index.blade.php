@php
    $isAuthenticated = auth()->check();
    $user = auth()->user();
@endphp


@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Master Data Jenis', 'url' => route('jenis.index')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card card-primary">
                <div class="card-body table-responsive">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <a href="{{ route('jenis.create') }}" class="btn btn-success ml-2">
                            <i class="fa fa-plus"></i>
                            Tambah Jenis
                        </a>
                    </div>
                    <table id="user-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 0.5rem;">No</th>
                                <th>Name</th>
                                <th style="text-align: end;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($jenis as $item)
                                <tr>
                                    <td style="width: 10px;">{{ $item->id }}</td>
                                    <td>{{ $item->name }}</td>

                                    <td style="width: 100px;">
                                        <div class="d-flex justify-content-end align-items-center gap-1">
                                            <a href="{{ route('jenis.edit', $item) }}" class="btn btn-sm btn-primary mr-2"
                                                title="Edit">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <form action="{{ route('jenis.destroy', $item) }}" method="POST"
                                                style="display: inline;" class="delete-category">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-danger" title="Hapus">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
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
        $(document).ready(function() {
            $('.btn-detail').on('click', function(e) {
                e.preventDefault();

                var id = $(this).data('id');

                $('#modal-body-content').html('<p>Loading...</p>');
                $('#detailModal').modal('show');

                $.ajax({
                    url: url,
                    type: 'GET',
                    success: function(data) {
                        // Update the modal with returned HTML or JSON
                        $('#modal-body-content').html(data);
                    },
                    error: function() {
                        $('#modal-body-content').html(
                            '<p class="text-danger">Gagal memuat data.</p>');
                    }
                });
            });

            $('.delete-category').on('submit', function(e) {
                e.preventDefault();
                let form = $(this);
                let url = form.attr('action');

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
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            url: url,
                            type: 'POST',
                            data: form.serialize(),
                            success: function(response) {
                                if (response.status == 'success') {
                                    Swal.fire('Berhasil!', response.message, 'success');
                                    setTimeout(() => {
                                        location.reload();
                                    }, 1500);
                                } else {
                                    Swal.fire('Gagal!', response.message, 'error');
                                }
                            },
                            error: function(xhr) {
                                Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.',
                                    'error');
                            }
                        });
                    }
                });
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
