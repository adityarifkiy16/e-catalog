<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description"
        content="Osborn adalah brand Indonesia yang berfokus pada produksi material konstruksi dan interior berkualitas tinggi, dengan menghadirkan solusi estetika dinding melalui produk inovatif seperti PVC board, Wallpanel, wallboard, dan UV board.">

    <title>@yield('title', 'Catalog - OSBORN')</title>
    <link rel="shortcut icon" href="{{ asset('dist/img/favicon.ico') }}" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- FontAwesome (delayed load) -->
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}" media="print"
        onload="this.media='all'">
    <link rel="stylesheet" href="{{ asset('dist/css/fontawesome-fix.css') }}">

    <!-- AdminLTE -->
    <link rel="preload" href="{{ asset('dist/css/adminlte.min.css') }}" as="style">
    <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">

    <!-- Custom style.css (IMPORTANT) -->
    <link rel="preload" href="{{ asset('dist/css/style.css') }}?v={{ time() }}" as="style">
    <link rel="stylesheet" href="{{ asset('dist/css/style.css') }}?v={{ time() }}">

    <!-- CSS yang tidak penting dibuat NON-blocking -->
    <link rel="stylesheet" href="{{ asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}" media="print"
        onload="this.media='all'">
    <link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.min.css') }}" media="print"
        onload="this.media='all'">

    <!-- Animate CSS (non critical) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        media="print" onload="this.media='all'">

    @if (isset($imageCarousel))
        @php
            $originalPath = $imageCarousel[0]->path;
            $image517 = str_replace('.webp', '-517.webp', $originalPath);
        @endphp
        <link rel="preload" as="image" href="{{ asset('storage/' . $image517) }}" fetchpriority="high">
    @endif
    <style>
        .card:hover {
            box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.1);
            transform: scale(1.02);
            transition: all 0.3s ease-in-out;

        }

        .center-content {
            margin: 0 auto;
            float: none;
        }

        @media (max-width: 767.98px) {
            #category-container {
                background: #f8f9fa;
                padding: 10px;
                z-index: 1000;
            }
        }
    </style>
    @stack('styles')

    @vite(['resources/js/catalog.js'])

</head>

<body class="bg-black">
    <div class="d-flex flex-column min-vh-100">
        <div class="wraper">
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid p-0">
                    @yield('content')
                </div>
            </section>
        </div>

        @yield('footer')
    </div>

    <!-- Scripts -->
    <script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>

    <!-- Plugins -->
    <script defer src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('plugins/sweetalert2/sweetalert2.min.js') }}"></script>
    <script defer src="{{ asset('dist/js/adminlte.min.js') }}"></script>


    <script type="module" defer src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule defer src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    @stack('scripts')
</body>

</html>
