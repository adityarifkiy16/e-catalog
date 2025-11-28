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
                    <h2 class="card-title">Tambahkan Versi Katalog PDF</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('version.store') }}" method="POST" id="form-tambah">
                        @csrf

                        <div class="form-group">
                            <label class="mt-2"><i class="fas fa-tags"></i> Versi Katalog PDF</label>
                            <input type="text" class="form-control" name="version" id="version"
                                placeholder="Masukan Versi" value="{{ old('version') }}">
                            @error('version')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-tags"></i> Deskripsi</label>
                            <input type="text" class="form-control" name="description" id="description"
                                placeholder="Masukan Versi" value="{{ old('description') }}">
                            @error('description')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-2"><i class="fas fa-calendar"></i> Tanggal Update</label>
                            <input type="date" class="form-control" name="last_update" id="last_update"
                                value="{{ old('last_update') }}">
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
