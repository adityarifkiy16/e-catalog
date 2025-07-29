@extends('layouts.catalog')

@section('content')
    <a href="https://wa.me/6281390153602" class="btn btn-success btn-lg rounded-circle position-fixed"
        style="bottom: 20px; right: 20px; z-index: 999;">
        <i class="fab fa-whatsapp"></i>
    </a>
    <button type="button" class="btn btn-secondary rounded-circle  btn-lg" id="btn-scroll-top"
        style="display: none; position: fixed; bottom: 80px; right: 20px; z-index: 999;">
        <i class="fas fa-arrow-up"></i>
    </button>

    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100" style="background-color: #bbaa91;">
            <a href="https://osborn.id/" target="_blank" class="py-2"> <img src="{{ asset('dist/img/osborn.png') }}"
                    alt="osborn-logo" style="width: 130px; height: auto;"></a>
            <!-- Tombol hanya tampil di mobile -->
            <button class="btn btn-outline-light d-md-none" data-toggle="modal" data-target="#filterModal"
                id="category-button">
                <i class="fas fa-bars"></i> Filter
            </button>
            <!-- Form pencarian -->
            <div style="width: 300px;" class="input-group mb-2 d-none d-md-flex">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="background-color: white !important"><i
                            class="fas fa-search"></i></span>
                </div>
                <input type="text" id="search-input" class="form-control" placeholder="Search by..."
                    value="{{ request()->query('search') }}">
            </div>
        </div>
    </div>
    <div class="container-fluid py-4 px-4">
        <div class="row">
            <div class="col-md-10 col-12 order-2 order-md-1 center-content" id="catalog-col">
                <div class="row">
                    <div class="col-md-12">
                        <div
                            class="d-flex justify-content-center justify-content-md-start align-items-center mb-3 flex-row ">
                            <a href="#" class="btn btn-brown d-none mb-2 order-md-2 order-1" id="btn-download">
                                <i class="fa fa-file-download"></i> Download
                            </a>
                            <a href="{{ route('catalog.index') }}" class="btn btn-secondary mb-2 ml-2 order-md-2 order-1">
                                <i class="fa fa-home"></i> Home
                            </a>
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

                                            <div class="specifications order-2">
                                                <div class="spec-item d-flex align-items-center mb-2">
                                                    <i class="fas fa-cubes mr-2 text-muted"></i>
                                                    <span id="modalUkuran" class="text-dark"> Thickness: 3mm</span>
                                                </div>
                                                <div class="spec-item d-flex align-items-center mb-2">
                                                    <i class="fas fa-arrows-alt mr-2 text-muted"></i>
                                                    <span id="modalPanjang" class="text-dark"> Size: 5X20X20</span>
                                                </div>
                                            </div>

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
                    <div class="modal-content">
                        <div class="modal-header bg-light">
                            <h5 class="modal-title font-weight-bold" id="filterModalLabel">Filter By</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Tutup">
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
                                    <div id="category-container" class="d-none">
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
    <footer class="footer mt-auto py-2 text-center"
        style="position: fixed; bottom: 0; width: 100%; z-index: 100; background-color: #f8f9fa">
        <strong>&copy; <a href="https://osborn.id" target="_blank" class="text-dark">Osborn</a>.</strong> All rights
        reserved.
    </footer>
@endsection
