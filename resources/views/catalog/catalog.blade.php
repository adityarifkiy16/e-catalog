@extends('layouts.catalog')

@section('content')
    <a href="https://wa.me/62816659688" class="btn btn-success btn-lg rounded-circle position-fixed" target="_blank"
        style="bottom: 20px; right: 20px; z-index: 999;" aria-label="Hubungi Kami">
        <i class="fab fa-whatsapp"></i>
    </a>
    <button type="button" class="btn btn-secondary rounded-circle  btn-lg" id="btn-scroll-top"
        style="display: none; position: fixed; bottom: 80px; right: 20px; z-index: 999;">
        <i class="fas fa-arrow-up"></i>
    </button>
    <header>
        <div class="w-100 d-flex justify-content-center align-items-center">
            <div class="w-100 shadow-sm py-3 px-4 d-flex justify-content-between align-items-center bg-black">
                <!-- Logo -->
                <a href="https://osborn.id/" target="_blank" class="d-flex align-items-center">
                    <img src="{{ asset('dist/img/osborn.webp') }}?v={{ time() }}" alt="osborn-logo"
                        style="width: 130px; height: auto;" width="130" height="86">
                </a>

                <!-- Search Button -->
                <div class="d-flex align-items-center justify-content-between">

                    <!-- Tombol Home -->
                    <span class="mr-4" id="homeButton">
                        <a href="{{ route('catalog.index') }}" class="text-white d-flex align-items-center">
                            <i class="fa fa-home mr-1"></i>
                            <span class="d-none d-md-block text-capitalize">Home</span>
                        </a>
                    </span>

                    <div class="d-none mr-4" id="backButton">
                        <div class="text-white d-flex align-items-center" style="cursor: pointer;">
                            <i class="fa fa-arrow-left mr-1"></i>
                            <span class="d-none d-md-block text-capitalize">Back</span>
                        </div>
                    </div>

                    <!-- Tombol filter (khusus mobile) -->
                    <span class="d-md-none d-flex align-items-center" data-toggle="modal" data-target="#filterModal"
                        id="category-button">
                        <i class="fa fa-bars"></i>
                    </span>
                </div>
            </div>
        </div>
    </header>
    <main>
        <div class="container-fluid py-4 px-4 text-white bg-black-secondary">
            <div class="row">
                <div class="col-md-10 col-12 order-2 order-md-1 center-content" id="catalog-col">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Toolbar Responsif & Estetik -->
                            <div class="rounded shadow-sm p-3 mb-2">
                                <div
                                    class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between">

                                    <!-- Input Search -->
                                    <div class="mb-md-0 mb-2 flex-grow-1 mr-2 order-md-3" id="search-form">
                                        <div class="row ">
                                            <div class="col-12 col-md-6 mb-2 mb-md-0">
                                                <div class="input-group">
                                                    <input type="text" id="search-input"
                                                        class="form-control form-control"
                                                        placeholder="Search product / code..."
                                                        value="{{ request()->query('search') }}"
                                                        style="
                                                            background:#f1f1f1;
                                                            border-radius:12px 0 0 12px;
                                                            border:none;
                                                        ">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"
                                                            style="
                                                                background:#f1f1f1;
                                                                border:none;
                                                                border-radius:0 12px 12px 0;
                                                            ">
                                                            <i class="fas fa-search"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            @if (!empty($versions))
                                                <div class="col-6 col-md-2">
                                                    <select id="version-select"
                                                        class="form-control bg-primary text-white border-secondary w-100"
                                                        style="
                                                            border-radius:10px;
                                                            font-weight:600;
                                                            font-size:0.9rem;
                                                        ">
                                                        @foreach ($versions as $v)
                                                            <option value="{{ $v->id }}"
                                                                {{ request('version') == $v->id ? 'selected' : '' }}>
                                                                Versi {{ $v->version }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            @endif
                                            <div class="col-6 col-md-2">
                                                <a href="#" data-toggle="modal" data-target="#pdfcatalog"
                                                    class="btn btn-danger w-100 text-nowrap"
                                                    style="
                                                        border-radius:10px;
                                                        font-weight:600;
                                                        font-size:0.9rem;
                                                        padding: 0.5rem 0;
                                                    ">
                                                    <i class="fa fa-arrow-down mr-1"></i>Download PDF
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Slider Mockup -->
                    <div id="mockup">
                        <div class="row mb-3">
                            <div class="col-12">
                                <div id="mockup-carousel" class="carousel slide">
                                    <div class="carousel-inner" id="mockup-carousel-inner">
                                        <!-- Slide gambar akan di-inject lewat JS -->
                                        @foreach ($imageCarousel as $key => $item)
                                            @php
                                                $original = asset('storage/' . $item->path);
                                                $image517 = asset(
                                                    'storage/' . str_replace('.webp', '-517.webp', $item->path),
                                                );
                                            @endphp
                                            <div class="carousel-item {{ $key == 0 ? 'active' : '' }}">
                                                <div class="rounded-lg overflow-hidden">
                                                    <img src="{{ $image517 ? $image517 : $original }}" class="mockup-image"
                                                        alt="Mockup {{ $item->name }}"
                                                        srcset="{{ $image517 }} 517w, {{ $original }} 845w"
                                                        sizes="(max-width: 768px) 100vw, 845px" width="845"
                                                        height="470" decoding="async"
                                                        @if ($key == 0) fetchpriority="high" 
                                                            loading="eager"
                                                        @else
                                                            loading="lazy" 
                                                            fetchpriority="low" @endif>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                    <a class="carousel-control-prev" href="#mockup-carousel" role="button"
                                        data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#mockup-carousel" role="button"
                                        data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                    <ol id="mockup-carousel-indicators" class="carousel-indicators">
                                        @foreach ($imageCarousel as $key => $item)
                                            <li data-target="#mockup-carousel" data-slide-to="{{ $key }}"
                                                class="{{ $key == 0 ? 'active' : '' }}"></li>
                                        @endforeach
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product list -->
                    <div id="product-list">
                        <div class="row">
                        </div>
                    </div>

                    <!-- Loading indicator -->
                    <div id="loading" class="text-center d-none my-5">
                        <div class="elegant-spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                </div>

                <div class="modal fade" id="pdfcatalog" tabindex="-1" aria-labelledby="pdfcatalogLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content bg-black text-white">
                            <div class="modal-header">
                                <h5 class="modal-title font-weight-bold" id="pdfcatalogLabel">Pilih Kategori</h5>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Tutup">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" id="pdf-catalog"></div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal"
                                    id="btn-download">Preview PDF</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header text-white" style="background: #000">
                                <h5 class="modal-title font-weight-bold" id="productModalLabel">Detail</h5>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Tutup">
                                    <span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body" style="max-height:50vh; overflow-y:auto;">
                                <div class="container-fluid">
                                    <div class="row d-flex flex-row justify-content-center align-items-center my-auto">
                                        <div
                                            class="col-md-6 col-12 mb-3 mb-md-0 d-flex align-items-center justify-content-center">

                                            <div id="carouselProduct" class="carousel slide" data-ride="carousel">
                                                <div class="carousel-inner" id="carousel-product-image">
                                                    <!-- Slide gambar akan di-inject lewat JS -->
                                                </div>
                                                <a class="carousel-control-prev" href="#carouselProduct" role="button"
                                                    data-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                                <a class="carousel-control-next" href="#carouselProduct" role="button"
                                                    data-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Detail produk - kolom kanan -->
                                        <div class="col-md-6 col-12 mt-md-5">
                                            <div
                                                class="product-details d-flex flex-column justify-content-center align-items-center justify-content-md-start">

                                                <!-- Kode Produk -->
                                                <h3 id="modalName"
                                                    class="font-weight-bold mb-2 text-dark text-left text-md-left">
                                                </h3>

                                                <!-- Kategori -->
                                                <div class="mb-3">
                                                    <span id="modalCategory" class="text-white text-uppercase"></span>
                                                </div>

                                                <!-- Detail Produk -->
                                                <div class="mb-2 text-dark w-100 px-2">
                                                    <div id="modalVariants"></div>
                                                    <div class="row mb-1 density">
                                                        <div class="col-4 col-sm-3 font-weight-bold" id="density">
                                                            Density
                                                        </div>
                                                        <div class="col-auto">:</div>
                                                        <div class="col" id="modalKepadatan"></div>
                                                    </div>
                                                    <div class="row mb-1 paket">
                                                        <div class="col-4 col-sm-3 font-weight-bold" id="paket">Paket
                                                        </div>
                                                        <div class="col-auto">:</div>
                                                        <div class="col" id="modalPaket"></div>
                                                    </div>


                                                    <div class="row mb-1 grafis d-none">
                                                        <div class="col">
                                                            <img src="" alt="" id="modalGrafis"
                                                                class="w-100 img-fluid">
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Notes -->
                                                <div class="row w-100 mt-0" id="notes">
                                                    <div class="col-12">
                                                        <div class="py-1 px-2 d-flex align-items-center bg-light border"
                                                            style="border-radius: .5rem;">
                                                            <i class="fa fa-info-circle mr-2 text-primary"></i>
                                                            <span class="font-italic text-dark">
                                                                Please choose an option above before order.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Thumbnail Gallery -->
                                                <div class="p-md-3 p-2 w-100">
                                                    <div id="thumbnailGallery"
                                                        class="row justify-content-start no-gutters">
                                                        <!-- Foto kecil akan di-inject lewat JS -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-fluid" id="modalVideo">
                                    <div class="row mt-5">
                                        <div class="col-12">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <div class="embed-responsive embed-responsive-16by9"
                                                    style="width:100%; height:50vh;" id="modalVideoPlayer">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="modal-footer d-flex justify-content-center align-items-center justify-content-md-end align-items-md-center">
                                <div class="mt-2 d-flex flex-wrap">
                                    {{-- <a class="btn btn-md modalDownload text-white" style="background: #000"
                                    id="modalDownload" href="#">
                                    <i class="fas fa-arrow-down mr-2"></i>Download
                                </a> --}}
                                </div>

                                <div class="mt-2 d-flex flex-wrap ml-2">
                                    <button class="btn btn-md btn-primary modalContact" id="modalContact">
                                        <i class="fas fa-cart-plus mr-2"></i> Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Kategori -->
                <div class="modal fade" id="filterModal" tabindex="-1" role="dialog"
                    aria-labelledby="filterModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content bg-black text-white">
                            <div class="modal-header">
                                <h5 class="modal-title font-weight-bold" id="filterModalLabel">Filter</h5>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Tutup">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="category-modal-container">
                                    <h5 id="type-modal-item-label" class="font-cocogoose mb-2">Type</h5>
                                    <ul class="nav flex-column" id="type-menu-item-modal">
                                        <!-- Akan diisi oleh JS -->
                                    </ul>
                                    <h5 id="category-modal-item-label" class="font-cocogoose">Category</h5>
                                    <ul class="nav flex-column" id="category-menu-item-modal">
                                        <!-- Akan diisi oleh JS -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Filter -->
                <div class="col-md-2 col-12 order-1 order-md-2" id="filter-container">
                    <div class="sidebar border-end">
                        <div class="accordion" id="accordionExample">
                            <div class="">
                                <div id="" class="collapse show" aria-labelledby="headingOne"
                                    data-parent="#accordionExample">
                                    <div class="pt-2">
                                        <div id="category-container" class="d-none text-white">
                                            <h3 id="type-menu-item-label" class="font-cocogoose mb-2">Type</h3>
                                            <ul class="nav flex-column" id="type-menu-item">
                                            </ul>
                                            <h3 id="category-menu-item-label" class="font-cocogoose">Category</h3>
                                            <ul class="nav flex-column" id="category-menu-item">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
@endsection
@section('footer')
    <footer class="footer mt-auto py-2 text-center text-white"
        style="position: fixed; bottom: 0; width: 100%; z-index: 100; background-color: #222222">
        <strong>&copy;{{ date('Y') }} <a href="https://osborn.id" target="_blank"
                class="text-white">Osborn</a>.</strong> All rights
        reserved.
    </footer>
@endsection

@push('scripts')
    <script type="text/javascript">
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
        $(document).ready(function() {
            // Scroll to top button
            if ($(window).width() < 768) {
                $('#search-form').addClass('d-none');
            }
        });
    </script>

    @if (session('success'))
        <script>
            Toast.fire({
                icon: 'success',
                title: '{{ session('success') }}'
            });
        </script>
    @endif

    @if (session('error'))
        <script>
            Toast.fire({
                icon: 'error',
                title: '{{ session('error') }}'
            });
        </script>
    @endif
@endpush
