@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Kategori', 'url' => route('categories.index')],
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
                    <h2 class="card-title">Tambah Kategori</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('categories.store') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')

                        <!-- Role Info -->
                        <div class="form-group">
                            <label><i class="fas fa-tags"></i> Nama</label>
                            <input type="text" class="form-control" name="name" placeholder="Masukkan Nama"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class=""><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control" name="jenis_id" id="jenis_id">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}" {{ old('jenis_id') == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> Type</label>
                        <select name="type_id" id="type_id" class="form-control">
                            <option value="">Pilih Type</option>
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> Tampilan Produk</label>
                        <select class="form-control" name="display_style" id="display_style">
                            <option value="">Pilih tampilan</option>
                            <option value="square">Persegi</option>
                            <option value="rectangle">Persegi panjang</option>
                        </select>
                        <label class="mt-3"><i class="fas fa-tags"></i> Order (Urutan)</label>
                        <input type="text" class="form-control" name="order" value="{{ old('order') }}"
                            id="order">
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
                        <button class="btn btn-primary mt-3" type="submit" id="btn-submit">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        Dropzone.autoDiscover = false;

        $(document).ready(function() {
            const dz = new Dropzone("#image-dropzone", {
                url: "{{ route('categories.store') }}",
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
                        formData.append('_method', 'POST');
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
                        toast.success(response.message);
                        window.location.href = "{{ route('categories.index') }}";
                    });

                    this.on("errormultiple", function(files, response) {
                        toast.error(response.message);
                        this.removeAllFiles(true);
                    });
                },
            });

            $('#jenis_id').on('change', function() {
                console.log("change");
                var jenisId = $(this).val();
                $('#type_id').html('<option value="">Pilih Type</option>');

                $.ajax({
                    url: "{{ url('types/by-jenis') }}/" + jenisId,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(data) {
                        if (data.length > 0) {
                            $('#type_id').prop('disabled', false);
                            $('#type_id').html(
                                '<option value="">Pilih Type</option>'); // reset type
                            $.each(data, function(key, item) {
                                $('#type_id').append('<option value="' + item.id +
                                    '">' + item.name + '</option>');
                            });
                        } else {
                            $('#type_id').prop('disabled', true);
                            $('#type_id').html(
                                '<option value="">Tidak ada type tersedia</option>');
                        }
                    }
                });
            });


            $("#form-tambah").on('submit', function(e) {
                e.preventDefault();
                console.log("submit");
                $("#btn-submit").prop('disabled', true).html(
                    '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                );

                if (dz.getAcceptedFiles().length > 0) {
                    dz.processQueue();
                } else {
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
                                $("#btn-submit").prop('disabled', false).html(
                                    'Kirim'
                                )
                            }
                        },
                        error: function(response) {
                            if (response.status === 422) {
                                toast.error(response.responseJSON.message);
                                $("#btn-submit").prop('disabled', false).html(
                                    'Kirim'
                                )
                            }
                        }
                    });
                }
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
