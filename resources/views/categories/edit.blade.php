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
                    <form action="{{ route('categories.update', $categories) }}" method="POST" id="form-edit">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Name</label>
                            <input type="text" class="form-control" name="name" value="{{ $categories->name }}">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class="mt-3"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control" name="jenis_id">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}"
                                    {{ old('jenis_id', $categories->jenis_id) == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>
                        <button class="btn btn-primary mt-3" type="submit">Kirim</button>
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
                let form = $(this);
                let url = form.attr('action');
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: url,
                    type: 'POST',
                    data: form.serialize(),
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
