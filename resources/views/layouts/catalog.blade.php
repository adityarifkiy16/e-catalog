<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'E-catalog')</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="{{ asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">
    <!-- DataTables -->
    <link rel="stylesheet" href="{{ asset('plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
    <!-- custom css -->
    <link rel="stylesheet" href="{{ asset('style.css') }}">

    @vite(['resources/js/app.js'])

    <style>
        .breadcrumb {
            font-size: 1.1rem;
            /* Ukuran font sedikit lebih besar untuk keterbacaan */
        }

        .breadcrumb-item a {
            color: #333;
            /* Warna teks yang gelap pada link */
            transition: color 0.3s ease-in-out;
        }

        .breadcrumb-item a:hover {
            color: #007bff;
            /* Warna biru terang saat hover */
            text-decoration: underline;
            /* Menambahkan garis bawah pada hover */
        }

        .breadcrumb-item.active {
            color: #6c757d;
            /* Warna breadcrumb yang aktif */
        }

        .breadcrumb-item:not(:last-child):after {
            content: "›";
            /* Menambahkan tanda panah sebagai separator */
            margin: 0 10px;
            color: #6c757d;
        }

        .breadcrumb-item:last-child {
            font-weight: bold;
            /* Menebalkan breadcrumb terakhir */
            color: #007bff;
            /* Membuat breadcrumb terakhir lebih menonjol */
        }
    </style>
</head>

<body>
    <div class="d-flex flex-column min-vh-100">
        <div class="">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 mx-auto mt-2">
                            @yield('header')
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    @yield('content')
                </div>
            </section>
        </div>

        <!-- Footer -->
        <footer class="footer mt-auto py-3 bg-light text-center">
            <strong>&copy; <a href="#">Adit Ganteng</a>.</strong> All rights reserved.
        </footer>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

    <!-- DataTables & Plugins -->
    <script src="{{ asset('plugins/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables-buttons/js/buttons.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('plugins/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('dist/js/adminlte.min.js') }}"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    @stack('scripts')
</body>

</html>
