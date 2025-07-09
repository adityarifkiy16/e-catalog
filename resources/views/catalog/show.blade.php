@extends('layouts.catalog')

@section('content')
<a href="https://wa.me/6281390153602" class="btn btn-success btn-lg rounded-circle position-fixed"
    style="bottom: 20px; right: 20px; z-index: 999;">
    <i class="fab fa-whatsapp"></i>
</a>
<button type="button" class="btn btn-info rounded-circle  btn-lg" id="btn-scroll-top"
    style="display: none; position: fixed; bottom: 80px; right: 20px; z-index: 999;">
    <i class="fas fa-arrow-up"></i>
</button>

<div class="w-100 d-flex justify-content-center align-items-center">
    <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100" style="background-color: #1B1A55">
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
<div class="container-fluid py-4 px-4" style="background-color: #f5efe0">
    <div class="row">
        <div class="col-md-10 col-12 order-2 order-md-2 center-content" id="catalog-col">
            <div class="row">
                <div class="col-md-12">
                    <div
                        class="d-flex justify-content-between align-items-center mb-3 flex-column-reverse flex-md-row ">
                        <a href="#" class="btn btn-brown d-none mb-2 order-md-2 order-1" id="btn-download">
                            <i class="fa fa-file-download"></i> Unduh Katalog
                        </a>

                    </div>
                </div>
            </div>

            <!-- Slider Mockup -->
            <div id="mockup" class="d-none">
                <div class="row mb-2">
                    <div class="col-12">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner" id="mockup-carousel-inner">
                                <!-- Slide gambar akan di-inject lewat JS -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product list -->
            <div id="product-list">
                <div class="row">
                    @forelse ($data as $product)
                    <div class="col-md-3 mb-4">
                        <div class="h-100 product-card" data-code="{{ $product->code }}"
                            data-category="{{ $product->category->name ?? 'Tanpa Kategori' }}"
                            data-image="{{ $product->photo ? asset('storage/' . $product->photo) : 'https://via.placeholder.com/300x200?text=No+Image' }}">
                            <img src="{{ $product->photo ? asset('storage/' . $product->photo) : 'https://via.placeholder.com/300x200?text=No+Image' }}"
                                class="card-img-top" alt="{{ $product->name }}"
                                style="height: 200px; object-fit: cover;">
                            <div class="card-body bg-product-body text-center d-flex flex-column">
                                <h4 class="card-title font-weight-bold text-uppercase mb-2"
                                    style="font-family: 'Poppins', sans-serif; font-size: 1.2rem; letter-spacing: 2px;">
                                    {{ $product->code }}
                                </h4>
                                <h6 class="card-text text-muted">{{ $product->category->name ?? 'Tanpa Kategori' }}
                                </h6>
                            </div>
                        </div>
                    </div>
                    @empty
                    <div class="col-12">
                        <img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                            class="img-fluid mx-auto d-block my-5" style="max-width: 100%; height: auto;">
                    </div>
                    @endforelse
                </div>
            </div>

            <!-- Loading indicator -->
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

                        <!-- Carousel Gambar -->
                        <div id="modalCarousel" class="carousel slide mb-3" style="max-width: 60%;"
                            data-ride="carousel">
                            <div class="carousel-inner" id="carouselInner">
                                <!-- Slide gambar akan di-inject lewat JS -->
                            </div>
                            <a class="carousel-control-prev" href="#modalCarousel" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Sebelumnya</span>
                            </a>
                            <a class="carousel-control-next" href="#modalCarousel" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Berikutnya</span>
                            </a>
                        </div>
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
                        <h5 class="font-cocogoose">Jenis</h5>

                        <ul class="nav flex-column jenis-filter">
                            @foreach ($jenis as $item)
                            <li class="nav-item">
                                <a class="nav-link text-dark  h6 jenis-link" href="#"
                                    data-jenis="{{ $item->id }}"><i
                                        class="fa fa-check-square mr-2"></i>{{ $item->name }}</a>
                            </li>
                            @endforeach
                        </ul>

                        <h5 id="category-modal-item-label" class="font-cocogoose">Category</h5>
                        <!-- Daftar kategori -->
                        <ul class="nav flex-column" id="category-menu-item-modal">
                            <!-- Akan diisi oleh JS -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar Filter -->
        <div class="col-md-2 col-12 order-1 order-md-1 d-none" id="filter-container">
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
                                <h5 class="font-cocogoose">Jenis</h5>

                                <ul class="nav flex-column jenis-filter">
                                    @foreach ($jenis as $item)
                                    <li class="nav-item">
                                        <a class="nav-link text-dark  h6 jenis-link font-poppins" href="#"
                                            data-jenis="{{ $item->id }}"><i
                                                class="fa fa-check-square mr-2"></i>{{ $item->name }}</a>
                                    </li>
                                    @endforeach
                                </ul>

                                <div id="category-container">
                                    <h5 id="category-menu-item-label" class="font-cocogoose">Category</h5>
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
    let uniqueCategories = {};
    let shouldResetCategory = false;


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
    const productId = window.location.pathname.split('/').pop();


    function resetState() {
        console.log('resetState');
        currentPage = 1;
        isLoading = false;
        lastPage = false;
        uniqueCategories = {};
        $('#product-list').html('<div class="row"></div>');
    }

    function renderProducts(products) {
        console.log('products', products);
        let html = '';
        products.forEach((product) => {
            const image = product.photo ?
                `/storage/${product.photo}` :
                'https://via.placeholder.com/300x200?text=No+Image';
            const images = product.images.map(image => `/storage/${image.path}`);
            const categoryName = product.category?.name ?? 'Tanpa Kategori';

            if (product.category && product.category.display_style == 'square' || product.category.display_style == null) {
                html += `
                    <div class="col-md-3 mb-4">
                        <div class="h-100 product-card"
                    `;
            } else if (product.category && product.category.display_style == 'rectangle') {
                html += `
                    <div class="col-md-4 mb-4">
                        <div class="h-100 product-card"
                    `;
            }

            html += `
                    data-code="${product.code}"
                    data-category="${categoryName}"
                    data-image="${image}"
                    data-images=${JSON.stringify(images)}
                    >
                        <img src="${image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body bg-product-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${product.code}</h4>
                            <h6 class="card-text text-muted mb-1">${categoryName}</h6>
                        </div>
                    </div>
                </div>`;
        });
        $('#product-list .row').append(html);
    }

    function renderMockup(products) {
        console.log(uniqueCategories);
        console.log('renderMockup');
        // Hilangkan mockup
        $('#mockup').removeClass('d-none');

        // insert path tiap product
        products.forEach(product => {
            const cat = product.category;
            if (cat && cat.path && !uniqueCategories[cat.id]) {
                uniqueCategories[cat.id] = cat.path;
            }
        });

        const paths = Object.values(uniqueCategories);

        if (paths.length > 0) {
            const $carouselInner = $('#mockup-carousel-inner');
            $carouselInner.empty(); // Bersihkan isi sebelumnya

            paths.forEach((path, i) => {
                $carouselInner.append(`
                        <div class="carousel-item ${i === 0 ? 'active' : ''}">
                            <img src="/storage/${path}" id="mockup-image" alt="mockup" class="img-fluid w-100 h-100 rounded-lg"
                                    style="object-fit: cover; object-position: 5% 70%;">
                        </div>
                    `);
            });

            $('#mockup').removeClass('d-none');
        } else {
            $('#mockup').addClass('d-none');
        }
    }

    function loadMoreData() {
        console.log('loadMoreData');
        if (!category || category === 'null' || category === '') {
            $('#btn-download').addClass('d-none');
        } else {
            $('#btn-download').removeClass('d-none');
        }

        if (isLoading || lastPage) return;
        isLoading = true;
        $("#loading").removeClass("d-none")

        const search = $('#search-input').val();

        $.ajax({
            url: `/catalog/${category}?page=${currentPage}`,
            type: "GET",
            data: {
                page: currentPage,
                search,
                jenis: selectedJenis,
                category
            },
            success: function(response) {
                console.log("ajax response", response);
                const products = response.data.data ?? [];
                if (products.length > 0) {
                    renderMockup(products);
                    renderProducts(products);
                    currentPage++;
                    if (currentPage > response.data.last_page) lastPage = true;
                } else {
                    if (currentPage === 1) {
                        $('#mockup').addClass('d-none');
                        $('#product-list .row').append(
                            `<div class="col-12"><img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                            class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`
                        );
                    }
                    lastPage = true;
                }

                // Update label kategori
                if (response.jenis.categories) {
                    switch (response.jenis.name) {
                        case 'PVC Board':
                            $("#category-menu-item-label, #category-modal-item-label").html('Ketebalan');
                            break;
                        case 'Wallboard':
                            $("#category-menu-item-label, #category-modal-item-label").html('Motif');
                            break;
                        case 'Wallpanel':
                            $("#category-menu-item-label, #category-modal-item-label").html('Tipe');
                            break;
                        case 'UV Board':
                            $("#category-menu-item-label, #category-modal-item-label").html('Motif');
                            break;
                        default:
                            $("#category-menu-item-label, #category-modal-item-label").html('Kategori');
                    }
                    let dropdown = `<li class="nav-item font-poppins">`;
                    response.jenis.categories.forEach(cat => {
                        dropdown +=
                            `<a class="nav-link text-dark category-filter" href="#" data-jenis-id="${cat.jenis_id}" data-id="${cat.id}"><i class="fa fa-check-square mr-2"></i> ${cat.name} ${cat.products_count > 0 ? `(${cat.products_count})` : ''}</a>`;
                    });
                    dropdown += `</li>`;
                    $('#category-menu-item, #category-menu-item-modal').html(dropdown);
                    if (shouldResetCategory || !category) {
                        const firstCat = $(`.category-filter[data-jenis-id="${selectedJenis}"]`).first();
                        if (firstCat.length) {
                            category = firstCat.data('id');
                            console.log('Reset category to:', category);

                            $(`.category-filter[data-id="${category}"]`).addClass('active');
                            firstCat.addClass('active');
                        }
                        shouldResetCategory = false; // reset flag setelah digunakan
                    } else if (category) {
                        $(`.category-filter[data-id="${category}"]`).addClass('active');
                    }
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
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#btn-scroll-top').fadeIn();
            } else {
                $('#btn-scroll-top').fadeOut();
            }
        });

        $('#btn-scroll-top').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });

        const firstJenis = $('.jenis-link').first();

        if (firstJenis.length) {
            firstJenis.trigger('click');
        }

        $('#product-list').html('<div class="row"></div>');
        loadMoreData();

        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();

            if (scrollTop + windowHeight >= documentHeight - 150) {
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
        shouldResetCategory = true;
        $('.jenis-filter .jenis-link').removeClass('active');
        $(`.jenis-link[data-jenis="${selectedJenis}"]`).addClass('active');

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
        e.preventDefault();
        category = $(this).data('id');
        $('#filterModal').modal('hide');
        resetState();
        loadMoreData();
    });

    $(document).on('click', '.product-card', function() {
        const images = $(this).data('images');
        const code = $(this).data('code');
        const category = $(this).data('category');
        $('#modalCode').text(code);
        $('#modalCategory').text('Kategori: ' + category);
        const $carouselInner = $('#carouselInner');
        $carouselInner.empty();

        images.forEach((imgUrl, index) => {
            $carouselInner.append(`
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${imgUrl}" class="d-block w-100" alt="Gambar ${index + 1}">
                </div>
                `);
        });
        $('#productModal').modal('show');
    });
</script>
@endpush