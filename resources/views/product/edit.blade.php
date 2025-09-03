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
                    <h2 class="card-title">Edit User</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('products.update', $product) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label class="mt-3"><i class="fas fa-code"></i> Kode</label>
                            <input type="text" class="form-control" name="code"
                                value="{{ old('name', $product->code) }}" placeholder="Kode Produk">
                            @error('code')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            @if ($product->category->jenis_id == 1 || $product->category->jenis_id == 5)
                                <label class="mt-3"><i class="fas fa-ruler-horizontal"></i> Panjang</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="length"
                                        value="{{ old('length', $product->panjang) }}" placeholder="Panjang" step="0.01"
                                        min="0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text text-white">
                                            <span class="text-dark font-weight-bold">CM</span>
                                        </span>
                                    </div>
                                    @error('length')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>


                                <label class="mt-3"><i class="fas fa-ruler-vertical"></i> Tinggi</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="height"
                                        value="{{ old('height', $product->tinggi) }}" placeholder="Tinggi" step="0.01"
                                        min="0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text text-white">
                                            <span class="text-dark font-weight-bold">CM</span>
                                        </span>
                                    </div>
                                    @error('height')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>


                                <label class="mt-3"><i class="fas fa-arrows-alt-h"></i> Ketebalan</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="density"
                                        value="{{ old('density', $product->ketebalan) }}" placeholder="Ketebalan"
                                        step="0.01" min="0">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text text-white">
                                            <span class="text-dark font-weight-bold">MM</span>
                                        </span>
                                    </div>
                                    @error('density')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            @endif

                            <label class="mt-3"><i class="fas fa-image"></i> Ganti Thumbnail</label>
                            <input type="file" class="form-control" id="img" name="image" accept="image/*"
                                multiple>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload Mockup</label>
                            <input type="file" class="form-control" id="img-mockup" name="image-mockup[]"
                                accept="image/*" multiple>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload Motif</label>
                            <input type="file" class="form-control" id="img-motif" name="image-motif" accept="image/*">

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
