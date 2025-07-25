@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'product', 'url' => route('products.index')],
            ['label' => 'Upload Files'],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-danger mt-2" role="alert">
                <i class="fas fa-exclamation-triangle mr-1"></i>
                <strong>Perhatian:</strong> Pastikan gambar anda menggunakan nama file dengan format "JENIS KODE
                PRODUK"<br>
                <i>contoh: <b>MOCKUP 3D 0001</b></i>
            </div>
            <div class="card card-secondary">
                <div class="card-header">
                    <h3 class="card-title">Upload Files</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-tool" data-card-widget="maximize">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>

                <div class="card-body">
                    <form action="{{ route('products.bulk.store') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="type"> <i class="fas fa-tag"></i> Tipe</label>
                            <select class="form-control" name="type" id="type">
                                <option value="">Pilih Tipe</option>
                                <option value="motif">Motif</option>
                                <option value="mockup">Mockup</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar</label>
                            <div class="dropzone" id="image-dropzone">
                                <div class="dz-message" id="dz-message">
                                    <div style="font-size: 3rem; color: #bbb;">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <p class="font-weight-bold">choose a file or drag and drop it here</p>
                                    <p class="text-muted">jpeg, webp, jpg up to 2 MB.</p>
                                </div>
                            </div>

                            @error('image')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            @if ($errors->has('image.*'))
                                @foreach ($errors->get('image.*') as $messages)
                                    @foreach ($messages as $msg)
                                        <span class="text-danger">{{ $msg }}</span><br>
                                    @endforeach
                                @endforeach
                            @endif
                        </div>
                        <button class="btn btn-primary mt-3" type="submit" id="btn-tambah">Kirim</button>
                        <a href="{{ route('products.index') }}" class="btn btn-secondary mt-3">Kembali</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        // Initialize Dropzone
        Dropzone.autoDiscover = false;
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


            new Dropzone("#image-dropzone", {
                url: "{{ route('products.bulk.store') }}",
                paramName: "image",
                maxFilesize: 2,
                acceptedFiles: "image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp",
                addRemoveLinks: false,
                autoProcessQueue: false,
                parallelUploads: 50,
                uploadMultiple: true,
                maxFiles: 50,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    const dz = this;
                    // When submit button is clicked
                    document.getElementById("btn-tambah").addEventListener("click",
                        function(e) {
                            $("#btn-tambah").prop('disabled', true);
                            $("#btn-tambah").html(
                                '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                            );
                            e.preventDefault();
                            e.stopPropagation();
                            dz.processQueue();
                        });

                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("type", $('#type').val());
                    });

                    this.on("successmultiple", function(files, response) {
                        if (response.warning && response.warning.length > 0) {
                            console.log(response.warning);
                            Toast.fire({
                                icon: 'warning',
                                title: response.warning,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }

                        if (response.status == "success") {
                            Toast.fire({
                                icon: 'success',
                                title: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(function() {
                                window.location.href = "{{ route('products.index') }}";
                            }, 1500);
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: response.responseJSON.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        this.removeAllFiles(true);
                    });

                    this.on("errormultiple", function(files, response) {
                        Toast.fire({
                            icon: 'error',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // Remove all failed files
                        files.forEach(file => {
                            this.removeFile(file);
                        });

                        $("#btn-tambah").prop('disabled', false);
                        $("#btn-tambah").html('Kirim');
                    });
                },
            });
        });
    </script>
@endpush
