@extends('layouts.app')

@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Variant', 'url' => route('variants.index')],
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
                    <form action="{{ route('variants.update', $variant) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <label class="mt-3"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control" name="jenis_id" id="jenis_id">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}"
                                    {{ old('jenis_id', $variant->jenis_id) == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>

                        <div class="form-group">
                            <label class="mt-3"><i class="fas fa-user"></i> Nama Varian</label>
                            <input type="text" class="form-control" name="name" value="{{ $variant->name }}"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
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
                didOpen: toast => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                $("#btn-submit").prop('disabled', true).html(
                    '<span class="spinner-border spinner-border-sm mr-2"></span> Loading...'
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
                        }
                    },
                    error: function(response) {
                        if (response.status === 422) {
                            Toast.fire({
                                icon: 'error',
                                title: response.responseJSON.message
                            });
                        }
                    }
                });
            });
        });
    </script>
@endpush
