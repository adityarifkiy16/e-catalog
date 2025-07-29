@extends ('layouts.catalog')
@push('styles')
    <style>
        body {
            background-color: #FFFFFF;
        }

        .slider-container {
            overflow: hidden;
            width: 100%;
            background: #FFFFFF;
            padding: 10px 0;
        }

        .slider-track {
            display: flex;
            width: max-content;
            animation: scrollLeft 60s linear infinite;
        }

        .slider-item {
            flex: 0 0 auto;
            margin: 0 10px;
        }

        .slider-item img {
            height: 200px;
            width: auto;
            border-radius: 8px;
            object-fit: cover;
        }

        .contact-btn {
            background-color: #000;
            color: #FFFFFF;
            padding: 12px 20px;
            font-size: 1.25rem;
            border-radius: 32px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .square-wrapper {
            position: relative;
            width: 100%;
            padding-top: 100%;
            overflow: hidden;
            border-radius: 0.25rem;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }

        .square-wrapper img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .social-icons {
            padding: 0;
            margin: 0;
        }

        .social-icons li {
            list-style: none;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #FFFFFF;
            color: #333;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .social-link:hover {
            background-color: #000;
            color: #FFFFFF;
        }


        @keyframes scrollLeft {
            0% {
                transform: translateX(0%);
            }

            100% {
                transform: translateX(-50%);
            }
        }

        @media (max-width: 767.98px) {
            .slider-item img {
                height: 100px;
            }
        }
    </style>
@endpush
@section('content')
    <!-- Page Title -->
    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100" style="background-color: #bbaa91;">
            <a href="https://osborn.id/" target="_blank" class="py-2"> <img src="{{ asset('dist/img/osborn.png') }}"
                    alt="osborn-logo" style="width: 130px; height: auto;"></a>
        </div>
    </div>

    <!-- Carousel Content -->
    <div class="container-fluid p-0 mb-2 rounded">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                @for ($key = 0; $key < 5; $key++)
                    <div class="carousel-item {{ $key == 0 ? 'active' : '' }}">
                        <img src="{{ asset('dist/img/slider/' . ($key + 1) . '.webp') }}?v{{ time() }}"
                            class="d-block w-100 img-fluid" alt="{{ 'Slide ' . ($key + 1) }}"
                            style="object-fit: cover; object-position: center bottom; height: 65vh;">
                    </div>
                @endfor
            </div>
            <ol class="carousel-indicators" id="mockup-carousel-indicators">
                @for ($key = 0; $key < 5; $key++)
                    <li data-target="#carouselExampleIndicators" data-slide-to="{{ $key }}"
                        class="{{ $key == 0 ? 'active' : '' }}"></li>
                @endfor
            </ol>
        </div>
    </div>

    <!-- Slider Berjalan Horizontal -->
    <div class="slider-container">
        <div class="slider-track">
            @foreach ($products as $product)
                <div class="slider-item">
                    <img src="{{ asset('storage/' . $product->photo) }}?v{{ time() }}" alt="Product" />
                </div>
            @endforeach

            {{-- Duplicate untuk looping tak henti --}}
            @foreach ($products as $product)
                <div class="slider-item">
                    <img src="{{ asset('storage/' . $product->photo) }}?v{{ time() }}" alt="Product" />
                </div>
            @endforeach
        </div>
    </div>


    <!-- Main Content -->
    <div class="container my-5">
        <div class="text-center mb-5">
            <h1 class="display-5 display-md-4 display-lg-3 font-weight-bold mb-3 text-capitalize">Discover Our Collections
            </h1>
            <h4 class="font-weight-bold text-dark mb-2">
                To help you visualize the image pack,<br>
                we have separated it into four different products
            </h4>
            <p class="text-muted lead">
                Tap on the boxes below to explore<br>
                all the models within the categories
            </p>
        </div>

        <!-- Product Categories -->
        <div class="row justify-content-center">
            @foreach ($jenis as $key => $item)
                <div class="col-6 col-sm-4 col-md-2 text-center mb-4 product-card" data-id="{{ $item->id }}">
                    <div class="border-0 h-100 pointer">
                        <img src="{{ asset('dist/img/product/' . $key . '.png') }}" class="card-img-top p-3"
                            style="width: 100%; height: auto;" alt="{{ $item->name }}">
                        <div class="card-body p-2">
                            <h4 class="card-text font-weight-bold">{{ $item->name }}</h4>
                            <p class="card-text text-muted">{{ $item->products_count }} Product</p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- About -->
        <div class="container mt-5">
            <div class="row align-items-center justify-content-center">
                <!-- Gambar -->
                <div class="col-md-5 mb-3 mb-md-0 animate__animated animate__faster animate__fadeInLeft">
                    <div class="square-wrapper">
                        <img src="{{ asset('dist/img/slider/1.webp') }}" alt="about" class="img-fluid w-100">
                    </div>
                </div>

                <!-- Teks -->
                <div class="col-md-6 offset-md-1 animate__animated animate__faster animate__fadeInRight">
                    <span class="text-muted text-uppercase">Crafted for Your Space</span>
                    <h1 class="font-weight-bold mb-3">Unleash Your Design Vision with Over 70 Premium Motifs</h1>
                    <ul class="list-styled">
                        <li>70+ elegant and exclusive motifs</li>
                        <li>Durable, lightweight, and easy-to-install material</li>
                        <li>Perfect for any interior style</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Contact -->
        <div class="container mt-4">
            <div
                class="row align-items-center justify-content-center animate__animated animate__faster animate__fadeInLeft">
                <div class="col-md-5 mb-3 mb-md-0">
                    <span class="text-muted text-uppercase small">Ready to Get Started?</span>
                    <h1 class="font-weight-bold mb-3">Contact Us</h1>

                    <ul class="list-unstyled mb-4">
                        <li class="mb-2">
                            <strong>Support:</strong>
                            <a href="mailto:{{ config('mail.from.address') }}" class="text-decoration-none text-dark">
                                {{ config('mail.from.address') }}
                            </a>
                        </li>
                        <li>
                            <strong>Call:</strong>
                            <a href="tel:0816659688" class="text-decoration-none text-dark">+62816659688</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-5 offset-md-1 animate__animated animate__faster animate__fadeInRight">
                    <div class="square-wrapper">
                        <img src="{{ asset('dist/img/slider/2.webp') }}" alt="contact" class="img-fluid w-100">
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer')
    <footer class="text-white py-4 border-top animate__animated animate__faster animate__fadeInUp"
        style="background-color: #242424">
        <div class="container">
            <div class="row justify-content-center align-items-center justify-content-md-between align-items-md-start">
                <!-- Kiri -->
                <div class="col-md-6 mb-3 text-center text-md-left">
                    <img src="{{ asset('dist/img/osborn.png') }}" alt="osborn Logo" height="30" class="mb-4">
                    <p class="mb-2 h5">admin@osborn.id</p>
                    <p class="mb-0 text-muted">Design Beyond Limits</p>
                </div>

                <!-- Kanan -->
                <div class="col-md-6 text-md-right text-center">
                    <h5 class="text-uppercase mt-0 mb-3">Follow Us</h5>
                    <ul class="list-unstyled d-flex justify-content-center justify-content-md-end">
                        <li>
                            <a href="https://instagram.com/osborn.pvcboard" class="social-link">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@osborn.pvcboard" class="social-link ml-2">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://facebook.com/profile.php?id=61560927238237" class="social-link ml-2">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://tiktok.com/@osborn.pvcboard?_t=8nISbYs42Fc&_r=1" class="social-link ml-2">
                                <i class="fab fa-tiktok"></i>
                            </a>
                        </li>
                    </ul>
                    <p class="mt-5 mb-1">&copy; 2025 Osborn. All rights reserved.</p>
                    <span class="text-muted">Updated: 29 Jul 2025 | v1.1</span>

                </div>
            </div>
        </div>
    </footer>
@endsection
@push('scripts')
    <script>
        $(document).ready(function() {
            $('.product-card').click(function() {
                var jenisId = $(this).data('id');
                window.location.href = '/catalog?jenis=' + jenisId;
            });
        });
    </script>
@endpush
