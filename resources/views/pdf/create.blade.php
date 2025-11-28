@extends('layouts.app')
@section('header')
    <div class="card d-flex px-4 py-2" style="border-radius: 1rem;">
        <x-breadcrumb :items="[
            ['label' => 'Home', 'url' => route('dashboard')],
            ['label' => 'PDF', 'url' => route('pdf.index')],
            ['label' => 'Generate'],
        ]">
        </x-breadcrumb>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card card-maroon">
                <div class="card-header">
                    <h2 class="card-title">Generate PDF Katalog</h2>
                </div>

                <div class="card-body">
                    <form action="{{ route('pdf.store') }}" method="POST" id="form-tambah" enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <label class="mt-1"><i class="fas fa-user-tag"></i> Jenis</label>
                        <select class="form-control select2" name="jenis_id" id="jenis_id">
                            <option value="">Pilih Jenis</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}" {{ old('jenis_id') == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>

                        <label class="mt-1"><i class="fas fa-user-tag"></i> Version</label>
                        <select class="form-control select2" name="version_id">
                            <option value="">Pilih Versi</option>
                            @foreach ($version as $item)
                                <option value="{{ $item->id }}" {{ old('version_id') == $item->id ? 'selected' : '' }}>
                                    {{ $item->version }}
                                </option>
                            @endforeach
                        </select>

                        <label class="mt-1"><i class="fas fa-user-tag"></i> Type</label>
                        <select class="form-control select2" name="type_id" id="type_id">
                            <option value="">Pilih Tipe</option>
                        </select>

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

            $("#jenis_id").on('change', function() {
                var jenisId = $(this).val();
                $.ajax({
                    url: "{{ url('/types/by-jenis/') }}/" + jenisId,
                    type: 'GET',
                    data: {
                        jenis_id: jenisId
                    },
                    success: function(data) {
                        if (data.length > 0) {
                            $('#type_id').prop('disabled', false);
                            $('#type_id').html(
                                '<option value="">Pilih tipe</option>'); // reset type
                            $.each(data, function(key, item) {
                                $('#type_id').append('<option value="' + item.id +
                                    '">' + item.name + '</option>');
                            });
                        } else {
                            $('#type_id').prop('disabled', true);
                            $('#type_id').html(
                                '<option value="">Tidak ada tipe tersedia</option>');
                        }
                    }
                });
            })
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
