@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'users', 'url' => route('users.index')],
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
                    <form action="{{ route('users.update', $user) }}" method="POST" id="form-edit">
                        @csrf
                        @method('PUT')

                        <!-- Role Info -->
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Name</label>
                            <input type="text" class="form-control" name="name" value="{{ $user->name }}">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-envelope"></i> Email</label>
                            <input type="email" class="form-control" name="email" value="{{ $user->email }}">
                            @error('email')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-lock"></i> Password</label>
                            <input type="password" class="form-control" name="password">
                            @error('password')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-lock"></i> Confirm Password</label>
                            <input type="password" class="form-control" name="password_confirmation">
                            @error('password_confirmation')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                            <label class="mt-3"><i class="fas fa-user-tag"></i> Role</label>
                            <select class="form-control" name="role_id">
                                @foreach ($roles as $role)
                                    <option value="{{ $role->id }}" {{ $user->role_id == $role->id ? 'selected' : '' }}>
                                        {{ $role->name }}</option>
                                @endforeach
                            </select>

                            <label for="path_image"> <i class="fas fa-image"></i> Gambar</label>
                            <input type="file" class="form-control" name="path_image">
                        </div>
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
            $("#form-edit").on('submit', function(e) {
                e.preventDefault();
                let form = $(this);
                let url = form.attr('action');
                let formData = new FormData(this);
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: url,
                    type: 'POST',
                    contentType: false, // ⬅️ WAJIB
                    processData: false, // ⬅️ WAJIB
                    data: formData,
                    success: function(response) {
                        if (response.status == "success") {
                            toast.success(response.message);
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                        } else {
                            toast.error(response.message);
                        }
                    },
                    error: function(response) {
                        if (response.status === 422) {
                            toast.error(response.responseJSON.message);
                        }
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
