import { bindDownloadButtons } from './modules/download';
import { bindOrderButton } from './modules/orderButton';
import { initScrollTopButton } from './modules/scroll';
import { resetState, setCatalogConfig, loadMoreData } from './modules/catalogLoader';
import { bindFilterButton } from './modules/filter';
import { renderProducts } from './modules/renderProduct';

$(document).ready(function () {
    let selectedJenis = new URLSearchParams(window.location.search).get('jenis');
    let category = new URLSearchParams(window.location.search).get('category');
    let firstLoad = true;
    let delayTimer;
    let scrollTimer;

    if (selectedJenis == 5 || selectedJenis == 2) {
        sessionStorage.removeItem('selectedWallpanel');
    }

    setCatalogConfig({ selectedJenis, category });
    loadMoreData();

    if (selectedJenis) {
        $('#category-container').removeClass('d-md-none');
        $('#catalog-col').removeClass('center-content');
    }

    if ($(window).width() < 768) {
        $('#filter-container').addClass('d-none');
    }

    if (selectedJenis == 1 || selectedJenis == 3 || selectedJenis == 4) {
        $('#filter-container').addClass('d-none');
        $('#catalog-col').removeClass('col-md-10');
        $('#catalog-col').addClass('col-md-12');
    }

    $('#search-input').on('input', function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            resetState();
            loadMoreData();
        }, 500);
    });

    $(window).on('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();
            if (scrollTop + windowHeight >= documentHeight - 150) {
                loadMoreData();
            }
        }, 200);
    });

    function renderCarouselProduct(images, wallpanelImages = null, jenis = null) {
        $('#carousel-product-image').empty();
        $('#thumbnailGallery').empty();
        let newimages = [...images];

        if (jenis.toLowerCase() == 'uv board') {
            newimages = [...images, ...wallpanelImages];
        } else {
            newimages = [...images];
        }

        newimages.forEach((img, i) => {
            const activeClass = i === 0 ? 'active' : '';

            // Carousel utama
            $('#carousel-product-image').append(`
                    <div class="carousel-item ${activeClass}">
                        <img src="${img}" class="img-fluid d-block mx-auto"
                            style="
                                width: 100%;
                                max-width: 400px;
                                aspect-ratio: 1 / 1;
                                object-fit: cover;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                            ">
                    </div>
                `);

            $('#thumbnailGallery').append(`
                    <div class="col-2 mb-0 d-flex justify-content-center">
                        <div style="height: 90%">
                           <img src="${img}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${i}">
                        </div>
                    </div>
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

        // Handling klik thumbnail di dalam modal
        $('#thumbnailGallery').on('click', '.thumbnail-image', function () {
            const index = $(this).data('index');
            $('#carouselProduct .carousel-item').removeClass('active');
            $('#carouselProduct .carousel-item').eq(index).addClass('active');
        });
    }

    $(document).on('click', '.product-card', function () {
        const code = $(this).data('code');
        const category = $(this).data('category');
        const imagesStr = $(this).attr('data-images');
        const type = $(this).data('type');
        let images = null;

        // gambar statik paket
        let staticImages = [
            { path: `/dist/img/paket/1.png?v=${Date.now()}` },
            { path: `/dist/img/paket/2.png?v=${Date.now()}` },
            { path: `/dist/img/paket/3.png?v=${Date.now()}` }
        ];
        staticImages = staticImages.map((img) => img.path);

        if (imagesStr) {
            images = JSON.parse(imagesStr.replace(/&quot;/g, '"'));
        }

        const jenis = $(this).data('jenis');
        const length = parseInt($(this).data('length'), 10);
        const height = parseInt($(this).data('height'), 10);
        const density = parseInt($(this).data('density'), 10);
        const productId = $(this).data('id');

        // Click card tipe wallpanel load product category terkait
        if (jenis === 'tipe-wallpanel') {
            resetState();
            setCatalogConfig({ selectedJenis: 3, type: type });
            loadMoreData(false);
            $('#filter-container').toggleClass('d-none');
            $('#catalog-col').toggleClass('col-md-10 col-md-12');
            return;
        }

        if (jenis.toLowerCase() === 'uv board') {
            $('#ketebalan, #kepadatan').hide();
            $('#modalCategory').text(category);
            $('#modalLength').text(length && !isNaN(length) ? length + ' cm' : '-');
            $('#modalHeight').text(height && !isNaN(height) ? height + ' cm' : '-');
            $('#modalPaket').html(`
                <span class="badge badge-pill badge-outline-primary px-2 py-1 kepadatan" data-value="1">1</span>
                <span class="badge badge-pill badge-outline-primary px-2 py-1 ml-1 kepadatan" data-value="2">2</span>
                <span class="badge badge-pill badge-outline-primary px-2 py-1 ml-1 kepadatan" data-value="3">3</span>
            `);
        }

        if (jenis.toLowerCase() === 'wallboard') {
            $('#modalCategory').text(category);
            $('#modalLength').text(length && !isNaN(length) ? length + ' cm' : '-');
            $('#modalHeight').text(height && !isNaN(height) ? height + ' cm' : '-');
            $('#ketebalan, #kepadatan, #notes, .paket').hide();
        }

        if (jenis === 'PVC Board') {
            $('#modalCategory').text(jenis);
            $('#modalLength').text(length && !isNaN(length) ? length + ' cm' : '-');
            $('#modalHeight').text(height && !isNaN(height) ? height + ' cm' : '-');
            $('#modalDensity').text(density && !isNaN(density) ? density + ' mm' : '-');
            $('#modalKepadatan').html(`
                <span class="badge badge-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `);
            $('.paket').hide();
        }

        if (jenis === 'Wallpanel') {
            $('#modalContact').data('type', type);
            $('#modalCategory').text(category + ' / ' + type);
            $('#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket').hide();
        }

        if (jenis.toLowerCase() === 'aksesoris') {
            $('#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket').hide();
            $('#modalCategory').text(category);
        }

        renderCarouselProduct(images, staticImages, jenis);
        $('#modalCode').text(code);
        $('#productModalLabel').text(code);
        $('#modalDownload').data('id', productId);
        $('#productModal').modal('show');
        $('#modalContact').data('jenis', jenis);
        $('#modalContact').data('category', category);
        $('#modalContact').data('code', code);

        // ambil data lagi untuk debug
        let modalkepadatan = $('#modalContact').data('kepadatan');
        let modalPaket = $('#modalContact').data('paket');

        // kalau ada kepadatan tersimpan → pastikan badge sesuai aktif
        if (modalkepadatan) {
            $('.kepadatan').removeClass('active');
            $('#modalContact').data('kepadatan', null);
            $('#notes').show();
        }

        if (modalPaket) {
            $('.kepadatan').removeClass('active');
            $('#modalContact').data('kepadatan', null);
            $('#notes').show();
        }
    });

    $(document).on('click', '.kepadatan', function () {
        let kepadatan = $(this).data('value');

        // cari modal terdekat biar tidak global
        const $modal = $(this).closest('#productModal');

        // reset active di modal ini
        $modal.find('.kepadatan').removeClass('active');
        $(this).addClass('active');

        // sembunyikan notes
        $('#notes').hide();

        // simpan data kepadatan
        $('#modalContact').data('kepadatan', kepadatan);
    });

    bindFilterButton(selectedJenis);
    bindDownloadButtons();
    bindOrderButton();
    initScrollTopButton();
});
