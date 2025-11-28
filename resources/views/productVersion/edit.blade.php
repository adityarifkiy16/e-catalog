@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Product', 'url' => route('product-versions.index')],
            ['label' => 'Edit'],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Edit Versi Produk</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('product-versions.update', $productVersion) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">

                            <label class="mt-3"><i class="fas fa-code"></i> Nama</label>
                            <input type="text" class="form-control" name="name"
                                value="{{ old('name', $productVersion->name) }}" placeholder="Nama Produk">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-image"></i> Upload gambar utama (Thumbnail)</label>
                            <input type="file" class="form-control" id="img" name="image" accept="image/*"
                                multiple>


                            <label class="mt-3"><i class="fas fa-image"></i> Upload gambar ke 2 (Motif)</label>
                            <input type="file" class="form-control" id="img-motif" name="image-motif" accept="image/*">

                            <label class="mt-3"><i class="fas fa-image"></i> Upload gambar ke 3 (Mockup)</label>
                            <input type="file" class="form-control" id="img-mockup" name="image-mockup[]"
                                accept="image/*" multiple>

                            <label class="mt-3"><i class="fas fa-tag"></i> Version</label>
                            <select class="form-control" name="version_id" id="version_id">
                                <option value="">Pilih Versi</option>
                                @foreach ($versions as $item)
                                    <option value="{{ $item->id }}"
                                        {{ old('version_id', $productVersion->version_id) == $item->id ? 'selected' : '' }}>
                                        {{ $item->version }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <button class="btn btn-primary mt-3" id="btn-submit" type="submit">Kirim</button>
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
            // === HANDLE SUBMIT FORM ===
            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                $("#btn-submit").prop('disabled', true).html(
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
                        if (response.status === "success") {
                            toast.success(response.message);
                            setTimeout(() => location.reload(), 1500);
                        } else {
                            toast.error(response.message || 'terjadi kesalahan');
                            $("#btn-submit").prop('disabled', false).html('Kirim');
                        }
                    },
                    error: function(response) {
                        toast.error(response.responseJSON.message || 'terjadi kesalahan');
                        $("#btn-submit").prop('disabled', false).html('Kirim');
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
