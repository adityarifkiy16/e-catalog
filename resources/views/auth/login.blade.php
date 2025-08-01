@extends('layouts.auth')
@section('content')
    <!-- Login form -->
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="col-md-4">
            <form class="login-form">
                @csrf
                <div class="card mb-0 shadow gradient-outline rounded ">
                    <div class="card-header text-center d-flex justify-content-center align-items-center bg-darkBlue">
                        <img src="{{ asset('dist/img/osborn.png') }}" alt="image logo" class="img-fluid"
                            style="width: 150px; height: auto">
                    </div>
                    <div class="card-body mb-1">
                        <label for="login" class="fw-bold">Email</label>
                        <div class="form-group form-group-feedback form-group-feedback-left">
                            <input type="text" name="email" class="form-control" placeholder="example@mail.com"
                                id="email">
                            <div class="form-control-feedback">
                                <small id="email-error" class="text-danger"></small>
                            </div>
                        </div>

                        <label for="login" class="fw-bold">Password</label>
                        <div class="form-group form-group-feedback form-group-feedback-left">
                            <div class="position-relative">
                                <input type="password" name="password" autocomplete="off" class="form-control pr-5"
                                    placeholder="type your password" id="password">
                                <i class="fa fa-eye-slash password-toggle" id="toggleIcon" style="display: none"></i>
                            </div>

                            <div class="form-control-feedback">
                                <small id="password-error" class="text-danger"></small>
                            </div>
                        </div>
                        <a href="{{ route('forget-password') }}">Lupa Kata Sandi?</a>

                        <div class="form-group d-flex flex-column justify-content-center mt-3">
                            <button type="submit" class="btn btn-brown mr-2 w-100"
                                id="btn-submit"><span>Masuk</span></button>
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
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown animate__faster'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp animate__faster'
                    },
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
                    $('#btn-submit').html(
                        '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Loading...'
                    ).attr("disabled", true);
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
                                setTimeout(function() {
                                    window.location.reload();
                                }, 1500);
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
                                $('#btn-submit').html('Masuk').attr("disabled", false);
                            } else if (response.status === 500) {
                                Toast.fire({
                                    icon: 'error',
                                    title: "Ada kesalahan teknis! Silakan hubungi admin!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else if (response.status === 401) {
                                console.log(response)
                                Toast.fire({
                                    icon: 'error',
                                    title: response.responseJSON.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
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
