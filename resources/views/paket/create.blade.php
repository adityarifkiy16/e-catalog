@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Paket', 'url' => route('package.index')],
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
                    <h2 class="card-title">Tambah Paket</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('package.store') }}" method="POST" id="form-tambah" enctype="multipart/form-data">
                        @csrf
                        @method('POST')

                        <!-- Role Info -->
                        <div class="form-group">
                            <label><i class="fas fa-tags"></i> Nama Paket</label>
                            <input type="text" class="form-control" name="name" placeholder="Masukkan Nama">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <label class="mt-1"><i class="fas fa-user-tag"></i> Produk</label>
                        <select class="form-control select2" name="product_id">
                            <option value="">Pilih Produk</option>
                            @foreach ($products as $item)
                                <option value="{{ $item->id }}" {{ old('product_id') == $item->id ? 'selected' : '' }}>
                                    {{ $item->code }} - {{ $item->category->name }}
                                </option>
                            @endforeach
                        </select>
                        <label class="mt-3"><i class="fas fa-image"></i> Upload Thumbnail</label>
                        <input type="file" class="form-control" id="img" name="image[]" accept="image/*" multiple>
                        <button class="btn btn-primary mt-3" type="submit" id="btn-submit">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        $(function() {
            //Initialize Select2 Elements
            $('.select2').select2()
        })

        $(document).ready(function() {
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
                    contentType: false, // ⬅️ WAJIB
                    processData: false, // ⬅️ WAJIB
                    success: function(response) {
                        console.log(response);
                        if (response.status == "success") {
                            toast.success(response.message);
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                        } else {
                            toast.error(response.message);
                            $("#btn-submit").prop('disabled', false).html(
                                'Kirim'
                            )
                        }
                    },
                    error: function(response) {
                        if (response.status === 422) {
                            toast.error(response.responseJSON.message);
                            $("#btn-submit").prop('disabled', false).html(
                                'Kirim'
                            )
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
