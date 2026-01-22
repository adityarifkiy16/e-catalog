@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Upload Desain', 'url' => route('product-versions.bulk.create-motif')],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
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
                    <form action="{{ route('product-versions.bulk.store-motif') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="type"> <i class="fas fa-tag"></i> Motif / Mockup?</label>
                            <select class="form-control" name="type" id="type">
                                <option value="">Klik untuk memilih</option>
                                <option value="motif">Motif</option>
                                <option value="mockup">Mockup</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-tags"></i> Versi</label>
                            <select class="custom-select" name="version_id" id="version_id">
                                <option value="">Pilih Versi</option>
                                @foreach ($versions as $item)
                                    <option value="{{ $item->id }}">{{ $item->version }}</option>
                                @endforeach
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

                            <div class="py-1 mb-0 d-flex align-items-center" role="alert" style="border-radius: .5rem;">
                                <i class="fa fa-info-circle mr-2"></i>
                                <span class="font-italic">
                                    Anda dapat mengunggah lebih dari satu gambar motif/mockup. Sistem akan otomatis
                                    menyesuaikan gambar dengan produk berdasarkan kode yang diambil dari nama file yang anda
                                    unggah.
                                </span>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3" type="submit" id="btn-tambah">Kirim</button>
                        <a href="{{ route('product-versions.index') }}" class="btn btn-secondary mt-3">Kembali</a>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-danger">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="alertModalLabel">
                            <h4 class="fw-bold">
                                <i class="fas fa-info-circle me-2"></i> Perhatian!
                            </h4>
                        </h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger border-0 shadow-sm" role="alert">
                            <h6 class="font-weight-bold mb-2">
                                <i class="bi bi-info-circle me-1"></i> Informasi Penting
                            </h6>
                            <p class="mb-2">
                                Sistem akan <strong>secara otomatis mengambil kode produk</strong> dari
                                <strong>nama file gambar</strong> yang diunggah.
                            </p>
                            <div class="bg-light rounded p-3 mb-2">
                                <small>
                                    <i class="bi bi-file-earmark-image me-1 text-primary"></i>
                                    Contoh:
                                    <br>
                                    <code>MOCKUP ABC123.jpg</code>
                                    <br>→ kode produk: <strong>ABC123</strong>
                                    <br>→ kategori: <strong>Mockup</strong>
                                </small>
                            </div>
                            <p class="mb-0 text-white badge">
                                Pastikan setiap nama file terdapat kode produk yang terdaftar dalam sistem
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Mengerti</button>
                    </div>
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
            $('#alertModal').modal('show');
            new Dropzone("#image-dropzone", {
                url: "{{ route('product-versions.bulk.store-motif') }}",
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
                        formData.append("version_id", $('#version_id').val());
                    });

                    this.on("successmultiple", function(files, response) {
                        if (response.warning && response.warning.length > 0) {
                            toast.error(response.warning);
                        }

                        if (response.status == "success") {
                            toast.success(response.message);
                            setTimeout(function() {
                                window.location.href =
                                    "{{ route('product-versions.index') }}";
                            }, 1500);
                        } else {
                            toast.error(response.responseJSON.message);
                        }
                        this.removeAllFiles(true);
                    });

                    this.on("errormultiple", function(files, response) {
                        toast.error(response.message);
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
