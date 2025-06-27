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
                            <select class="custom-select" name="category_id">
                                <option value="">Silahkan Pilih Jenis dahulu</option>
                            </select>

                            <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar</label>
                            <input type="file" class="custom-select" id="img" name="image[]" multiple
                                accept="image/*">
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

            $("#form-tambah").on('submit', function(e) {
                e.preventDefault();
                console.log("submit");
                let form = $(this);
                let url = form.attr('action');
                let formData = new FormData(this);
                $('#btn-tambah').html(
                    '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                    ).attr("disabled", true);

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
                            Toast.fire({
                                icon: 'success',
                                title: response.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            if (response.warning && response.warning.length > 0) {
                                let warningMessages = response.warning;
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Duplikasi Data!',
                                    html: warningMessages.join(', '),
                                    confirmButtonText: 'OK',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        setTimeout(() => {
                                            location.reload();
                                        }, 1500);
                                    }
                                });
                            } else {
                                setTimeout(() => {
                                    location.reload();
                                }, 1500);
                            }
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
