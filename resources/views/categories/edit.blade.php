@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'categories', 'url' => route('categories.index')],
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
                    <h2 class="card-title">Edit Category</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('categories.update', $categories) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Name</label>
                            <input type="text" class="form-control" name="name" value="{{ $categories->name }}"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class="mt-3"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control" name="jenis_id" id="jenis">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}"
                                    {{ old('jenis_id', $categories->jenis_id) == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> tampilan</label>
                        <select class="form-control" name="display_style" id="display_style">
                            <option value="">Pilih tampilan</option>
                            <option value="square"
                                {{ old('display_style', $categories->display_style) == 'square' ? 'selected' : '' }}>Persegi
                            </option>
                            <option value="rectangle"
                                {{ old('display_style', $categories->display_style) == 'rectangle' ? 'selected' : '' }}>
                                Persegi panjang</option>
                        </select>
                        <label class="mt-3"><i class="fas fa-tags"></i> Order</label>
                        <input type="text" class="form-control" name="order"
                            value="{{ old('order', $categories->order) }}" id="order">
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar 3D</label>
                        <input type="file" class="form-control" id="img" name="image" accept="image/*">
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Mockup</label>
                        <div class="dropzone" id="image-dropzone">
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
                url: "{{ route('categories.update', $categories) }}",
                paramName: "image-mockup",
                maxFilesize: 2,
                acceptedFiles: "image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp",
                addRemoveLinks: false,
                autoProcessQueue: false,
                parallelUploads: 5,
                uploadMultiple: true,
                maxFiles: 5,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    const dz = this;
                    // When submit button is clicked
                    document.getElementById("btn-submit").addEventListener("click",
                        function(e) {
                            $("#btn-submit").prop('disabled', true);
                            $("#btn-submit").html(
                                '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                            );
                            e.preventDefault();
                            e.stopPropagation();
                            dz.processQueue();
                        });

                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("name", $('#name').val());
                        formData.append('_method', 'PUT'); // jika pakai route update
                        formData.append("jenis_id", $('#jenis').val());
                        formData.append("display_style", $('#display_style').val());
                        formData.append("order", $('#order').val());
                        formData.append("image", $('#img')[0].files[0]);
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
                                window.location.href =
                                    "{{ route('categories.index') }}";
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
