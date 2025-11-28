@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Paket', 'url' => route('package.index')],
            ['label' => 'Bulk Tambah'],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Bulk Upload Paket</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('products.store') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="name"><i class="fas fa-user"></i> Nama Paket</label>
                            <input type="text" class="form-control" name="name" placeholder="Masukkan Nama"
                                id="name">

                            <label for="order"><i class="fas fa-user-tag"></i> Urutan</label>
                            <select class="form-control select2" name="order" id="order">
                                <option value="">Pilih Urutan</option>
                                @for ($i = 1; $i <= 3; $i++)
                                    <option value="{{ $i }}">{{ $i }}</option>
                                @endfor
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
                                    Anda dapat mengunggah lebih dari satu gambar paket. Kode motif/produk akan
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
                                    <code>ABC123.jpg</code>
                                    <br>→ kode produk: <strong>ABC123</strong>
                                </small>
                            </div>
                            <p class="mb-0 text-white badge">
                                Pastikan setiap nama file terdapat kode produk yang terdaftar dalam sistem.
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
                url: "{{ route('package.store') }}",
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

                    // Send all required data with the file
                    this.on("sendingmultiple", function(file, xhr, formData) {
                        formData.append("name", $('#name').val());
                        formData.append("order", $('#order').val());
                    });

                    this.on("successmultiple", function(files, response) {
                        // Handle success response
                        if (response.warning && response.warning.length > 0) {
                            const warningList = `<ul style="text-align:left;">
                                                    ${response.warning.map(warning => `<li>${warning}</li>`).join('')}
                                                </ul>`;

                            Swal.fire({
                                icon: 'warning',
                                title: "Warning",
                                html: warningList, // pakai html biar list bisa ditampilkan
                                timer: 3000,
                                showConfirmButton: false,
                            });
                        }


                        if (response.status == "success") {
                            // Delay success message sedikit jika ada warning
                            const delay = response.warning && response.warning.length > 0 ?
                                2000 : 0;

                            setTimeout(() => {
                                toast.success(response.message);
                                setTimeout(function() {
                                    window.location.href =
                                        "{{ route('package.index') }}";
                                }, 1500);
                            }, delay);

                        } else {
                            toast.error(response.message);
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
                toat.error("{{ session('error') }}");
            });
        </script>
    @endif
@endpush
