@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Type', 'url' => route('type.index')],
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
                    <h2 class="card-title">Tambah Type</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('type.store') }}" method="POST" id="form-tambah" enctype="multipart/form-data">
                        @csrf
                        @method('POST')

                        <!-- Role Info -->
                        <div class="form-group">
                            <label><i class="fas fa-tags"></i> Nama Tipe</label>
                            <input type="text" class="form-control" name="name" placeholder="Masukkan Nama"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class="mt-3"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control" name="jenis_id" id="jenis_id">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}" {{ old('jenis_id') == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Thumbnail</label>
                        <input type="file" class="form-control" id="thumbnail" name="thumbnail" accept="image/*">
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Ukuran</label>
                        <input type="file" class="form-control" id="image" name="image" accept="image/*">

                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Mockup (slider)</label>
                        <div class="dropzone" id="image-dropzone">
                            <div class="dz-message">
                                <div style="font-size: 3rem; color: #bbb;">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <p class="font-weight-bold">Pilih file atau drag and drop</p>
                                <p class="text-muted">jpeg, webp, jpg hingga 2 MB.</p>
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

            const dz = new Dropzone("#image-dropzone", {
                url: "{{ route('type.store') }}",
                paramName: "mockups",
                maxFilesize: 2,
                acceptedFiles: "image/*",
                autoProcessQueue: false,
                parallelUploads: 5,
                uploadMultiple: true,
                maxFiles: 5,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("name", $('#name').val());
                        formData.append("jenis_id", $('#jenis_id').val());
                        formData.append('_method', 'POST');

                        let thumbnail = $('#thumbnail')[0].files[0];
                        if (thumbnail) formData.append("thumbnail", thumbnail);

                        let image = $('#image')[0].files[0];
                        if (image) formData.append("image", image);
                    });

                    this.on("successmultiple", function(files, response) {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        });
                        setTimeout(function() {
                            location.reload();
                        }, 3500);
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

            $("#form-tambah").on('submit', function(e) {
                e.preventDefault();
                console.log("submit");

                $("#btn-submit").prop('disabled', true).html(
                    '<span class="spinner-border spinner-border-sm mr-2"></span> Loading...'
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
                        contentType: false, // ⬅️ WAJIB
                        processData: false, // ⬅️ WAJIB
                        success: function(response) {
                            console.log(response);
                            if (response.status == "success") {
                                Toast.fire({
                                    icon: 'success',
                                    title: response.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(() => {
                                    location.reload();
                                }, 1500);
                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        },
                        error: function(response) {
                            if (response.status === 422) {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.responseJSON.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }
                    });
                }
            });
        });
    </script>
@endpush
