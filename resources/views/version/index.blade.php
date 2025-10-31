@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[['label' => 'Home', 'url' => route('dashboard')], ['label' => 'Setting']]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Pengaturan</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('settings.store') }}" method="POST" id="form-tambah">
                        @csrf

                        <div class="form-group">
                            <label class="mt-2"><i class="fas fa-tags"></i> Versi Katalog PDF</label>
                            <input type="text" class="form-control" name="version" id="version"
                                placeholder="Masukan Versi" value="{{ old('version', $setting->version ?? '') }}">
                            @error('version')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-tags"></i> Deskripsi</label>
                            <input type="text" class="form-control" name="version" id="version"
                                placeholder="Masukan Versi" value="{{ old('version', $setting->version ?? '') }}">
                            @error('version')
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
            $("#form-tambah").on('submit', function(e) {
                e.preventDefault();
                $("#btn-submit").prop('disabled', true);
                $("#btn-submit").html(
                    '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                );
                let form = $(this);
                let url = form.attr('action');
                let formData = new FormData(this);

                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: url,
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        console.log(response);
                        if (response.status == "success") {
                            Toast.fire({
                                icon: 'success',
                                title: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    },
                    error: function(response) {
                        if (response.status === 422) {
                            Toast.fire({
                                icon: 'error',
                                title: response.responseJSON.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
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
