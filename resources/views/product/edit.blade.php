@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Product', 'url' => route('products.index')],
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
                    <h2 class="card-title">Edit Product</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('products.update', $product) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label class="mt-3"><i class="fas fa-code"></i> Kode Barang</label>
                            <input type="text" class="form-control" name="code"
                                value="{{ old('code', $product->code) }}" placeholder="Kode Produk">
                            @error('code')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-code"></i> Nama</label>
                            <input type="text" class="form-control" name="name"
                                value="{{ old('name', $product->name) }}" placeholder="Nama Produk">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-tags"></i> Tambah Spesifikasi</label>
                            <div id="variant-wrapper" class="d-flex flex-column">
                                @if ($specifications->count())
                                    @foreach ($specifications as $index => $spec)
                                        <div class="input-group mb-2 variant-row">
                                            <input type="text" name="specifications[{{ $index }}][name]"
                                                class="form-control" placeholder="Nama Spesifikasi"
                                                value="{{ old("specifications.$index.name", $spec->specification_name) }}">
                                            <input type="text" name="specifications[{{ $index }}][value]"
                                                class="form-control ml-2" placeholder="Nilai Spesifikasi"
                                                value="{{ old("specifications.$index.value", $spec->specification_value) }}">
                                            <input type="text" name="specifications[{{ $index }}][unit]"
                                                class="form-control ml-2" placeholder="Satuan Spesifikasi"
                                                value="{{ old("specifications.$index.unit", $spec->specification_unit) }}">
                                            <button type="button" class="btn btn-danger btn-remove ml-2">X</button>
                                        </div>
                                    @endforeach
                                @else
                                    {{-- default 1 row kosong kalau belum ada data --}}
                                    <div class="input-group mb-2 variant-row">
                                        <input type="text" name="specifications[0][name]" class="form-control"
                                            placeholder="Nama Spesifikasi">
                                        <input type="text" name="specifications[0][value]" class="form-control ml-2"
                                            placeholder="Nilai Spesifikasi">
                                        <input type="text" name="specifications[0][unit]" class="form-control ml-2"
                                            placeholder="Satuan Spesifikasi">
                                        <button type="button" class="btn btn-danger btn-remove ml-2">X</button>
                                    </div>
                                @endif
                            </div>

                            <button type="button" class="btn btn-success btn-sm w-100" id="add-variant">
                                <i class="fas fa-plus"></i> Tambah Spesifikasi
                            </button>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload gambar utama (Thumbnail)</label>
                            <input type="file" class="form-control" id="img" name="image" accept="image/*"
                                multiple>


                            <label class="mt-3"><i class="fas fa-image"></i> Upload gambar ke 2 (Motif)</label>
                            <input type="file" class="form-control" id="img-motif" name="image-motif" accept="image/*">

                            <label class="mt-3"><i class="fas fa-image"></i> Upload gambar ke 3 (Mockup)</label>
                            <input type="file" class="form-control" id="img-mockup" name="image-mockup[]"
                                accept="image/*" multiple>


                            <label class="mt-3"><i class="fas fa-tag"></i> Jenis</label>
                            <select class="form-control" name="jenis_id" id="jenis_id">
                                <option value="">Pilih Jenis</option>
                                @foreach ($jenises as $item)
                                    <option value="{{ $item->id }}"
                                        {{ old('jenis_id', $product->category->jenis_id) == $item->id ? 'selected' : '' }}>
                                        {{ $item->name }}
                                    </option>
                                @endforeach
                            </select>

                            <label class="mt-3"><i class="fas fa-tag"></i> Type</label>
                            <select class="form-control" name="type_id" id="type_id">
                                <option value="">Pilih Type</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-tag"></i> Kategori</label>
                            <select class="form-control" name="category_id" id="category_id">
                                <option value="">Pilih Kategori</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-video"></i> url video</label>
                            <input type="text" class="form-control" name="url_video" placeholder="Masukan url video"
                                value="{{ old('video', $product->url_video) }}">
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

        $(document).ready(function() {
            let specificationIndex = $('#variant-wrapper .variant-row').length;

            // Jalankan load awal (saat edit)
            setTimeout(initialLoad, 200);

            // Tambah baris spesifikasi
            $('#add-variant').on('click', function() {
                let newRow = `
                <div class="input-group mb-2 variant-row">
                    <input type="text" name="specifications[${specificationIndex}][name]" class="form-control" placeholder="Nama Spesifikasi">
                    <input type="text" name="specifications[${specificationIndex}][value]" class="form-control ml-2" placeholder="Nilai Spesifikasi">
                    <input type="text" name="specifications[${specificationIndex}][unit]" class="form-control ml-2" placeholder="Satuan Spesifikasi">
                    <button type="button" class="btn btn-danger btn-remove ml-2">X</button>
                </div>
            `;
                $('#variant-wrapper').append(newRow);
                specificationIndex++;
            });

            // Hapus baris spesifikasi
            $(document).on('click', '.btn-remove', function() {
                $(this).closest('.variant-row').remove();
            });

            // === EVENT KETIKA GANTI JENIS ===
            $('#jenis_id').on('change', function() {
                const jenisId = $(this).val();
                const $typeSelect = $('#type_id');
                const $categorySelect = $('#category_id');

                if (!jenisId) return;

                $.ajax({
                    url: "{{ url('types/by-jenis') }}/" + jenisId,
                    type: 'GET',
                    success: function(data) {
                        if (data.length > 0) {
                            $typeSelect.prop('disabled', false)
                                .html('<option value="">Pilih Type</option>');
                            $.each(data, function(_, item) {
                                $typeSelect.append(
                                    `<option value="${item.id}">${item.name}</option>`
                                );
                            });
                            // Reset kategori
                            $categorySelect.prop('disabled', true)
                                .html('<option value="">Pilih Kategori</option>');
                        } else {
                            // Jika jenis tidak punya type, langsung load kategori berdasarkan jenis
                            $typeSelect.prop('disabled', true)
                                .html('<option value="">Tidak ada type</option>');
                            loadCategoryByJenis(jenisId);
                        }
                    }
                });
            });

            // === EVENT KETIKA GANTI TYPE ===
            $('#type_id').on('change', function() {
                const typeId = $(this).val();
                const jenisId = $('#jenis_id').val();

                if (typeId) {
                    loadCategoryByType(typeId);
                } else {
                    // Jika type dikosongkan, ambil kategori berdasarkan jenis
                    loadCategoryByJenis(jenisId);
                }
            });

            function loadTypeByJenis(jenisId, selectedId = null) {
                if (!jenisId) return;
                $.ajax({
                    url: "{{ url('types/by-jenis') }}/" + jenisId,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(data) {
                        const $type = $('#type_id');
                        $type.html('<option value="">Pilih Type</option>');
                        if (data.length > 0) {
                            $type.prop('disabled', false);
                            $.each(data, function(_, item) {
                                $type.append(
                                    `<option value="${item.id}" ${item.id == selectedId ? 'selected' : ''}>${item.name}</option>`
                                );
                            });
                        } else {
                            $type.prop('disabled', true)
                                .html('<option value="">Tidak ada type tersedia</option>');
                        }
                    }
                });
            }

            // === LOAD CATEGORY BERDASARKAN JENIS ===
            function loadCategoryByJenis(jenisId, selectedId = null) {
                if (!jenisId) return;
                $.ajax({
                    url: "{{ url('categories/by-jenis') }}/" + jenisId,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(data) {
                        const $cat = $('#category_id');
                        $cat.html('<option value="">Pilih Kategori</option>');
                        console.log("run load category by jenis");
                        console.log(data);
                        if (data.length > 0) {
                            $cat.prop('disabled', false);
                            $.each(data, function(_, item) {
                                $cat.append(
                                    `<option value="${item.id}" ${item.id == selectedId ? 'selected' : ''}>${item.name}</option>`
                                );
                            });
                        } else {
                            $cat.prop('disabled', true)
                                .html('<option value="">Tidak ada kategori tersedia</option>');
                        }
                    }
                });
            }

            // === LOAD CATEGORY BERDASARKAN TYPE ===
            function loadCategoryByType(typeId, selectedId = null) {
                if (!typeId) return;
                $.ajax({
                    url: "{{ url('categories/by-type') }}/" + typeId,
                    type: 'GET',
                    data: {
                        type_id: typeId
                    },
                    success: function(data) {
                        const $cat = $('#category_id');
                        $cat.html('<option value="">Pilih Kategori</option>');
                        console.log("run load category by type");
                        console.log(data);
                        if (data.length > 0) {
                            $cat.prop('disabled', false);
                            $.each(data, function(_, item) {
                                $cat.append(
                                    `<option value="${item.id}" ${item.id == selectedId ? 'selected' : ''}>${item.name}</option>`
                                );
                            });
                        } else {
                            $cat.prop('disabled', true)
                                .html('<option value="">Tidak ada kategori tersedia</option>');
                        }
                    }
                });
            }


            // === LOAD AWAL (EDIT MODE) ===
            function initialLoad() {
                const initialJenisId = $('#jenis_id').val();
                const initialTypeId = "{{ old('type_id', $product->category->type_id ?? '') }}";
                const initialCategoryId = "{{ old('category_id', $product->category_id ?? '') }}";
                console.log(initialJenisId, initialTypeId, initialCategoryId);

                if (!initialJenisId) return;

                if (initialTypeId && initialTypeId !== "null") {
                    loadTypeByJenis(initialJenisId, initialTypeId);
                    loadCategoryByType(initialTypeId, initialCategoryId);
                } else {
                    loadCategoryByJenis(initialJenisId, initialCategoryId);
                }
            }

            // === HANDLE SUBMIT FORM ===
            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                $("#btn-submit").prop('disabled', true).html(
                    '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                );

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
                        if (response.status === "success") {
                            Toast.fire({
                                icon: 'success',
                                title: response.message
                            });
                            setTimeout(() => location.reload(), 1500);
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: response.message
                            });
                            $("#btn-submit").prop('disabled', false).html('Kirim');
                        }
                    },
                    error: function(response) {
                        Toast.fire({
                            icon: 'error',
                            title: response.responseJSON?.message || 'Terjadi kesalahan'
                        });
                        $("#btn-submit").prop('disabled', false).html('Kirim');
                    }
                });
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
