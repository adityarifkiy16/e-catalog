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


                            <label class="mt-3"><i class="fas fa-tags"></i> Kategori</label>
                            <select class="custom-select" name="category_id" id="category_id">
                                <option value="">Silahkan Pilih Jenis dahulu</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar</label>
                            <div class="dropzone" id="image-dropzone"></div>

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

            $("#jenis").on('change', function() {
                let jenisId = $(this).val();
                if (jenisId) {
                    $.ajax({
                        url: "{{ route('products.getCategories') }}",
                        type: 'GET',
                        data: {
                            jenis_id: jenisId
                        },
                        success: function(response) {
                            let categorySelect = $('select[name="category_id"]');
                            categorySelect.empty();
                            categorySelect.append('<option value="">Pilih Kategori</option>');
                            $.each(response, function(index, category) {
                                categorySelect.append(
                                    `<option value="${category.id}">${category.name}</option>`
                                );
                            });
                        },
                        error: function(xhr) {
                            console.error(xhr);
                        }
                    });
                } else {
                    $('select[name="category_id"]').empty().append(
                        '<option value="">Pilih Kategori</option>');
                }
            });


            new Dropzone("#image-dropzone", {
                url: "{{ route('products.store') }}",
                paramName: "image", // matches your backend expectation
                maxFilesize: 2, // MB
                acceptedFiles: "image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp",
                addRemoveLinks: false,
                autoProcessQueue: false, // important for manual submit
                parallelUploads: 10,
                uploadMultiple: true, // send all files in one request
                maxFiles: 10,
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
                                window.location.href = "{{ route('product.index') }}";
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
                        // Remove all failed files
                        files.forEach(file => {
                            this.removeFile(file);
                        });
                    });
                },
            });
        });
    </script>
@endpush
