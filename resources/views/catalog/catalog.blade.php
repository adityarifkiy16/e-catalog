@extends('layouts.catalog')

@section('content')
    <a href="https://wa.me/62816659688" class="btn btn-success btn-lg rounded-circle position-fixed" target="_blank"
        style="bottom: 20px; right: 20px; z-index: 999;">
        <i class="fab fa-whatsapp"></i>
    </a>
    <button type="button" class="btn bg-black rounded-circle  btn-lg" id="btn-scroll-top"
        style="display: none; position: fixed; bottom: 80px; right: 20px; z-index: 999;">
        <i class="fas fa-arrow-up"></i>
    </button>

    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="w-100 shadow-sm py-3 px-4 d-flex justify-content-between align-items-center bg-black">
            <!-- Logo -->
            <a href="https://osborn.id/" target="_blank" class="d-flex align-items-center">
                <img src="{{ asset('dist/img/osborn.png') }}?v={{ time() }}" alt="osborn-logo"
                    style="width: 130px; height: auto;">
            </a>

            <!-- Search Button -->
            <div class="d-flex align-items-center justify-content-between">
                <span class="d-md-none d-flex align-items-center mr-4" id="btn-search-mobile">
                    <i class="fa fa-search"></i>
                </span>

                <!-- Tombol filter (khusus mobile) -->
                <span class="d-md-none d-flex align-items-center" data-toggle="modal" data-target="#filterModal"
                    id="category-button">
                    <i class="fa fa-bars"></i>
                </span>
            </div>
        </div>
    </div>
    <div class="container-fluid py-4 px-4 text-white bg-black-secondary">
        <div class="row">
            <div class="col-md-10 col-12 order-2 order-md-1 center-content" id="catalog-col">
                <div class="row">
                    <div class="col-md-12">
                        <!-- Toolbar Responsif & Estetik -->
                        <div class="bg-black-secondary rounded shadow-sm p-3 mb-4">
                            <div
                                class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between">

                                <!-- Input Search -->
                                <div class="mb-md-0 mb-2 flex-grow-1 mr-2 order-1 order-md-3" id="search-form">
                                    <div class="input-group">
                                        <input type="text" id="search-input" class="form-control"
                                            placeholder="Search product..." value="{{ request()->query('search') }}"
                                            style="background-color: #171717; color: #FFF; border: 1px solid #444; border-right: none; padding: 10px;">

                                        <div class="input-group-prepend">
                                            <span class="input-group-text rounded-right"
                                                style="background-color: #171717; border: 1px solid #444; border-left: none; color: #aaa;">
                                                <i class="fas fa-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-row align-items-center justify-content-center">

                                    <!-- Tombol Back -->
                                    <div class="mb-2 mb-md-0 text-center text-md-left mr-2 order-1 d-none" id="backButton">
                                        <a href="javascript:void(0)" class="btn btn-outline-light w-100 w-md-auto"
                                            onclick="window.location.reload()">
                                            <i class="fa fa-arrow-left mr-1"></i> Back
                                        </a>
                                    </div>

                                    <!-- Tombol Home -->
                                    <div class="mb-2 mb-md-0 text-center text-md-left mr-2 order-1" id="homeButton">
                                        <a href="{{ route('catalog.index') }}"
                                            class="btn btn-outline-light w-100 w-md-auto">
                                            <i class="fa fa-home mr-1"></i> Home
                                        </a>
                                    </div>

                                    <!-- Tombol Download -->
                                    <div class="mb-2 mb-md-0  text-center text-md-right mr-2 order-2">
                                        <a href="#" class="btn btn-light w-100 w-md-auto" data-target="#pdfcatalog"
                                            data-toggle="modal">
                                            <i class="fa fa-arrow-down mr-1"></i> Catalog PDF
                                        </a>
                                    </div>

                                    <!-- filter versi -->
                                    <div class="mb-2 mb-md-0 text-center text-md-right mr-2 order-3" id="version-filter">
                                        <select id="version-select"
                                            class="form-control bg-dark text-white border-secondary">
                                            @forelse ($versions as $v)
                                                <option value="{{ $v->id }}"
                                                    {{ request('version_id') == $v->id ? 'selected' : '' }}>
                                                    Versi {{ $v->version }}
                                                </option>
                                            @empty
                                                <option value="" disabled>Tidak ada versi</option>
                                            @endforelse
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <!-- Slider Mockup -->
                <div id="mockup" class="d-none">
                    <div class="row mb-3">
                        <div class="col-12">
                            <div id="mockup-carousel" class="carousel slide carousel-fade">
                                <div class="carousel-inner" id="mockup-carousel-inner">
                                    <!-- Slide gambar akan di-inject lewat JS -->
                                </div>
                                <a class="carousel-control-prev" href="#mockup-carousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#mockup-carousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                                <ol id="mockup-carousel-indicators" class="carousel-indicators"></ol>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product list -->
                <div id="product-list">
                    <div class="row">
                        {{-- akan di isi js --}}
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
                                id="btn-download">Download PDF</button>
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
                                                <span id="modalCategory" class="text-muted text-uppercase"></span>
                                            </div>

                                            <!-- Detail Produk -->
                                            <div class="mb-2 text-dark w-100 px-2">
                                                <div id="modalVariants"></div>
                                                <div class="row mb-1 density">
                                                    <div class="col-4 col-sm-3 font-weight-bold" id="density">Density
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
                                                        <span class="font-italic text-muted">
                                                            Please choose an option above before order.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Thumbnail Gallery -->
                                            <div class="p-md-3 p-2 w-100">
                                                <div id="thumbnailGallery" class="row justify-content-start no-gutters">
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
                                    <i class="fas fa-cart-plus mr-2"></i>Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Kategori -->
            <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalLabel"
                aria-hidden="true">
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
@endsection
@section('footer')
    <footer class="footer mt-auto py-2 text-center bg-black-secondary text-white"
        style="position: fixed; bottom: 0; width: 100%; z-index: 100;">
        <strong>&copy; <a href="https://osborn.id" target="_blank" class="text-white">Osborn</a>.</strong> All rights
        reserved.
    </footer>
@endsection

@push('scripts')
    <script type="text/javascript">
        $(document).ready(function() {
            // Scroll to top button
            if ($(window).width() < 768) {
                $('#search-form').addClass('d-none');
            }
            $('#btn-search-mobile').on('click', function() {
                $('#search-form').toggleClass('d-none');
                $('#search-input').focus();
            });
        });
    </script>
@endpush
