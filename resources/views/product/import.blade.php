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
            <div class="card card-maroon shadow-sm">
                <div class="card-header">
                    <h3 class="card-title">Import Produk</h3>
                </div>

                <div class="card-body">

                    <form action="{{ route('products.import') }}" method="POST" id="form-tambah"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')

                        <div class="form-group">
                            <label class="font-weight-bold mt-2">
                                <i class="fas fa-file-excel"></i> Upload File Excel
                            </label>
                            <input type="file" name="file" class="form-control" accept=".xlsx,.xls" required>

                            <small class="text-muted">
                                Format file: <strong>.xlsx</strong> atau <strong>.xls</strong>.
                            </small>
                        </div>

                        <div class="mt-4 d-flex">
                            <button class="btn btn-primary mr-2" id="btn-submit" type="submit">
                                <i class="fas fa-upload"></i> Import
                            </button>

                            <a href="{{ asset('format_upload_produk.xlsx') }}" class="btn btn-success">
                                <i class="fas fa-download"></i> Download Format
                            </a>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        $(document).ready(function() {
            // === HANDLE SUBMIT FORM ===
            $("#form-tambah").on('submit', function(e) {
                e.preventDefault();
                $("#btn-submit").prop('disabled', true).html(
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
                        if (response.status === "success") {
                            if (response.errors && response.errors.length > 0) {
                                response.errors.forEach((err, i) => {
                                    let htmlList = "<ul style='text-align:left'>";
                                    response.errors.forEach(err => {
                                        htmlList += `<li>${err}</li>`;
                                    });
                                    htmlList += "</ul>";
                                    toast.info(htmlList);
                                    if (i === response.errors.length - 1) {
                                        setTimeout(() => {
                                            window.location.href =
                                                "{{ route('products.index') }}";
                                        }, 1500);
                                    }
                                });
                            } else {
                                toast.success(response.message);
                                setTimeout(() => {
                                    window.location.href =
                                        "{{ route('products.index') }}";
                                }, 1500);
                            }
                        } else {
                            toast.error(response.message);
                            $("#btn-submit").prop('disabled', false).html('Kirim');
                        }
                    },
                    error: function(response) {
                        toast.error(response.responseJSON.message || 'terjadi kesalahan');
                        $("#btn-submit").prop('disabled', false).html('Kirim');
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
