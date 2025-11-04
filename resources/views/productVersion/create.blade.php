@extends('layouts.app')

@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'Product Version', 'url' => route('product-versions.index')],
            ['label' => 'Tambah'],
        ]" />
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Tambah Produk ke Versi</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('product-versions.store') }}" method="POST" id="form-tambah">
                        @csrf
                        @method('POST')

                        <label class="mt-1"><i class="fas fa-box"></i> Produk</label>
                        <select class="form-control select2" name="product_id[]" id="product_id" multiple required>
                            @foreach ($product as $item)
                                <option value="{{ $item->id }}">
                                    {{ $item->name ?? $item->code }} — {{ $item->category->name ?? '-' }}
                                </option>
                            @endforeach
                        </select>

                        <label class="mt-3"><i class="fas fa-code-branch"></i> Versi</label>
                        <select class="form-control select2" name="version_id" required>
                            <option value="">Pilih Versi</option>
                            @foreach ($versions as $item)
                                <option value="{{ $item->id }}">{{ $item->version }}</option>
                            @endforeach
                        </select>

                        <button class="btn btn-primary mt-3" type="submit" id="btn-submit">Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        $(function() {
            $('.select2').select2({
                placeholder: "Pilih satu atau lebih produk",
                width: '100%'
            });
        });

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        $('#form-tambah').on('submit', function(e) {
            e.preventDefault();
            const $btn = $("#btn-submit");
            $btn.prop('disabled', true).html(
                '<span class="spinner-border spinner-border-sm mr-2"></span> Menyimpan...');

            let formData = new FormData(this);

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: $(this).attr('action'),
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
                        $btn.prop('disabled', false).html('Simpan');
                    }
                },
                error: function(response) {
                    Toast.fire({
                        icon: 'error',
                        title: response.responseJSON.message || 'Terjadi kesalahan.'
                    });
                    $btn.prop('disabled', false).html('Simpan');
                }
            });
        });
    </script>
@endpush
