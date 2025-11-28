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
                            <label class="mt-2"><i class="fas fa-envelope"></i> Email</label>
                            <input type="text" class="form-control" name="email" placeholder="Masukkan Email"
                                value="{{ old('email', $setting->email ?? '') }}">
                            @error('email')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-phone"></i> Phone</label>
                            <input type="text" class="form-control" name="phone" id="phone"
                                placeholder="Masukan Phone" value="{{ old('phone', $setting->phone ?? '') }}">
                            @error('phone')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-map-pin"></i> Alamat</label>
                            <input type="text" class="form-control" name="address" id="address"
                                placeholder="Masukan Alamat" value="{{ old('address', $setting->address ?? '') }}">
                            @error('address')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-tags"></i> Versi Website</label>
                            <input type="text" class="form-control" name="version" id="version"
                                placeholder="Masukan Versi" value="{{ old('version', $setting->version ?? '') }}">
                            @error('version')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-calendar"></i> Tanggal Update</label>
                            <input type="date" class="form-control" name="last_update" id="last_update"
                                value="{{ old('last_update', $setting->last_update ?? '') }}">
                            @error('last_update')
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
                            toast.success(response.message);
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                        } else {
                            toast.error(response.message);
                            $("#btn-submit").prop('disabled', false).html('Kirim');
                        }
                    },
                    error: function(response) {
                        if (response.status === 422) {
                            toast.error(response.responseJSON.message);
                            $("#btn-submit").prop('disabled', false).html('Kirim');
                        }
                    }
                });
            });
        });
    </script>
    @if (session('success'))
        <script>
            $(document).ready(function() {
                toast.success("{{ session('success') }}");
            });
        </script>
    @endif

    @if (session('error'))
        <script>
            $(document).ready(function() {
                toast.error("{{ session('error') }}");
            });
        </script>
    @endif
@endpush
