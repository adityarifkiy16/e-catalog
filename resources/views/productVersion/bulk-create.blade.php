@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'product', 'url' => route('product-versions.index')],
            ['label' => 'Tambah'],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Tambah Produk Versi</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('product-versions.store.bulk') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label class="mt-3"><i class="fas fa-tags"></i> Jenis</label>
                            <select class="custom-select" name="jenis" id="jenis">
                                <option value="">Pilih Jenis</option>
                                @foreach ($jenis as $item)
                                    <option value="{{ $item->id }}"
                                        {{ old('jenis', request()->query('jenis')) == $item->id ? 'selected' : '' }}>
                                        {{ $item->name }}
                                    </option>
                                @endforeach
                            </select>

                            <label class="mt-3 type"><i class="fas fa-tags"></i> Type</label>
                            <select class="custom-select type" name="type_id" id="type_id">
                                <option value="">Pilih type</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-tags"></i> Kategori</label>
                            <select class="custom-select" name="category_id" id="category_id">
                                <option value="">Silahkan Pilih Jenis dahulu</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-tags"></i> Versi</label>
                            <select class="custom-select" name="version_id" id="version_id">
                                <option value="">Pilih Versi</option>
                                @foreach ($versions as $item)
                                    <option value="{{ $item->id }}">{{ $item->version }}</option>
                                @endforeach
                            </select>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Produk</label>
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
                                    Anda dapat mengunggah lebih dari satu gambar motif/produk. Kode motif/produk akan
                                    otomatis diambil dari nama file gambar yang diunggah.
                                </span>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3" type="submit" id="btn-tambah">Kirim</button>
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
                                    <code>ABC123.jpg</code> → kode produk: <strong>ABC123</strong>
                                </small>
                            </div>
                            <p class="mb-0 text-white badge">
                                Pastikan setiap nama file gambar bersifat <u>unik</u> agar tidak terjadi duplikasi data.
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

            $('#jenis').on('change', function() {
                console.log("change jenis");
                var jenisId = $(this).val();
                let type = $('.type');

                $.ajax({
                    url: "{{ url('types/by-jenis') }}/" + jenisId,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(data) {
                        if (data.length > 0) {
                            type.show();
                            $('#type_id').prop('disabled', false);
                            $('#type_id').html('<option value="">Pilih Type</option>');
                            $.each(data, function(key, item) {
                                $('#type_id').append('<option value="' + item.id +
                                    '">' + item.name + '</option>');
                            });

                            // kosongkan kategori saat jenis berubah
                            $('#category_id').prop('disabled', true).html(
                                '<option value="">Pilih Kategori</option>');
                        } else {
                            type.hide();
                            $('#type_id').prop('disabled', true).html(
                                '<option value="">Tidak ada type</option>');

                            // langsung ambil kategori berdasarkan jenis
                            loadCategoryByJenis(jenisId);
                        }
                    }
                });
            });

            $('#type_id').on('change', function() {
                console.log("change type");
                var typeId = $(this).val();
                var jenisId = $('#jenis').val();

                if (typeId) {
                    // ambil kategori berdasarkan type
                    $.ajax({
                        url: "{{ url('categories/by-type') }}/" + typeId,
                        type: 'GET',
                        data: {
                            type_id: typeId
                        },
                        success: function(data) {
                            if (data.length > 0) {
                                $('#category_id').prop('disabled', false).html(
                                    '<option value="">Pilih Kategori</option>');
                                $.each(data, function(key, item) {
                                    $('#category_id').append('<option value="' + item
                                        .id + '">' + item.name + '</option>');
                                });
                            } else {
                                $('#category_id').prop('disabled', true).html(
                                    '<option value="">Tidak ada kategori tersedia</option>');
                            }
                        }
                    });
                } else {
                    // kalau type tidak dipilih → ambil kategori berdasarkan jenis
                    loadCategoryByJenis(jenisId);
                }
            });

            // fungsi bantu untuk ambil kategori by jenis
            function loadCategoryByJenis(jenisId) {
                $.ajax({
                    url: "{{ url('categories/by-jenis') }}/" + jenisId,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(data) {
                        if (data.length > 0) {
                            $('#category_id').prop('disabled', false).html(
                                '<option value="">Pilih Kategori</option>');
                            $.each(data, function(key, item) {
                                $('#category_id').append('<option value="' + item.id + '">' +
                                    item.name + '</option>');
                            });
                        } else {
                            $('#category_id').prop('disabled', true).html(
                                '<option value="">Tidak ada kategori tersedia</option>');
                        }
                    }
                });
            }


            new Dropzone("#image-dropzone", {
                url: "{{ route('product-versions.store.bulk') }}",
                paramName: "image", // matches your backend expectation
                maxFilesize: 10, // MB
                acceptedFiles: "image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp",
                addRemoveLinks: false,
                autoProcessQueue: false, // important for manual submit
                parallelUploads: 50,
                uploadMultiple: true, // send all files in one request
                maxFiles: 50,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    const dz = this;
                    document.getElementById("btn-tambah").addEventListener("click",
                        function(e) {
                            $("#btn-tambah").prop('disabled', true);
                            $("#btn-tambah").html(
                                '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                            );
                            e.preventDefault();
                            e.stopPropagation();
                            const categoryId = $('#category_id').val();
                            const versionId = $('#version_id').val();
                            if (!categoryId || !versionId) {
                                toast.error('Kategori dan Versi wajib diisi.');
                                $("#btn-tambah").prop('disabled', false);
                                $("#btn-tambah").html('Kirim');
                                return;
                            }
                            dz.processQueue();
                        });

                    // Send all required data with the file
                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("category_id", $('#category_id').val());
                        formData.append("version", $('#version_id').val());
                    });

                    this.on("successmultiple", function(files, response) {
                        // Handle success response
                        if (response.warning && response.warning.length > 0) {
                            let warningMessage = '';

                            if (Array.isArray(response.warning) && response.warning.length >
                                0) {
                                warningMessage +=
                                    '<strong>Produk berikut sudah ada:</strong><br>';
                                warningMessage +=
                                    '<div style="text-align:left; margin-top:4px;">';

                                response.warning.forEach(item => {
                                    warningMessage += `• ${item}<br>`;
                                });

                                warningMessage += '</div>';
                            }
                            toast.error(warningMessage);
                            $("#btn-tambah").prop('disabled', false);
                            $("#btn-tambah").html('Kirim');
                        } else if (response.status == "success") {
                            toast.success(response.message);
                            $("#btn-tambah").prop('disabled', false);
                            $("#btn-tambah").html('Kirim');
                        } else {
                            toast.error(response.responseJSON.message);
                            $("#btn-tambah").prop('disabled', false);
                            $("#btn-tambah").html('Kirim');
                        }
                        this.removeAllFiles(true);
                    });

                    this.on("errormultiple", function(files, response) {
                        toast.error(response.message);
                        files.forEach(file => {
                            this.removeFile(file);
                        });
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
