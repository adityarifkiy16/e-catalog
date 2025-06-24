@extends('layouts.auth')
@section('content')
    <!-- Login form -->
    <div class="d-flex align-items-center justify-content-center vh-100 ml-5">
        <div class="col-md-4">
            <form class="login-form">
                @csrf
                <div class="card mb-0 shadow gradient-outline rounded">
                    <div class="card-header text-center d-flex justify-content-center align-items-center">
                        {{-- <img src="{{ asset('dist/img/logo.png') }}" alt="image logo" class="img-fluid"
                            style="width: 2rem; height: 2rem"> --}}
                        <div class="font-weight-bold h3">{{ config('app.name', 'Laravel') }}</div>
                    </div>
                    <div class="card-body mb-1">
                        <label for="login" class="fw-bold">Masukan Email anda</label>
                        <div class="form-group form-group-feedback form-group-feedback-left">
                            <input type="text" name="email" class="form-control" placeholder="adityarifkiy@mail.com"
                                id="email">
                            <div class="form-control-feedback">
                                <small id="email-error" class="text-danger"></small>
                            </div>
                        </div>

                        <label for="login" class="fw-bold">Masukan password</label>
                        <div class="form-group form-group-feedback form-group-feedback-left">
                            <div class="position-relative">
                                <input type="password" name="password" autocomplete="off" class="form-control pr-5"
                                    placeholder="Password" id="password">
                                <i class="fa fa-eye-slash password-toggle" id="toggleIcon" style="display: none"></i>
                            </div>

                            <div class="form-control-feedback">
                                <small id="password-error" class="text-danger"></small>
                            </div>
                        </div>

                        <div class="form-group d-flex justify-content-end">
                            <button type="submit" class="btn btn-outline-primary mr-2"><span>Masuk</span></button>
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

                @if (session('message'))
                    Toast.fire({
                        icon: 'success',
                        title: '{{ session('message') }}'
                    });
                @endif

                $("#password").on('input', function() {
                    if ($(this).val().length == 0) {
                        $("#toggleIcon").hide();
                        $(this).addClass('is-invalid');
                        $("#password-error").text('Password tidak boleh kosong');
                    } else {
                        $("#toggleIcon").show();
                        $(this).removeClass('is-invalid');
                        $("#password-error").text('');
                    }
                });

                $("#email").on('input', function() {
                    if ($(this).val().length == 0) {
                        $(this).addClass('is-invalid');
                        $("#email-error").text('email tidak boleh kosong');
                    } else {
                        $(this).removeClass('is-invalid');
                        $("#email-error").text('');
                    }
                });

                // toggle password
                $('#toggleIcon').on('click', function() {
                    $("#password").attr('type', $("#password").attr('type') === 'password' ? 'text' :
                        'password');
                    $(this).toggleClass('fa-eye fa-eye-slash');
                });

                $(".login-form").submit(function(e) {
                    e.preventDefault();
                    $.ajax({
                        type: "POST",
                        header: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "{{ route('login.post') }}",
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
                            }
                        },
                        error: function(response) {
                            if (response.status === 422) {
                                const errors = response.responseJSON.errors;

                                // Kosongkan semua error display dulu
                                $('.text-danger').text('');
                                $('.form-control').removeClass('is-invalid');

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
                                        $(`#${field}`).addClass('is-invalid');
                                    }
                                }
                            } else if (response.status === 500) {
                                Toast.fire({
                                    icon: 'error',
                                    title: "Ada kesalahan teknis! Silakan hubungi admin!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        }
                    });
                });
            });
        </script>
    @endpush
@endsection
