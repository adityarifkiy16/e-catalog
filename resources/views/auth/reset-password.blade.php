@extends('layouts.auth')
@section('content')
    <!-- Login form -->
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="col-md-4">
            <form class="reset-form">
                @csrf
                <div class="card mb-0 shadow gradient-outline rounded">
                    <div class="card-header text-center d-flex justify-content-center align-items-center bg-dark">
                        <img src="{{ asset('dist/img/osborn.webp') }}" alt="image logo" class="img-fluid"
                            style="width: 150px; height: auto">
                    </div>
                    <div class="card-body mb-1">
                        <input type="hidden" name="token" value="{{ $token }}">
                        <input type="hidden" name="email" value="{{ $email }}">
                        <label for="login" class="fw-bold">Masukan password baru</label>
                        <div class="form-group form-group-feedback form-group-feedback-left">
                            <div class="position-relative">
                                <input type="password" name="password" autocomplete="off" class="form-control pr-5"
                                    placeholder="Password Baru" id="password">
                                <i class="fa fa-eye-slash password-toggle"></i>
                            </div>
                            <div class="form-control-feedback">
                                <i class="icon-lock2 text-muted"></i>
                                <small id="password-error" class="text-danger"></small>
                            </div>
                        </div>

                        <label for="login" class="fw-bold">Konfirmasi password</label>
                        <div class="form-group form-group-feedback form-group-feedback-left">
                            <div class="position-relative">
                                <input type="password" name="password_confirmation" autocomplete="off"
                                    class="form-control pr-5" placeholder="Konfirmasi Password" id="password_confirmation">
                                <i class="fa fa-eye-slash password-toggle"></i>
                            </div>

                            <div class="form-control-feedback">
                                <i class="icon-lock2 text-muted"></i>
                                <small id="password_confirmation-error" class="text-danger"></small>
                            </div>
                        </div>

                        <div class="form-group d-flex justify-content-end">
                            <button type="submit" class="btn btn-brown mr-2 w-100" id="btn-submit"><span>Kirim
                                    Password</span></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    @push('scripts')
        <script type="text/javascript">
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

                $('.password-toggle').on('click', function() {
                    const $input = $(this).siblings('input');

                    if ($input.attr('type') === 'password') {
                        $input.attr('type', 'text');
                        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
                    } else {
                        $input.attr('type', 'password');
                        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
                    }
                });

                $(".reset-form").submit(function(e) {
                    e.preventDefault();
                    $('#btn-submit').html(
                        '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                    ).attr("disabled", true);

                    $.ajax({
                        type: "POST",
                        url: "{{ route('reset-password.post') }}",
                        data: $(this).serialize(),
                        dataType: "json",
                        success: function(response) {
                            if (response.status == "success") {
                                Toast.fire({
                                    icon: 'success',
                                    title: response.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(function() {
                                    window.location.href = response.url;
                                }, 1500);
                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(function() {
                                    window.location.reload();
                                })
                            }
                        },
                        error: function(response) {
                            if (response.status === 422) {
                                const errors = response.responseJSON.errors;

                                // Kosongkan semua error display dulu
                                $('.text-danger').text('');

                                // Loop dan tampilkan error untuk tiap field
                                for (const field in errors) {
                                    if (errors.hasOwnProperty(field)) {
                                        // Toast untuk setiap error (atau ambil hanya yang pertama jika mau)
                                        Toast.fire({
                                            icon: 'error',
                                            title: errors[field][0],
                                            showConfirmButton: false,
                                            timer: 1500
                                        });

                                        // Tampilkan di bawah input dengan ID seperti "name-error"
                                        $(`#${field}-error`).text(errors[field][0]);
                                    }
                                }
                                $('#btn-submit').html('Kirim Email').attr("disabled", false);
                            } else if (response.status === 500) {
                                Toast.fire({
                                    icon: 'error',
                                    title: "Ada kesalahan teknis! Silakan hubungi admin!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else if (response.status === 401) {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.responseJSON.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(function() {
                                    window.location.reload();
                                })
                            }
                        }
                    });
                });
            });
        </script>
    @endpush
@endsection
