@php
    $version = 12;
@endphp
@extends ('layouts.catalog')
@push('styles')
    <style>
        body {
            background-color: #FFFFFF;
        }

        .product-img:hover {
            transform: scale(1.3);
            transition: all 0.3s ease;
        }

        .slider-container {
            overflow: hidden;
            width: 100%;
            padding: 10px 0;
            position: relative;
        }

        .slider-track {
            display: flex;
            width: max-content;
            animation: scrollLeft 60s linear infinite;
        }

        .slider-container:hover .slider-track {
            animation-play-state: paused;
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
            transition: transform 0.3s ease;
        }

        .slider-item:hover img {
            transform: scale(1.05);
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
        <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100 bg-black">
            <a href="https://osborn.id/" target="_blank" class="py-2">
                <img src="{{ asset('dist/img/osborn.png') }}?v={{ $version }}" alt="osborn-logo"
                    style="width: 130px; height: auto;">
            </a>

            <!-- Navigation -->
            <nav class="d-none d-md-block">
                <ul class="d-flex list-unstyled m-0">
                    <li class="mx-3"><a href="https://osborn.id/" target="_blank"
                            class="text-decoration-none text-white h5">Official Website</a>
                    </li>
                </ul>
            </nav>

            <!-- Website Button -->
            <span class="d-block d-md-none"><a href="https://osborn.id/" target="_blank" class="contact-btn">
                    <i class="fas fa-globe text-white fa-lg"></i></a>
            </span>



        </div>
    </div>

    <!-- Carousel Content -->
    <div class="container-fluid p-0 mb-2 rounded">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                @for ($key = 0; $key < 7; $key++)
                    <div class="carousel-item {{ $key == 0 ? 'active' : '' }}">
                        @php $img = 'dist/img/slider/' . ($key + 1); @endphp

                        <img src="{{ asset("$img-1600.webp") }}?v={{ $version }}"
                            srcset="{{ asset("$img-800.webp") }}?v={{ $version }} 800w,{{ asset("$img-1600.webp") }}?v={{ $version }} 1600w"
                            sizes="100vw" class="d-block w-100 img-fluid" alt="{{ 'Slide ' . ($key + 1) }}"
                            style="object-fit: cover; object-position: center bottom; height: 65vh;"
                            fetchpriority="{{ $key == 0 ? 'high' : 'low' }}">

                    </div>
                @endfor
            </div>

            <ol class="carousel-indicators" id="mockup-carousel-indicators">
                @php $slideIndex = 0; @endphp
                @for ($key = 0; $key < 7; $key++)
                    <li data-target="#carouselExampleIndicators" data-slide-to="{{ $slideIndex }}"
                        class="{{ $slideIndex == 0 ? 'active' : '' }}"></li>
                    @php $slideIndex++; @endphp
                @endfor
            </ol>
        </div>

    </div>

    <!-- Slider Berjalan Horizontal -->
    <div class="slider-container">
        <div class="slider-track">
            @foreach ($products as $product)
                <div class="slider-item">
                    @php $img = 'dist/img/slide-depan/' . pathinfo($product, PATHINFO_FILENAME); @endphp
                    <img src="{{ asset("$img-300.webp") }}?v={{ $version }}"
                        srcset="{{ asset("$img-300.webp") }}?v={{ $version }} 300w,{{ asset("$img-600.webp") }}?v={{ $version }} 600w"
                        sizes="200px" alt="Product" />

                </div>
            @endforeach
            @foreach ($products as $product)
                <span>{{ $product }}</span>
                <div class="slider-item">
                    @php $img = 'dist/img/slide-depan/' . pathinfo($product, PATHINFO_FILENAME); @endphp
                    <img src="{{ asset("$img-300.webp") }}?v={{ $version }}"
                        srcset="{{ asset("$img-300.webp") }}?v={{ $version }} 300w,{{ asset("$img-600.webp") }}?v={{ $version }} 600w"
                        sizes="200px" alt="Product" />

                </div>
            @endforeach
        </div>
    </div>


    <!-- Main Content -->
    <div class="container my-5">
        <div class="text-center mb-5">
            <h1 class="display-5 display-md-4 display-lg-3 font-weight-bold mb-3 text-capitalize">Discover Our Collections
            </h1>
            <h4 class="font-weight-bold text-white mb-2">
                To help you visualize the image pack,<br>
                we have separated it into five different products
            </h4>
            <p class="text-white lead">
                Tap on the boxes below to explore<br>
                all the models within the categories
            </p>
        </div>

        <!-- Product Categories -->
        <div class="row justify-content-center">
            @foreach ($jenis as $key => $item)
                <div class="col-6 col-sm-4 col-md-2 text-center mb-5 product-card" data-id="{{ $item->id }}">
                    <div
                        class="border-0 h-100 pointer d-flex flex-column justify-content-center align-items-center overflow-hidden">
                        @php $img = 'dist/img/product/' . $key; @endphp

                        <img src="{{ asset("$img-400.webp") }}?v={{ $version }}"
                            srcset="{{ asset("$img-200.webp") }}?v={{ $version }} 200w,{{ asset("$img-400.webp") }}?v={{ $version }} 400w"
                            sizes="(max-width: 768px) 50vw, 200px" class="img-fluid d-block w-100 product-img"
                            alt="{{ $item->name }}">

                        <div class="card-body mt-0">
                            <h4 class="card-text font-weight-bold text-uppercase">{{ $item->name }}</h4>
                            <div class="d-flex flex-row justify-content-center">
                                <h5 class="font-weight-bold">{{ $item->products_count }}</h5>
                                <p class="ml-1 text-muted text-uppercase">products</p>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="bg-black-secondary p-md-5 p-3" style="border-radius: 10px">
            <!-- About -->
            <div class="container">
                <div class="row align-items-center justify-content-center justify-content-md-between">
                    <!-- Gambar -->
                    <div class="col-md-5 mb-3 mb-md-0 animate__animated animate__faster animate__fadeInLeft">
                        <div class="square-wrapper">
                            @php $img = 'dist/img/slider/1'; @endphp

                            <img src="{{ asset("$img-1600.webp") }}"
                                srcset="{{ asset("$img-800.webp") }} 800,{{ asset("$img-1600.webp") }} 1600w"
                                sizes="100vw" class="img-fluid w-100" alt="about">
                        </div>
                    </div>

                    <!-- Teks -->
                    <div class="col-md-6 offset-md-1 animate__animated animate__faster animate__fadeInRight">
                        <span class="text-uppercase" style="color: #bbb">Crafted for Your Space</span>
                        <h1 class="font-weight-bold mb-3">Unleash Your Design Vision with Over 1000 Premium Motifs</h1>
                        <ul class="list-styled">
                            <li>1000+ elegant and exclusive motifs</li>
                            <li>Durable, lightweight, and easy-to-install material</li>
                            <li>Perfect for any interior style</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Contact -->
            <div class="container mt-4">
                <div class="row align-items-center justify-content-center justify-content-md-between">
                    <div class="col-md-5 mb-4 mb-md-0 order-2 order-md-1">
                        <span class="text-uppercase small d-block mb-2" style="color: #bbb">Ready to Get Started?</span>
                        <h2 class="font-weight-bold mb-3">Contact Us !</h2>

                        <ul class="list-unstyled mb-4">
                            <li class="mb-3 d-flex">
                                <i class="fa fa-envelope mr-2 mt-1"></i>
                                <div class="d-flex">
                                    <span class="font-weight-bold" style="min-width: 80px;">Email</span>
                                    <span class="mr-1">:</span>
                                    <a href="mailto:{{ $setting->email ?? '-' }}" class="text-white font-weight-lighter">
                                        {{ $setting->email ?? '-' }}
                                    </a>
                                </div>
                            </li>

                            <li class="mb-3 d-flex">
                                <i class="fa fa-phone mr-2 mt-1"></i>
                                <div class="d-flex">
                                    <span class="font-weight-bold" style="min-width: 80px;">Call</span>
                                    <span class="mr-1">:</span>
                                    <a href="tel:0816659688"
                                        class="text-white font-weight-lighter">{{ $setting->phone ?? '-' }}</a>
                                </div>
                            </li>

                            <li class="d-flex">
                                <i class="fa fa-map-marker mr-2 mt-1"></i>
                                <div class="d-flex">
                                    <span class="font-weight-bold" style="min-width: 80px;">Address</span>
                                    <span class="mr-1">:</span>
                                    <span class="text-white font-weight-lighter">
                                        {{ $setting->address ?? '-' }}
                                    </span>
                                </div>
                            </li>
                        </ul>


                        <div class="d-flex">
                            <a href="https://instagram.com/osborn.pvcboard" class="text-white mr-3" target="__blank"><i
                                    class="fab fa-instagram fa-lg"></i></a>
                            <a href="https://www.youtube.com/@osborn.pvcboard" class="text-white mr-3"
                                target="__blank"><i class="fab fa-youtube fa-lg"></i></a>
                            <a href="https://facebook.com/profile.php?id=61560927238237" class="text-white mr-3"
                                target="__blank"><i class="fab fa-facebook fa-lg"></i></a>
                            <a href="https://tiktok.com/@osborn.pvcboard?_t=8nISbYs42Fc&_r=1" class="text-white"
                                target="__blank"><i class="fab fa-tiktok fa-lg"></i></a>
                        </div>
                    </div>

                    <!-- Gambar -->
                    <div class="col-md-5 mb-3 mb-md-0 animate__animated animate__faster animate__fadeInLeft order-1">
                        <div class="square-wrapper">
                            @php $img = 'dist/img/slider/2'; @endphp

                            <img src="{{ asset("$img-1600.webp") }}"
                                srcset="{{ asset("$img-800.webp") }} 800w,{{ asset("$img-1600.webp") }} 1600w"
                                sizes="100vw" class="img-fluid w-100" alt="about">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer')
    <div class="container">
        <div class="mx-auto mb-4 text-muted" style="border-top: 1px solid rgba(255, 255, 255, 0.1);"></div>
    </div>

    <footer class="text-white py-4 bg-black animate__animated animate__faster animate__fadeInUp">
        <!-- Garis -->
        <div class="container">
            <div class="row justify-content-center align-items-center justify-content-md-between align-items-md-start">
                <!-- Kiri -->
                <div class="col-md-6 mb-3 text-center text-md-left">
                    <img src="{{ asset('dist/img/osborn.png') }}" alt="osborn Logo" style="width: 130px; height: auto;"
                        class="mb-4">
                    <p class="mb-2 h5">{{ $setting->email ?? '-' }}</p>
                    <p class="mb-0 text-muted">Design Beyond Limits</p>
                </div>

                <!-- Kanan -->
                <div class="col-md-6 text-md-right text-center">
                    <h5 class="text-uppercase mt-0 mb-3">Follow Us</h5>
                    <ul class="list-unstyled d-flex justify-content-center justify-content-md-end">
                        <li>
                            <a href="https://instagram.com/osborn.pvcboard" class="social-link" target="__blank">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@osborn.pvcboard" class="social-link ml-2" target="__blank">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://facebook.com/profile.php?id=61560927238237" class="social-link ml-2"
                                target="__blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://tiktok.com/@osborn.pvcboard?_t=8nISbYs42Fc&_r=1" class="social-link ml-2"
                                target="__blank">
                                <i class="fab fa-tiktok"></i>
                            </a>
                        </li>
                    </ul>
                    <p class="mt-5 mb-1">&copy; 2025 Osborn. All rights reserved.</p>
                    <span class="text-muted">Updated:
                        {{ \Carbon\Carbon::parse($setting->last_update ?? null)->formatLocalized('%d %B %Y') }} |
                        {{ $setting->version ?? '-' }}</span>
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
