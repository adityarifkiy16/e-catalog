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
            <!-- category list -->
            <div id="category-list">
                <div class="row">
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
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar Filter -->
        <div class="col-md-2 col-12 order-1 order-md-1" id="filter-container">
            <div class="sidebar border-end">
                <div class="accordion" id="accordionExample">
                    <div>
                        <div class="" id="headingOne">
                            <h3>
                                Filtered By
                            </h3>
                        </div>
                        <div class="collapse show" aria-labelledby="headingOne"
                            data-parent="#accordionExample">
                            <div class="pt-2">
                                <h5 class="font-cocogoose">Produk</h5>
                                <ul class="nav flex-column jenis-filter">
                                    @foreach ($jenis as $item)
                                    <li class="nav-item">
                                        <a class="nav-link text-dark  h6 jenis-link font-poppins" href="#"
                                            data-jenis="{{ $item->id }}"><i
                                                class="fa fa-check-square mr-2"></i>{{ $item->name }}</a>
                                    </li>
                                    @endforeach
                                </ul>
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

    const url = "{{ route('catalog') }}";

    function resetState() {
        console.log('resetState');
        currentPage = 1;
        isLoading = false;
        lastPage = false;
        uniqueCategories = {};
        $('#category-list').html('<div class="row"></div>');
    }

    // rendering gambar thumbnail category
    function renderCategories(categories) {
        console.log('categories', categories);
        let html = '';
        const total = categories.length;
        categories.forEach((category, index) => {
            const image = category.path ?
                `/storage/${category.path}` :
                'https://placehold.jp/3d4070/ffffff/150x150.png';
            const categoryName = category?.name ?? 'Tanpa Kategori';

            // Jika jumlah total ganjil dan ini adalah elemen terakhir, buat full width
            const isLastAndOdd = total % 2 === 1 && index === total - 1;
            const colClass = isLastAndOdd ? 'col-md-12' : 'col-md-6';

            html += `
                    <div class="${colClass} col-12 mb-4">
                        <div class="h-100 category-card"
                    `;

            html += `
                    data-id="${category.id}"
                    data-jenis="${category.jenis_id}"
                    >
                        <img src="${image}" class="card-img-top" alt="${category.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body bg-product-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${category.name}</h4>
                        </div>
                    </div>
                </div>`;
        });
        $('#category-list .row').append(html);
    }

    function loadMoreData() {
        console.log('loadMoreData');
        console.log('Request page: ', currentPage);
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
            url: url,
            type: "GET",
            data: {
                page: currentPage,
                search,
                jenis: selectedJenis,
                category
            },
            success: function(response) {
                console.log(response);
                const categories = response.data.data ?? [];
                if (categories.length > 0) {
                    renderCategories(categories);
                    currentPage++;
                    if (currentPage > response.data.last_page) lastPage = true;
                } else {
                    if (currentPage === 1) {
                        $('#category-list .row').append(
                            `<div class="col-12"><img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                            class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`
                        );
                    }
                    lastPage = true;
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
        selectedJenis = new URLSearchParams(window.location.search).get('jenis') || null;
        $('#category-list').html('<div class="row"></div>');
        loadMoreData();

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
            if (window.innerWidth < 768) {
                $('#filter-container').addClass('d-none');
            } else {
                $('#filter-container').removeClass('d-none');
            }
            $('#catalog-col').removeClass('center-content');
        } else {
            $('#catalog-col').addClass('center-content');
        }

        // Reset dan load ulang
        resetState();
        category = null;
        loadMoreData();
    });

    $(document).on('click', '.category-card', function() {
        const categoryId = $(this).data('id');
        const jenisId = $(this).data('jenis');
        const $carouselInner = $('#carouselInner');
        window.location.href = `/catalog?jenis=${jenisId}&category=${categoryId}`;
    });
</script>
@endpush