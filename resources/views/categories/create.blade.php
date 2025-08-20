@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Categories', 'url' => route('categories.index')],
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
                    <h2 class="card-title">Tambah Category</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('categories.store') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')

                        <!-- Role Info -->
                        <div class="form-group">
                            <label><i class="fas fa-tags"></i> Name</label>
                            <input type="text" class="form-control" name="name" placeholder="Masukkan Nama">
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
                        <label class="mt-3"><i class="fas fa-image"></i> Type</label>
                        <select name="type_id" id="type_id" class="form-control">
                            <option value="">Pilih Type</option>
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> tampilan</label>
                        <select class="form-control" name="display_style">
                            <option value="">Pilih tampilan</option>
                            <option value="square">Persegi</option>
                            <option value="rectangle">Persegi panjang</option>
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Gambar</label>
                        <input type="file" class="form-control" id="img" name="image" accept="image/*">
                        <button class="btn btn-primary mt-3" type="submit" id="btn-submit">Kirim</button>
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

            $('#jenis_id').on('change', function() {
                console.log("change");
                var jenisId = $(this).val();
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
