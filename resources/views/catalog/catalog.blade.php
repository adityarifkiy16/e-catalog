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
                                    <!-- Tombol Home -->
                                    <div class="mb-2 mb-md-0 text-center text-md-left mr-2 order-1">
                                        <a href="{{ route('catalog.index') }}"
                                            class="btn btn-outline-light w-100 w-md-auto">
                                            <i class="fa fa-home mr-1"></i> Home
                                        </a>
                                    </div>

                                    <!-- Tombol Download -->
                                    <div class="mb-2 mb-md-0  text-center text-md-right mr-2 order-2">
                                        <a href="#" class="btn btn-light w-100 w-md-auto" id="btn-download">
                                            <i class="fa fa-arrow-down mr-1"></i> Download
                                        </a>
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
                            <div id="carouselExampleControls" class="carousel slide carousel-fade" data-ride="carousel">
                                <div class="carousel-inner" id="mockup-carousel-inner">
                                    <!-- Slide gambar akan di-inject lewat JS -->
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button"
                                    data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button"
                                    data-slide="next">
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

            <!-- Modal -->
            <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header text-white" style="background: #000">
                            <h5 class="modal-title font-weight-bold" id="productModalLabel">Detail</h5>
                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Tutup">
                                <span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row d-flex flex-row justify-content-center align-items-center">
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
                                    <div class="col-md-6 col-12">
                                        <div
                                            class="product-details d-flex flex-column justify-content-center align-items-center justify-content-md-start ">
                                            <h3 id="modalCode" class="font-weight-bold mb-2 text-dark order-2"></h3>

                                            <div class="mb-3 order-2">
                                                <span id="modalCategory" class="text-muted text-uppercase"></span>
                                            </div>
                                            <div class="mb-3 order-2 d-flex flex-column text-dark">
                                                <div class="row mb-1" id="panjang">
                                                    <div class="col-3"><strong>Length</strong></div>
                                                    <div class="col-auto">:</div>
                                                    <div class="col" id="modalLength"></div>
                                                </div>
                                                <div class="row mb-1" id="tinggi">
                                                    <div class="col-3"><strong>Height</strong></div>
                                                    <div class="col-auto">:</div>
                                                    <div class="col" id="modalHeight"></div>
                                                </div>
                                                <div class="row mb-1" id="ketebalan">
                                                    <div class="col-3"><strong>Thickness</strong></div>
                                                    <div class="col-auto">:</div>
                                                    <div class="col" id="modalDensity"></div>
                                                </div>
                                                <div class="row mb-2" id="kepadatan">
                                                    <div class="col-3"><strong>Density</strong></div>
                                                    <div class="col-auto">:</div>
                                                    <div class="col" id="modalKepadatan"></div>
                                                </div>
                                                <div class="row mb-1" id="notes">
                                                    <div class="col">
                                                        <small class="text-muted">
                                                            *Please choose a density option before order.
                                                        </small>
                                                    </div>
                                                </div>

                                            </div>

                                            {{-- <div class="specifications order-2">
                                                <div class="spec-item d-flex align-items-center mb-2">
                                                    Tipe
                                                    <span id="modalTipe" class="text-dark"> </span>
                                                </div>
                                                <div class="spec-item d-flex align-items-center mb-2">
                                                    Ukuran
                                                    <span id="modalPanjang" class="text-dark"></span>
                                                </div>
                                            </div> --}}

                                            <div class="d-flex flex-row order-2">

                                            </div>
                                            <!-- Tambahan thumbnail gambar -->
                                            <div class="my-4 order-1 order-md-1">
                                                <div id="thumbnailGallery"
                                                    class="d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-md-start">
                                                    <!-- Foto kecil akan di-inject lewat JS -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="modal-footer d-flex justify-content-center align-items-center justify-content-md-end align-items-md-center">
                            <div class="mt-2 d-flex flex-wrap">
                                <a class="btn btn-md modalDownload text-white" style="background: #000"
                                    id="modalDownload" href="#" target="_blank">
                                    <i class="fas fa-arrow-down mr-2"></i>Download
                                </a>
                            </div>

                            <div class="mt-2 d-flex flex-wrap ml-2">
                                <a class="btn btn-md btn-outline-secondary modalContact" id="modalContact" href="#"
                                    target="_blank">
                                    <i class="fas fa-cart-plus mr-2"></i>Order
                                </a>
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
                                <!-- Daftar kategori -->
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
