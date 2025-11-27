import { bindDownloadButtons } from './modules/download';
import { bindOrderButton } from './modules/orderButton';
import { initScrollTopButton } from './modules/scroll';
import { resetState, setCatalogConfig, loadMoreData, setFirstLoad, getIsLoading } from './modules/catalogLoader';
import { bindFilterButton } from './modules/filter';
import { renderVariantsToModal } from './modules/renderVariant';
import { bindFilterVersion } from './modules/bindFilterVersion';

// ===== Responsive Handling =====
export function toggleCategoryLayout({ selectedJenis = null, hasCategory = false, isRenderTypes = false }) {
    const $filter = $('#filter-container');
    const $categoryContainer = $('#category-container');
    const $catalog = $('#catalog-col');

    // Default responsive behavior
    const isMobile = $(window).width() < 768;

    // Reset state dulu
    $filter.removeClass('d-none');
    $categoryContainer.removeClass('d-none');
    $catalog.removeClass('col-md-12 col-md-9');

    // ====== LOGIKA INTI ======

    // 1. Jika sedang render types → sembunyikan semua kategori
    if (isRenderTypes) {
        $filter.addClass('d-none');
        $categoryContainer.addClass('d-none');
        $catalog.addClass('col-md-12');
        return;
    }

    // 2. Jika jenis = 1 → sembunyikan kategori total
    if (selectedJenis == 1) {
        $filter.addClass('d-none');
        $categoryContainer.addClass('d-none');
        $catalog.addClass('col-md-12');
        return;
    }

    // 3. Jika tidak ada kategori → sembunyikan sidebar & buat full
    if (!hasCategory) {
        $filter.addClass('d-none');
        $categoryContainer.addClass('d-none');
        $catalog.addClass('col-md-12');
        return;
    }

    // 4. Kalau kategori ada, tampilkan sidebar (kecuali di mobile)
    if (isMobile) {
        $filter.addClass('d-none');
        $categoryContainer.removeClass('d-none');
    } else {
        $filter.removeClass('d-none');
        $categoryContainer.removeClass('d-none');
    }

    // Sidebar aktif → catalog 9 kolom
    $catalog.addClass('col-md-9');
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedJenis = urlParams.get('jenis');
    const selectedVersion = urlParams.get('version');
    const category = urlParams.get('category');

    let delayTimer;
    let scrollTimer;
    let scrollLock = false;

    setCatalogConfig({ selectedJenis, category, selectedVersion });
    loadMoreData();

    // panggil pertama kali + on resize
    toggleCategoryLayout({ selectedJenis, hasCategory: category, isRenderTypes: false });
    $(window).on('resize', () => toggleCategoryLayout({ selectedJenis, hasCategory: category, isRenderTypes: false }));

    // ===== Search debounce =====
    $('#search-input').on('input', function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            resetState();
            loadMoreData();
        }, 500);
    });

    // ===== Infinite Scroll =====
    $(window).on('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(async () => {
            if (scrollLock || getIsLoading()) return;

            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();

            if (scrollTop + windowHeight >= documentHeight - 150) {
                scrollLock = true;
                try {
                    setFirstLoad(false);
                    await loadMoreData();
                } finally {
                    scrollLock = false;
                }
            }
        }, 200);
    });

    // ===== Modal Product Handling =====
    function renderCarouselProduct(images, wallpanelImages = [], jenis = '') {
        $('#carousel-product-image').empty();
        $('#thumbnailGallery').empty();

        let newImages = images || [];
        if (jenis?.toLowerCase() === 'uv board' && wallpanelImages.length) {
            newImages = [...images, ...wallpanelImages];
        }

        // Lazy Loading observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = $(entry.target);
                        img.attr('src', img.data('src')); // load image
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '100px' }
        );

        newImages.forEach((img, i) => {
            const activeClass = i === 0 ? 'active' : '';

            // FULL image lazy, start with placeholder
            $('#carousel-product-image').append(`
                <div class="carousel-item ${activeClass}">
                    <img data-src="${img}" 
                        src="/dist/img/placeholder.png"
                        class="img-fluid d-block mx-auto lazy-modal-img"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `);

            // Thumbnail tetap load cepat (kecil)
            $('#thumbnailGallery').append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img 
                            data-src="${img}" 
                            src="/dist/img/placeholder.png" 
                            class="img-thumbnail thumbnail-image lazy-modal-img p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${i}"
                        >
                    </div>
                </div>
            `);
        });

        // Observasi semua img baru
        $('.lazy-modal-img').each(function () {
            observer.observe(this);
        });

        // Hide arrows if only 1 image
        if (newImages.length <= 1) {
            $('#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev').addClass('d-none');
        } else {
            $('#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev').removeClass('d-none');
        }

        $('#carouselProduct').carousel({ interval: 3000, pause: false });

        // Thumbnail click
        let carouselTimeout;
        $('#thumbnailGallery')
            .off('click')
            .on('click', '.thumbnail-image', function () {
                const index = $(this).data('index');
                $('#carouselProduct').carousel(index);

                $('.thumbnail-image').removeClass('active-thumbnail');
                $(this).addClass('active-thumbnail');
                setTimeout(() => $(this).removeClass('active-thumbnail'), 500);

                $('#carouselProduct').carousel('pause');
                clearTimeout(carouselTimeout);
                carouselTimeout = setTimeout(() => {
                    $('#carouselProduct').carousel('cycle');
                }, 5000);
            });
    }

    $(document)
        .off('click', '.product-card')
        .on('click', '.product-card', function () {
            const productId = $(this).data('id');
            const code = $(this).data('code');
            const name = $(this).data('name');
            const category = $(this).data('category');
            const type = $(this).data('type');
            const jenis = $(this).data('jenis');
            const length = parseInt($(this).data('length'), 10);
            const width = parseFloat($(this).data('width')).toFixed(1);
            const density = parseFloat($(this).data('density')).toFixed(1);
            const urlVideo = $(this).data('url');
            const specifications = JSON.parse($(this).attr('data-specifications') || '[]');
            const imagesStr = $(this).attr('data-images');
            const packages = JSON.parse($(this).attr('data-paket') || '[]');
            let height = $(this).data('height');
            let imageType = $(this).data('type-image');
            let images = [];
            let packagesImgs = [];

            if (jenis !== 'card-types') {
                viewProduct(productId);
            }

            if (imagesStr) {
                try {
                    images = JSON.parse(imagesStr.replace(/&quot;/g, '"'));
                } catch (e) {
                    images = [];
                    console.error(e);
                }
            }

            // Handling urutan paket
            if (Array.isArray(packages)) {
                packagesImgs = packages.sort((a, b) => a.order - b.order).map((p) => `/storage/${p.image}`);
            }

            // initialize modal
            $('#notes').show();
            $('#modalPaket').empty();

            // contoh case wallpanel
            if (jenis === 'card-types') {
                resetState();
                setCatalogConfig({ selectedJenis: selectedJenis, type });
                setFirstLoad(false);
                loadMoreData();
                return;
            }

            if (jenis.toLowerCase() === 'uv board') {
                renderVariantsToModal(specifications);
                $('#modalVideo, .lebar').hide();
                $('#modalCategory').text(category);
                if (packages.length > 0) {
                    packages
                        .sort((a, b) => a.order - b.order)
                        .map((p) => {
                            $('#modalPaket').append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${p.name}">${p.name}</span>
                    `);
                        });
                } else {
                    $('#modalPaket').append('<span class="text-muted">Tidak ada paket</span>');
                    $('#notes').hide();
                }
            }

            if (jenis.toLowerCase() === 'wallboard') {
                renderVariantsToModal(specifications);
                $('#modalCategory').text(category);
                $('#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar').hide();
            }

            if (jenis === 'PVC Board') {
                renderVariantsToModal(specifications);
                $('#modalCategory').text(jenis);
                $('#modalVideo, .lebar, .paket').hide();
            }

            if (jenis === 'Wallpanel') {
                renderVariantsToModal(specifications);
                $('#modalContact').data('type', type);
                $('#modalCategory').text(category + ' / ' + type);
                $('#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density').hide();
                $('#modalGrafis').attr('src', `/storage/${imageType}`);
                $('.grafis').removeClass('d-none');
            }

            if (jenis.toLowerCase() === 'aksesoris') {
                $('#tinggi, #ketebalan, #kepadatan, .lebar, .density').hide();
                $('#modalCategory').text(category);
                renderVariantsToModal(specifications);
                $('#modalVideoPlayer').empty();
                $('#modalVideo, .density').hide();
                if (urlVideo) {
                    $('#modalVideoPlayer').append(`
                    <iframe class="embed-responsive-item"
                    src="${urlVideo}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `);
                    $('#modalVideo').show();
                }
            }

            renderCarouselProduct(images, packagesImgs, jenis);

            $('#modalName').text(name);
            $('#productModalLabel').text(name);
            // $('#modalDownload').data('id', productId);
            $('#productModal').modal('show');
            $('#modalContact').data({ jenis, category, code, length, width, height, density, type });

            // reset kepadatan/notes
            $('.kepadatan').removeClass('active');
            $('#modalContact').data({ kepadatan: null, paket: null });
            $('.modalContact').prop('disabled', $('.kepadatan').length > 0);
        });

    $(document).on('click', '.kepadatan', function () {
        $('.modalContact').prop('disabled', false);

        const kepadatan = $(this).data('value');
        const $modal = $(this).closest('#productModal');

        $modal.find('.kepadatan').removeClass('active');
        $(this).addClass('active');

        $('#notes').hide();
        $('#modalContact').data('kepadatan', kepadatan);
    });

    // ===== Init Other Modules =====
    bindFilterButton(selectedJenis);
    bindDownloadButtons();
    bindOrderButton();
    initScrollTopButton();
    bindFilterVersion();

    // ===== View Product Tracker =====
    function viewProduct(productId) {
        $.ajax({
            url: `/products/${productId}/viewed`,
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: (res) => console.log('View recorded:', res),
            error: (err) => console.error(err)
        });
    }
});
