@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Paket', 'url' => route('package.index')],
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
                    <h2 class="card-title">Edit Paket</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('package.update', $package) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nama</label>
                            <input type="text" class="form-control" name="name" value="{{ $package->name }}"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class="mt-1"><i class="fas fa-user-tag"></i> Produk</label>
                        <select class="form-control select2" name="product_id" id="product_id">
                            <option value="">Pilih Produk</option>
                            @foreach ($products as $item)
                                <option value="{{ $item->id }}"
                                    {{ old('jenis_id', $package->product_id) == $item->id ? 'selected' : '' }}>
                                    {{ $item->code }} - {{ $item->category->name }}
                                </option>
                            @endforeach
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Paket</label>
                        <div class="dropzone" id="image">
                            <div class="dz-message" id="dz-message">
                                <div style="font-size: 3rem; color: #bbb;">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <p class="font-weight-bold">choose a file or drag and drop it here</p>
                                <p class="text-muted">jpeg, webp, jpg up to 2 MB.</p>
                            </div>
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
        Dropzone.autoDiscover = false;

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        $(document).ready(function() {
            const dz = new Dropzone("#image", {
                url: "{{ route('package.update', $package) }}",
                paramName: "image",
                maxFilesize: 2,
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                autoProcessQueue: false,
                parallelUploads: 1,
                uploadMultiple: false,
                maxFiles: 1,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    this.on("sending", function(file, xhr, formData) {
                        formData.append("name", $('#name').val());
                        formData.append('_method', 'PUT');
                        formData.append("product_id", $('#product_id').val());
                    });

                    this.on("success", function(files, response) {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        });
                        setTimeout(function() {
                            window.location.href = "{{ route('package.index') }}";
                        }, 3000);
                    });

                    this.on("error", function(files, response) {
                        Toast.fire({
                            icon: 'error',
                            title: response.message
                        });
                        this.removeAllFiles(true);
                    });
                },
            });

            // ✅ Jika tidak ada file di Dropzone, jalankan AJAX biasa
            $("#btn-submit").on("click", function(e) {
                e.preventDefault();

                const hasDropzoneFiles = dz.getAcceptedFiles().length > 0;

                if (hasDropzoneFiles) {
                    dz.processQueue(); // Proses Dropzone
                } else {
                    // Proses AJAX manual
                    const formData = new FormData();
                    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
                    formData.append('_method', 'PUT');
                    formData.append("name", $('#name').val());
                    formData.append("product_id", $('#product_id').val());

                    $("#btn-submit").prop("disabled", true).html(
                        '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                    );

                    $.ajax({
                        url: "{{ route('package.update', $package) }}",
                        method: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            Toast.fire({
                                icon: 'success',
                                title: response.message
                            });
                            setTimeout(() => {
                                window.location.href =
                                    "{{ route('package.index') }}";
                            }, 1500);
                        },
                        error: function(xhr) {
                            Toast.fire({
                                icon: 'error',
                                title: xhr.responseJSON?.message || 'Terjadi kesalahan.'
                            });
                            $("#btn-submit").prop("disabled", false).html("Submit");
                        }
                    });
                }
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
