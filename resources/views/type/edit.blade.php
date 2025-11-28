@extends('layouts.app')

@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Type', 'url' => route('type.index')],
            ['label' => 'Edit'],
        ]" />
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Edit Type</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('type.update', $type) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nama Tipe</label>
                            <input type="text" class="form-control" name="name" value="{{ $type->name }}"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <label class="mt-3"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control" name="jenis_id" id="jenis_id">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}"
                                    {{ old('jenis_id', $type->jenis_id) == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>

                        <label class="mt-3"><i class="fas fa-image"></i> Upload Thumbnail</label>
                        <input type="file" class="form-control" id="thumbnail" name="thumbnail" accept="image/*">

                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Ukuran</label>
                        <input type="file" class="form-control" id="image" name="image" accept="image/*">

                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar Mockup</label>
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
            const dz = new Dropzone("#image-dropzone", {
                url: "{{ route('type.update', $type) }}",
                paramName: "mockups",
                maxFilesize: 2,
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                autoProcessQueue: false,
                parallelUploads: 5,
                uploadMultiple: true,
                maxFiles: 5,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                init: function() {
                    const dropzoneInstance = this;
                    dropzoneInstance.existingImageIds = [];

                    @if ($type->images)
                        @foreach ($type->images as $image)
                            {
                                let mockFile = {
                                    name: "{{ basename($image->path) }}",
                                    size: {{ $image->size ?? 123456 }},
                                    type: 'image/webp',
                                    existing: true,
                                    imageId: {{ $image->id }}
                                };

                                dropzoneInstance.emit("addedfile", mockFile);
                                dropzoneInstance.emit("thumbnail", mockFile,
                                    "{{ asset('storage/' . $image->path) }}");
                                dropzoneInstance.emit("complete", mockFile);
                                dropzoneInstance.files.push(mockFile);
                                dropzoneInstance.existingImageIds.push({{ $image->id }});
                            }
                        @endforeach
                    @endif

                    dropzoneInstance.on("removedfile", function(file) {
                        if (file.existing && file.imageId) {
                            const index = dropzoneInstance.existingImageIds.indexOf(file
                                .imageId);
                            if (index > -1) {
                                dropzoneInstance.existingImageIds.splice(index, 1);
                            }
                        }
                    });
                    dropzoneInstance.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("name", $('#name').val());
                        formData.append("jenis_id", $('#jenis_id').val());
                        formData.append('_method', 'PUT');
                        formData.append("existing_images", JSON.stringify(dropzoneInstance
                            .existingImageIds));

                        let thumbnail = $('#thumbnail')[0].files[0];
                        if (thumbnail) formData.append("thumbnail", thumbnail);

                        let image = $('#image')[0].files[0];
                        if (image) formData.append("image", image);
                    });

                    dropzoneInstance.on("successmultiple", function(files, response) {
                        toast.success(response.message);
                        setTimeout(function() {
                            window.location.href = "{{ route('type.index') }}";
                        }, 1500);
                    });

                    dropzoneInstance.on("errormultiple", function(files, response) {
                        toast.error(response.message);
                        dropzoneInstance.removeAllFiles(true);
                    });
                },
            });

            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                $("#btn-submit").prop('disabled', true).html(
                    '<span class="spinner-border spinner-border-sm mr-2"></span> Loading...'
                );

                const hasNewDropzoneFiles = dz.getAcceptedFiles().length > 0;

                if (hasNewDropzoneFiles) {
                    dz.processQueue();
                } else {
                    const formData = new FormData();
                    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
                    formData.append('_method', 'PUT');
                    formData.append("name", $('#name').val());
                    formData.append("jenis_id", $('#jenis_id').val());
                    formData.append("existing_images", JSON.stringify(dz.existingImageIds || []));

                    let thumbnail = $('#thumbnail')[0].files[0];
                    if (thumbnail) formData.append("thumbnail", thumbnail);

                    let image = $('#image')[0].files[0];
                    if (image) formData.append("image", image);

                    $("#btn-submit").prop("disabled", true).html(
                        '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                    );

                    $.ajax({
                        url: "{{ route('type.update', $type) }}",
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            if (response.status === "success") {
                                toast.success(response.message);
                                setTimeout(() => location.reload(), 1500);
                            } else {
                                toast.error(response.message);
                                setTimeout(() => location.reload(), 1500);
                            }
                        },
                        error: function(response) {
                            if (response.status === 422) {
                                toast.error(response.responseJSON.message);
                                setTimeout(() => location.reload(), 1500);
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
