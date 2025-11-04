@extends('layouts.app')

@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Versi', 'url' => route('version.index')],
            ['label' => 'Edit'],
        ]" />
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Edit Versi</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('version.update', $version) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Versi</label>
                            <input type="text" class="form-control" name="version" value="{{ $version->version }}"
                                id="version">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label><i class="fas fa-user"></i> Deskripsi</label>
                            <input type="text" class="form-control" name="description"
                                value="{{ $version->description }}" id="description">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <button class="btn btn-primary mt-3" type="submit" id="btn-submit">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        Dropzone.autoDiscover = false;
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        $(document).ready(function() {
            $("#form-edit").on('submit', function(e) {
                e.preventDefault();

                const formData = new FormData();
                formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
                formData.append('_method', 'PUT');
                formData.append("version", $('#version').val());
                formData.append("description", $('#description').val());

                $("#btn-submit").prop("disabled", true).html(
                    '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                );

                $.ajax({
                    url: "{{ route('version.update', $version) }}",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    method: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        if (response.status === "success") {
                            Toast.fire({
                                icon: 'success',
                                title: response.message
                            });
                            setTimeout(() => location.reload(), 1500);
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: response.message
                            });
                            setTimeout(() => location.reload(), 1500);
                        }
                    },
                    error: function(response) {
                        if (response.status === 422) {
                            Toast.fire({
                                icon: 'error',
                                title: response.responseJSON.message
                            });
                        }
                    }
                });
            });
        });
    </script>
    @if (session('success'))
        <script>
            $(document).ready(function() {
                Toast.fire({
                    icon: 'success',
                    title: "{{ session('success') }}",
                })
            });
        </script>
    @endif

    @if (session('error'))
        <script>
            $(document).ready(function() {
                Toast.fire({
                    icon: 'error',
                    title: "{{ session('error') }}",
                })
            });
        </script>
    @endif
@endpush
