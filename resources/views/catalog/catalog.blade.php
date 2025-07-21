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
        <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100" style="background-color: #000;">
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
                        <div class="d-flex justify-content-start align-items-center mb-3 flex-column-reverse flex-md-row ">
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
                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
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
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title font-weight-bold" id="productModalLabel">Detail</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Tutup">
                                <span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row d-flex justify-content-center">
                                    <!-- Gambar produk - kolom kiri -->
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
                                        <div class="product-details">
                                            <h3 id="modalCode" class="font-weight-bold mb-2 text-dark"></h3>

                                            <div class="mb-3">
                                                <span id="modalCategory" class="text-muted text-lowercase"></span>
                                            </div>

                                            <div class="specifications">
                                                <div class="spec-item d-flex align-items-center mb-2">
                                                    <i class="fas fa-ruler mr-2 text-muted"></i>
                                                    <span id="modalUkuran" class="text-dark"> Ukuran: 3mm</span>
                                                </div>
                                                <div class="spec-item d-flex align-items-center mb-2">
                                                    <i class="fas fa-arrows-alt mr-2 text-muted"></i>
                                                    <span id="modalPanjang" class="text-dark"> Panjang: 5X20X20</span>
                                                </div>
                                            </div>

                                            <!-- Tambahan elemen untuk responsif -->
                                            <div class="mt-4 d-flex flex-wrap gap-2">
                                                <a class="btn btn-sm btn-outline-secondary modalDownload"
                                                    id="modalDownload" href="#" target="_blank">
                                                    <i class="fas fa-download mr-1"></i> Download as PDF
                                                </a>
                                            </div>

                                            <!-- Tambahan thumbnail gambar -->
                                            <div class="mt-4">
                                                <h6 class="font-weight-bold mb-2">Preview Image</h6>
                                                <div id="thumbnailGallery" class="d-flex flex-wrap gap-2">
                                                    <!-- Foto kecil akan di-inject lewat JS -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

@push('scripts')
    <script>
        let delayTimer;
        let category = null;
        let currentPage = 1;
        let isLoading = false;
        let lastPage = false;
        let selectedJenis = null;
        const uniquePaths = new Set();

        $(document).ready(function() {

            selectedJenis = new URLSearchParams(window.location.search).get('jenis');
            loadMoreData();

            if (selectedJenis) {
                $('#category-container').removeClass('d-md-none');
                $('#catalog-col').removeClass('center-content');
            }


            if ($(window).width() < 768) {
                $('#filter-container').addClass('d-none');
            }

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

        $(document).on('click', '.modalDownload', function(e) {
            e.preventDefault();

            const productId = $(this).data('id');

            const $btn = $(this);
            $btn.prop('disabled', true); // disable tombol
            $btn.html(
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'
            );

            let url = "{{ route('catalog.pdf.product') }}?id=" + encodeURIComponent(productId);
            window.open(url, '_blank');

            // Timeout untuk reset tombol (misal 10 detik)
            setTimeout(() => {
                $btn.prop('disabled', false).html('<i class="fa fa-file-download"></i> Download');
            }, 5000); // waktu unduh maksimum
        });


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
                $btn.prop('disabled', false).html('<i class="fa fa-file-download"></i> Download');
            }, 5000); // waktu unduh maksimum
        });

        function resetState() {
            console.log('resetState');
            currentPage = 1;
            isLoading = false;
            lastPage = false;
            uniquePaths.clear();
            $('#product-list').html('<div class="row"></div>');
        }

        function prepareImageOrder(images) {
            return images
                .slice()
                .sort((a, b) => {
                    if (a.pivot.motif && !b.pivot.motif) {
                        return -1;
                    } else if (!a.pivot.motif && b.pivot.motif) {
                        return 1;
                    } else {
                        return 0;
                    }
                }).map((image) => "/storage/" + image.path);
        }

        function renderProducts(products) {
            let html = '';
            products.forEach((product) => {
                const image = product.photo ?
                    `/storage/${product.photo}` :
                    'https://via.placeholder.com/300x200?text=No+Image';

                const orderedImage = prepareImageOrder(product.images);

                // Masukkan gambar utama di paling depan
                const allImages = [image, ...orderedImage];

                // Simpan array ini sebagai string JSON yang aman untuk HTML
                const imagesJson = JSON.stringify(allImages).replace(/"/g, '&quot;');

                const categoryName = product.category?.name ?? 'Tanpa Kategori';

                // Tampilan sesuai bentuk
                if (product.category?.display_style === 'square' || selectedJenis === null) {
                    html += `
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `;
                } else if (product.category?.display_style === 'rectangle') {
                    html += `
                    <div class="col-md-4 mb-4">
                        <div class="h-100 product-card"
                    `;
                } else {
                    html += `
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `;
                }

                html += `
                    data-id="${product.id}"
                    data-code="${product.code}"
                    data-category="${categoryName}"
                    data-jenis="${product.category?.jenis?.name ?? ''}"
                    data-images="${imagesJson}"
                    data-image="${image}"
                    >
                       <img 
                            src="${image}" 
                            class="card-img-top" 
                            alt="${product.name}" 
                            style="
                                border : 1px solid #ccc;
                                height: 200px; 
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${product.category?.jenis?.name === 'PVC Board' ? 'bottom center' : 'center center'};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${product.code}</h4>
                            <h6 class="card-text text-muted mb-1">${categoryName}</h6>
                        </div>
                    </div>
                </div>`;
            });
            $('#product-list .row').append(html);
        }

        function renderMockup(products) {
            // jika tidak ada jenis dipilih maka skip fungsi render produk
            if (selectedJenis == null) {
                return
            }

            // Ambil path dari setiap product.images
            products.forEach(product => {
                (product.images ?? []).forEach(image => {
                    console.log('image', image);
                    const isMotif = Boolean(image.pivot.motif); // true untuk nilai truthy
                    if (image.path && !isMotif) {
                        uniquePaths.add(image.path);
                    }
                });
            });


            const paths = Array.from(uniquePaths);
            const $carouselInner = $('#mockup-carousel-inner');
            $carouselInner.empty();

            if (paths.length > 0) {
                paths.forEach((path, i) => {
                    $carouselInner.append(`
                        <div class="carousel-item ${i === 0 ? 'active' : ''}">
                            <img src="/storage/${path}" id="mockup-image" alt="mockup" 
                                class="img-fluid w-100 rounded-lg d-block mx-auto"
                                style="
                                    max-width: 100%;
                                    max-height: 80vh;
                                    width: auto;
                                    height: auto;
                                    object-fit: cover;
                                    margin: 0 auto;
                                    display: block; 
                                ">
                        </div>
                    `);
                });
                $('#mockup').removeClass('d-none');
            } else {
                $('#mockup').addClass('d-none');
            }

            if (paths.length <= 1) {
                const nextArrow = $('#mockup .carousel-control-next');
                const prevArrow = $('#mockup .carousel-control-prev');
                nextArrow.addClass('d-none');
                prevArrow.addClass('d-none');
            }
        }

        function renderCarouselProduct(images) {
            $('#carousel-product-image').empty();
            $('#thumbnailGallery').empty(); // kosongkan galeri dulu

            images.forEach((img, i) => {
                const activeClass = i === 0 ? 'active' : '';

                // Carousel utama
                $('#carousel-product-image').append(`
                    <div class="carousel-item ${activeClass}">
                        <img src="${img}" class="img-fluid d-block mx-auto"
                            style="
                                width: 35rem;
                                max-width: 50vw;
                                height: auto;
                                max-height: 70vh;
                                object-fit: contain;
                            ">
                    </div>
                `);

                // Tambahkan thumbnail
                $('#thumbnailGallery').append(`
                    <img src="${img}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${i}">
                `);
            });

            // Sembunyikan kontrol jika hanya 1 gambar
            if (images.length <= 1) {
                $('#carouselProduct .carousel-control-next').addClass('d-none');
                $('#carouselProduct .carousel-control-prev').addClass('d-none');
            } else {
                $('#carouselProduct .carousel-control-next').removeClass('d-none');
                $('#carouselProduct .carousel-control-prev').removeClass('d-none');
            }

            // Thumbnail click event
            $('#thumbnailGallery').on('click', '.thumbnail-image', function() {
                const index = $(this).data('index');
                $('#carouselProduct .carousel-item').removeClass('active');
                $('#carouselProduct .carousel-item').eq(index).addClass('active');
            });
        }


        function loadMoreData() {
            console.log('loadMoreData');
            console.log('category', category);
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
                url: `/catalog`,
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
                    if (response.jenis?.categories) {
                        console.log('ajax categories', response.jenis.categories);
                        if (response.jenis.categories.length === 0) {
                            $("#category-container").addClass("d-none");
                        } else {
                            $("#category-container").removeClass("d-none");
                        }
                        switch (response.jenis.name) {
                            case 'PVC Board':
                                $("#category-container, #category-modal-container").addClass("d-none");
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
                            dropdown += `
                                <a class="nav-link text-dark category-filter d-flex align-items-center justify-content-start" href="#" data-jenis-id="${cat.jenis_id}" data-id="${cat.id}">
                                    <img src="${cat.image ?? 'dist/img/product/1.webp'}" alt="${cat.name}" class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                                    <span>${cat.name} ${cat.products_count > 0 ? `(${cat.products_count})` : ''}</span>
                                </a>`;
                        });

                        dropdown += `</li>`;
                        $('#category-menu-item, #category-menu-item-modal').html(dropdown);

                        if (!category) {
                            const firstCat = $(`.category-filter[data-jenis-id="${selectedJenis}"]`).first();
                            if (firstCat.length) {
                                category = firstCat.data('id');
                                console.log('Reset category to:', category);
                                // Trigger ulang load
                                resetState();
                                loadMoreData();
                                return;
                            }
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

        $('#search-input').on('input', function() {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                resetState();
                loadMoreData();
            }, 500);
        });

        $(document).on('click', '.category-filter', function(e) {
            e.preventDefault();
            category = $(this).data('id');
            $('#filterModal').modal('hide');
            resetState();
            loadMoreData();
        });

        $(document).on('click', '.product-card', function() {
            const code = $(this).data('code');
            const category = $(this).data('category');
            const images = JSON.parse($(this).attr('data-images').replace(/&quot;/g, '"'));
            const jenis = $(this).data('jenis');
            renderCarouselProduct(images);
            $('#modalCode').text(code);
            $('#modalCategory').text(jenis + ' / ' + category);
            $('#modalDownload').data('id', $(this).data('id'));
            $('#productModal').modal('show');
        });
    </script>
@endpush
