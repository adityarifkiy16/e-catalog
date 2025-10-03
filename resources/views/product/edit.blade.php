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
                                value="{{ old('name', $product->code) }}" placeholder="Kode Produk">
                            @error('code')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-tags"></i> Tambah Spesifikasi</label>
                            <div id="variant-wrapper">
                                <div class="input-group mb-2 variant-row">
                                    <input type="text" name="specifications[0][name]" class="form-control"
                                        placeholder="Nama Spesifikasi">
                                    <input type="text" name="specifications[0][value]" class="form-control"
                                        placeholder="Nilai Spesifikasi">
                                    <input type="text" name="specifications[0][unit]" class="form-control"
                                        placeholder="Satuan Spesifikasi">
                                    <button type="button" class="btn btn-danger btn-remove">X</button>
                                </div>
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


                            <label class="mt-3"><i class="fas fa-tag"></i> Kategori</label>
                            <select class="form-control" name="category_id">
                                <option value="">Pilih Kategori</option>
                                @foreach ($categories as $item)
                                    <option value="{{ $item->id }}"
                                        {{ old('category_id', $product->category_id) == $item->id ? 'selected' : '' }}>
                                        {{ $item->name }}
                                    </option>
                                @endforeach
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

            let specificationIndex = 1;

            // klik tombol tambah
            $('#add-variant').on('click', function() {
                let newRow = `
                <div class="input-group mb-2 variant-row">
                    <input type="text" name="specifications[${specificationIndex}][name]" class="form-control" placeholder="Nama Spesifikasi">
                    <input type="text" name="specifications[${specificationIndex}][value]" class="form-control" placeholder="Nilai Spesifikasi">
                    <input type="text" name="specifications[${specificationIndex}][unit]" class="form-control" placeholder="Satuan Spesifikasi">
                    <button type="button" class="btn btn-danger btn-remove">X</button>
                </div>
            `;
                $('#variant-wrapper').append(newRow);
                specificationIndex++;
            });

            // hapus row
            $(document).on('click', '.btn-remove', function() {
                $(this).closest('.variant-row').remove();
            });

            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                console.log("submit");
                $("#btn-submit").prop('disabled', true);
                $("#btn-submit").html(
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
            });
        });
    </script>
@endpush
