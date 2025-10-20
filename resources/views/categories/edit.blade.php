@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Kategori', 'url' => route('categories.index')],
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
                    <h2 class="card-title">Edit Kategori</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('categories.update', $categories) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nama Kategori</label>
                            <input type="text" class="form-control" name="name" value="{{ $categories->name }}"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class="mt-3"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select id="jenis_id" name="jenis_id" class="form-control">
                            @foreach ($jenis as $j)
                                <option value="{{ $j->id }}" {{ $categories->jenis_id == $j->id ? 'selected' : '' }}>
                                    {{ $j->name }}
                                </option>
                            @endforeach
                        </select>
                        <label class="mt-3"><i class="fas fa-user-tag"></i> Type</label>
                        <select id="type_id" name="type_id" class="form-control">
                            @foreach ($types as $t)
                                <option value="{{ $t->id }}" {{ $categories->type_id == $t->id ? 'selected' : '' }}>
                                    {{ $t->name }}
                                </option>
                            @endforeach
                        </select>

                        <label class="mt-3"><i class="fas fa-image"></i> Tampilan Produk</label>
                        <select class="form-control" name="display_style" id="display_style">
                            <option value="">Pilih tampilan</option>
                            <option value="square"
                                {{ old('display_style', $categories->display_style) == 'square' ? 'selected' : '' }}>Persegi
                            </option>
                            <option value="rectangle"
                                {{ old('display_style', $categories->display_style) == 'rectangle' ? 'selected' : '' }}>
                                Persegi panjang</option>
                        </select>
                        <label class="mt-3"><i class="fas fa-tags"></i> Order (Urutan)</label>
                        <input type="text" class="form-control" name="order"
                            value="{{ old('order', $categories->order) }}" id="order">
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar 3D (Menu)</label>
                        <input type="file" class="form-control" id="img" name="image" accept="image/*">
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Mockup (Slider)</label>
                        <div class="dropzone" id="image-dropzone">
                            <div class="dz-message" id="dz-message">
                                <div style="font-size: 3rem; color: #bbb;">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <p class="font-weight-bold">choose a file or drag and drop it here</p>
                                <p class="text-muted">jpeg, webp, jpg up to 2 MB.</p>
                                <p class="text-muted">Max 10 files</p>
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
            $('#jenis_id').on('change', function() {
                var jenisId = $(this).val();

                $('#type_id').html('<option value="">Pilih Type</option>'); // reset type

                if (jenisId) {
                    $.ajax({
                        url: "{{ url('types/by-jenis') }}/" + jenisId,
                        type: 'GET',
                        success: function(data) {
                            if (data.length > 0) {
                                $.each(data, function(key, item) {
                                    $('#type_id').append('<option value="' + item.id +
                                        '">' + item.name + '</option>');
                                });
                            } else {
                                $('#type_id').append(
                                    '<option value="">Tidak ada type tersedia</option>');
                            }
                        }
                    });
                }
            });

            // Trigger saat halaman edit dibuka
            let selectedJenis = $('#jenis_id').val();
            let selectedType = '{{ old('type_id', $categories->type_id) }}';
            $('#type_id').html('<option value="">Pilih Type</option>'); // reset type

            if (selectedJenis) {
                $.ajax({
                    url: "{{ url('types/by-jenis') }}/" + selectedJenis,
                    type: 'GET',
                    success: function(data) {
                        if (data.length > 0) {
                            $.each(data, function(key, item) {
                                let selected = (item.id == selectedType) ? 'selected' : '';
                                $('#type_id').append('<option value="' + item.id + '" ' +
                                    selected + '>' + item.name + '</option>');
                            });
                        } else {
                            $('#type_id').append('<option value="">Tidak ada type tersedia</option>');
                        }
                    }
                });
            }


            const dz = new Dropzone("#image-dropzone", {
                url: "{{ route('categories.update', $categories) }}",
                paramName: "image-mockup",
                maxFilesize: 2,
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                autoProcessQueue: false,
                parallelUploads: 10,
                uploadMultiple: true,
                maxFiles: 10,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("name", $('#name').val());
                        formData.append('_method', 'PUT');
                        formData.append("jenis_id", $('#jenis_id').val());
                        formData.append("type_id", $('#type_id').val());
                        formData.append("display_style", $('#display_style').val());
                        formData.append("order", $('#order').val());

                        const imageInput = $('#img')[0].files[0];
                        if (imageInput) {
                            formData.append("image", imageInput);
                        }
                    });

                    this.on("successmultiple", function(files, response) {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        });
                        window.location.href = "{{ route('categories.index') }}";
                    });

                    this.on("errormultiple", function(files, response) {
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
                    formData.append("jenis_id", $('#jenis_id').val());
                    formData.append("type_id", $('#type_id').val());
                    formData.append("display_style", $('#display_style').val());
                    formData.append("order", $('#order').val());

                    const imageFile = $('#img')[0].files[0];
                    if (imageFile) {
                        formData.append("image", imageFile);
                    }

                    $("#btn-submit").prop("disabled", true).html(
                        '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                    );

                    $.ajax({
                        url: "{{ route('categories.update', $categories) }}",
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
                                    "{{ route('categories.index') }}";
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
