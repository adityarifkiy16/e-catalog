@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'product', 'url' => route('products.index')],
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
                    <h2 class="card-title">Tambah Produk</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('products.store') }}" method="POST" id="form-tambah"
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
                url: "{{ route('products.store') }}",
                paramName: "image", // matches your backend expectation
                maxFilesize: 2, // MB
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
                    // When submit button is clicked
                    document.getElementById("btn-tambah").addEventListener("click",
                        function(e) {
                            $("#btn-tambah").prop('disabled', true);
                            $("#btn-tambah").html(
                                '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                            );
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("submit");
                            console.log(`category_id: ${$('#category_id').val()}`);
                            const categoryId = $('#category_id').val();
                            if (!categoryId) {
                                Toast.fire({
                                    icon: 'warning',
                                    title: 'Silahkan Pilih Kategori Dahulu',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                $("#btn-tambah").prop('disabled', false);
                                $("#btn-tambah").html('Kirim');
                                return;
                            }

                            // Process the queue
                            dz.processQueue();
                        });

                    // Send all required data with the file
                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("category_id", $('#category_id').val());
                    });

                    this.on("successmultiple", function(files, response) {
                        // Handle success response
                        if (response.warning && response.warning.length > 0) {
                            let warningMessage = '';
                            if (Array.isArray(response.warning)) {
                                warningMessage =
                                    '<ul style="text-align: left; margin-left: 20px;">';
                                response.warning.forEach(function(item) {
                                    warningMessage += '<li>' + item + '</li>';
                                });
                                warningMessage += '</ul>';
                            }
                            Toast.fire({
                                icon: 'warning',
                                title: "Warning",
                                html: warningMessage,
                                timer: 3000,
                                showConfirmButton: false,
                            });
                            setTimeout(function() {
                                window.location.href = "{{ route('products.index') }}";
                            }, 3000);
                        } else if (response.status == "success") {
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
                            title: response,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        files.forEach(file => {
                            this.removeFile(file);
                        });
                    });
                },
            });
        });
    </script>
@endpush
