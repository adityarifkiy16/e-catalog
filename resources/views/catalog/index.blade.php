@extends('layouts.catalog')

@section('content')
    <a href="https://wa.me/6281390153602" class="btn btn-success btn-lg rounded-circle position-fixed"
        style="bottom: 20px; right: 20px; z-index: 999;">
        <i class="fab fa-whatsapp"></i>
    </a>

    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100" style="background-color: #1B1A55">
            <a href="https://osborn.id/" target="_blank" class="py-2"> <img src="{{ asset('dist/img/osborn.png') }}"
                    alt="osborn-logo" style="width: 130px; height: auto;"></a>
            <!-- Tombol hanya tampil di mobile -->
            <button class="btn btn-outline-light d-md-none" data-toggle="modal" data-target="#filterModal"
                id="category-button">
                <i class="fas fa-bars"></i> Filter
            </button>
        </div>
    </div>
    <div class="container-fluid py-4 px-4 bg-image">
        <div class="overlay-white"></div>
        <div class="row">
            <div class="col-md-10 col-12 order-2 order-md-2 center-content" id="catalog-col">
                <div class="row">
                    <div class="col-md-12">
                        <div
                            class="d-flex justify-content-between align-items-center mb-3 flex-column-reverse flex-md-row ">
                            <a href="#" class="btn btn-brown d-none mb-2 order-md-2 order-1" id="btn-download">
                                <i class="fa fa-file-download"></i> Unduh Katalog
                            </a>
                            <div style="width: 300px;" class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="background-color: white !important"><i
                                            class="fas fa-search"></i></span>
                                </div>
                                <input type="text" id="search-input" class="form-control" placeholder="Search by..."
                                    value="{{ request()->query('search') }}">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="product-list">
                    <div class="row">
                        @forelse ($data as $product)
                            <div class="col-md-3 mb-4">
                                <div class="card h-100 shadow-md product-card" data-code="{{ $product->code }}"
                                    data-category="{{ $product->category->name }}"
                                    data-image="{{ $product->photo ? asset('storage/' . $product->photo) : 'https://via.placeholder.com/300x200?text=No+Image' }}">
                                    <img src="{{ $product->photo ? asset('storage/' . $product->photo) : 'https://via.placeholder.com/300x200?text=No+Image' }}"
                                        class="card-img-top" alt="{{ $product->name }}"
                                        style="height: 200px; object-fit: cover;">
                                    <div class="card-body d-flex flex-column">
                                        <h4 class="card-title font-weight-bold text-uppercase mb-2"
                                            style="font-family: 'Poppins', sans-serif; font-size: 1.2rem; letter-spacing: 2px;">
                                            {{ $product->category->name ?? 'Tanpa Kategori' }}
                                        </h4>
                                        <h6 class="card-text text-muted">{{ $product->code }}</h6>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                                class="img-fluid mx-auto d-block mt-5" style="max-width: 100%; height: auto;">
                        @endforelse
                    </div>
                </div>
                <div id="loading" class="text-center d-none my-4">
                    <div class="spinner-grow text-primary mr-2" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success mr-2" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-danger mr-2" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-warning" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="productModalLabel">Detail Produk</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Tutup">
                                <span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body d-flex flex-column justify-content-center align-items-center">
                            <img id="modalImage" src="" class="img-fluid mb-3" alt="Product Image"
                                style="max-width: 60%; height: auto;">
                            <h4 id="modalCode" class="font-weight-bold"></h4>
                            <p id="modalCategory" class="text-muted"></p>
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
                            <h5>Jenis</h5>
                            @foreach ($jenis as $item)
                                <ul class="nav flex-column jenis-filter">
                                    <li class="nav-item"><a class="nav-link h6 jenis-link" href="#"
                                            data-jenis="{{ $item->id }}"><i
                                                class="fa fa-tags mr-2"></i>{{ $item->name }}</a>
                                    </li>
                                </ul>
                            @endforeach
                            <h5>Kategori</h5>
                            <!-- Daftar kategori -->
                            <ul class="nav flex-column" id="category-menu-item-modal">
                                <!-- Akan diisi oleh JS -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-2 col-12 order-1 order-md-1" id="filter-container">
                <div class="sidebar border-end">
                    <div class="accordion" id="accordionExample">
                        <div class="">
                            <div class="" id="headingOne">
                                <h3 class="mx-1">
                                    Filtered By
                                </h3>
                            </div>
                            <div id="" class="collapse show" aria-labelledby="headingOne"
                                data-parent="#accordionExample">
                                <div class="pt-2">
                                    <h5>Jenis</h5>
                                    @foreach ($jenis as $item)
                                        <ul class="nav flex-column jenis-filter">
                                            <li class="nav-item"><a class="nav-link h6 jenis-link" href="#"
                                                    data-jenis="{{ $item->id }}"><i
                                                        class="fa fa-tags mr-2"></i>{{ $item->name }}</a>
                                            </li>
                                        </ul>
                                    @endforeach
                                    <div id="category-container">
                                        <h5>Category</h5>
                                        <ul class="nav flex-column" id="category-menu-item">
                                            <!-- Kategori akan diisi oleh JavaScript -->
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

@push('scripts')
    <script>
        let delayTimer;
        let category = null;
        let currentPage = 1;
        let isLoading = false;
        let lastPage = false;
        let selectedJenis = null;

        $('#btn-download').on('click', function(e) {
            e.preventDefault();

            const $btn = $(this);
            $btn.prop('disabled', true); // disable tombol
            $btn.html(
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'
            );

            let url = "{{ route('catalog.pdf') }}?category=" + encodeURIComponent(category);
            window.open(url, '_blank');

            // Timeout untuk reset tombol (misal 10 detik)
            setTimeout(() => {
                $btn.prop('disabled', false).html('<i class="fa fa-file-download"></i> Unduh Katalog');
            }, 5000); // waktu unduh maksimum
        });

        const url = "{{ route('catalog') }}";

        function resetState() {
            currentPage = 1;
            isLoading = false;
            lastPage = false;
            $('#product-list').html('<div class="row"></div>');
        }

        function renderProducts(products) {
            let html = '';
            products.forEach(product => {
                const image = product.photo ?
                    `/storage/${product.photo}` :
                    'https://via.placeholder.com/300x200?text=No+Image';
                const categoryName = product.category?.name ?? 'Tanpa Kategori';

                html += `
                <div class="col-md-3 mb-4">
                    <div class="card h-100 shadow-sm product-card"
                    data-code="${product.code}"
                    data-category="${categoryName}"
                    data-image="${image}">
                        <img src="${image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${categoryName}</h4>
                            <h6 class="card-text text-muted mb-1">${product.code}</h6>
                        </div>
                    </div>
                </div>`;
            });
            $('#product-list .row').append(html);
        }

        function loadMoreData() {
            console.log("load more data");
            console.log(`category: ${category}`);
            console.log(`selectedJenis: ${selectedJenis}`);

            if (isLoading || lastPage) return;
            isLoading = true;
            $("#loading").removeClass("d-none")

            const search = $('#search-input').val();


            $.ajax({
                url: url,
                type: "GET",
                data: {
                    page: currentPage,
                    search,
                    jenis: selectedJenis,
                    category
                },
                success: function(response) {
                    const products = response.data.data ?? [];
                    if (products.length > 0) {
                        renderProducts(products);
                        currentPage++;
                        if (currentPage > response.data.last_page) lastPage = true;
                    } else {
                        if (currentPage === 1) {
                            $('#product-list .row').append(
                                `<img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                            class="img-fluid mx-auto d-block mt-5" style="max-width: 100%; height: auto;">`
                            );
                        }
                        lastPage = true;
                    }

                    // Update kategori
                    if (response.categories) {
                        let dropdown = `<li class="nav-item">`;
                        dropdown +=
                            `<a class="nav-link text-dark category-filter" href="#" data-id=""><i class="fa fa-tags mr-2"></i> Semua Produk</a>`;
                        response.categories.forEach(cat => {
                            dropdown +=
                                `<a class="nav-link text-dark category-filter" href="#" data-id="${cat.id}"><i class="fa fa-tags mr-2"></i> ${cat.name} ${cat.products_count > 0 ? `(${cat.products_count})` : ''}</a>`;
                        });
                        dropdown += `</li>`;
                        $('#category-menu-item, #category-menu-item-modal').html(dropdown);
                    } else {
                        $('#category-menu-item, #category-menu-item-modal').html(
                            `<li class="nav-item"><a class="nav-link font-weight-bold h6 text-danger" href="#">choose design first 😇</a></li>`
                        );
                    }

                    isLoading = false;
                },
                error: function() {
                    isLoading = false;
                    console.log('Gagal memuat data.');
                },
                complete: function() {
                    isLoading = false;
                    $("#loading").addClass("d-none");
                }
            });
        }

        $(document).ready(function() {
            const firstJenis = $('.jenis-link').first();
            if (firstJenis.length) {
                firstJenis.trigger('click');
            }
            $('#product-list').html('<div class="row"></div>');
            loadMoreData();

            $(window).scroll(function() {
                if ($(window).scrollTop() + $(window).height() >= $(document).height() - 150) {
                    loadMoreData();
                }
            });
        });

        $('#search-input').on('input', function() {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                resetState();
                loadMoreData();
            }, 500);
        });

        $(document).on('click', '.jenis-link', function(e) {
            e.preventDefault();
            $('#filterModal').modal('hide');
            selectedJenis = $(this).data('jenis');

            // Tampilkan atau sembunyikan sidebar
            if (selectedJenis) {
                $('#category-container').removeClass('d-md-none');
                if (window.innerWidth < 768) {
                    $('#filter-container').addClass('d-none');
                } else {
                    $('#filter-container').removeClass('d-none');
                }
                $('#catalog-col').removeClass('center-content');
            } else {
                $('#category-container').addClass('d-md-none d-none');
                $('#catalog-col').addClass('center-content');
            }

            // Reset dan load ulang
            resetState();
            category = null;
            loadMoreData();
        });

        $(document).on('click', '.category-filter', function(e) {
            console.log(category);
            e.preventDefault();
            category = $(this).data('id');
            resetState();
            $('#filterModal').modal('hide');
            loadMoreData();

            if (!category || category === 'null' || category === '') {
                $('#btn-download').addClass('d-none');
            } else {
                $('#btn-download').removeClass('d-none');
            }

        });

        $(document).on('click', '.product-card', function() {
            const image = $(this).data('image');
            const code = $(this).data('code');
            const category = $(this).data('category');
            $('#modalImage').attr('src', image);
            $('#modalCode').text(code);
            $('#modalCategory').text('Kategori: ' + category);
            $('#productModal').modal('show');
        });
    </script>
@endpush
