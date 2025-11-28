@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Role', 'url' => route('role.index')],
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
                    <h2 class="card-title">Edit Role</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('role.update', $role) }}" method="POST" id="form-edit"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nama Role</label>
                            <input type="text" class="form-control" name="name" value="{{ $role->name }}"
                                id="name">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label><i class="fas fa-user"></i> Deskripsi</label>
                            <input type="text" class="form-control" name="description" value="{{ $role->description }}"
                                id="description">
                            @error('description')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label for="permission"><i class="fas fa-user"></i> Permissions</label>
                            @foreach ($permissions as $group => $groupPermissions)
                                <div class="mb-3">
                                    <h6 class="text-capitalize">{{ $group }}</h6>
                                    <div class="form-check">
                                        @foreach ($groupPermissions as $permission)
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox"
                                                    value="{{ $permission->id }}" id="perm_{{ $permission->id }}"
                                                    name="permission[]"
                                                    {{ in_array($permission->id, $role->permissions->pluck('id')->toArray()) ? 'checked' : '' }}>
                                                <label class="form-check-label" for="perm_{{ $permission->id }}">
                                                    {{ $permission->name }}
                                                </label>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            @endforeach
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
        Dropzone.autoDiscover = false;
        $(document).ready(function() {

            // ✅ Jika tidak ada file di Dropzone, jalankan AJAX biasa
            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);

                $("#btn-submit").prop("disabled", true).html(
                    '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                );

                $.ajax({
                    url: "{{ route('role.update', $role) }}",
                    method: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        toast.success(response.message);
                        setTimeout(() => {
                            window.location.href =
                                "{{ route('role.index') }}";
                        }, 1500);
                    },
                    error: function(xhr) {
                        toast.success(xhr.responseJSON.message || 'Terjadi kesalahan.');
                        $("#btn-submit").prop("disabled", false).html("Submit");
                    }
                });
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
