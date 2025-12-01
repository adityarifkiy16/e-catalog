import { bindDownloadButtons } from './ui/bindDownloadButton';
import { bindOrderButton } from './ui/bindOrderButton';
import { bindScrollTopButton } from './ui/bindScrollTopButton';
import { bindFilterButton } from './ui/bindFilterButton';
import { bindFilterVersion } from './ui/bindFilterVersion';
import { renderVariantsToModal } from './ui/renderVariant';
import { toggleCategoryLayout } from './ui/toggleCategoryLayout';
import { resetState, setFirstLoad, setCatalogConfig, getIsLoading } from './core/helpers';
import { loadMoreData } from './core/loader';

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedJenis = urlParams.get('jenis');
    const version = urlParams.get('version');
    const category = urlParams.get('category');
    let delayTimer;
    let scrollTimer;
    let scrollLock = false;
    bindFilterButton(selectedJenis);
    bindDownloadButtons();
    bindOrderButton();
    bindScrollTopButton();
    bindFilterVersion();

    /**
     * @function viewProduct
     * @description Melakukan record view produk yang diklik
     * @param {*} productId id dari produk yang diklik
     */
    function viewProduct(productId) {
        $.ajax({
            url: `/products/${productId}/viewed`,
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: (res) => console.log('View recorded:', res),
            error: (err) => console.error(err)
        });
    }

    /**
     * @function renderCarouselProduct
     * @description fungsi ini digunakan untuk mengatur carousel/jumbotron product
     * @param {*} image yang akan di render
     * @param {*} extraImages gambar tambahan yang akan di render
     * @param {*} jenis jenis yang dipilih
     */
    function renderCarouselProduct(images, extraImages = [], jenis = '') {
        $('#carousel-product-image').empty();
        $('#thumbnailGallery').empty();

        let newImages = images || [];
        if (jenis?.toLowerCase() === 'uv board' && extraImages.length) {
            newImages = [...images, ...extraImages];
        }

        // load gambar dengan intersection observer
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
            $('#carousel-product-image').append(`
                <div class="carousel-item ${activeClass}">
                    <img data-src="${img}" 
                        src="/dist/img/placeholder.webp"
                        class="img-fluid d-block mx-auto lazy-modal-img"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `);
            $('#thumbnailGallery').append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img 
                            data-src="${img}" 
                            src="/dist/img/placeholder.webp" 
                            class="img-thumbnail thumbnail-image lazy-modal-img p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${i}"
                        >
                    </div>
                </div>
            `);
        });
        $('.lazy-modal-img').each(function () {
            observer.observe(this);
        });

        // Jika hanya ada 1 gambar, matikan tombol next/prev
        if (newImages.length <= 1) {
            $('#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev').addClass('d-none');
        } else {
            $('#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev').removeClass('d-none');
        }

        $('#carouselProduct').carousel({ interval: 3000, pause: false });

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
                }, 7000);
            });
    }

    // 1. Load pertama dan set global state
    setCatalogConfig({ selectedJenis, category, version });
    loadMoreData();

    // 2. Toggle layout kategori dipanggil pertama kali + on resize
    toggleCategoryLayout({ selectedJenis, hasCategory: category, isRenderTypes: false });
    $(window).on('resize', () => toggleCategoryLayout({ selectedJenis, hasCategory: category, isRenderTypes: false }));

    // 3. menghindari inputan terlalu cepat menggunakan debounce
    $('#search-input').on('input', function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            resetState();
            loadMoreData();
        }, 500);
    });

    // 4. Scroll handling untuk load more data dengan debounce
    $(window).on('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(async () => {
            if (scrollLock || getIsLoading()) return; // jika sedang loading, return
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

    /**
     * detail product
     * @description fungsi ini digunakan untuk menampilkan detail product
     */
    $(document)
        .off('click', '.product-card')
        .on('click', '.product-card', function () {
            const productId = $(this).data('id');
            const code = $(this).data('code');
            const name = $(this).data('name');
            const category = $(this).data('category');
            const type = $(this).data('type');
            const jenis = $(this).data('jenis');
            const urlVideo = $(this).data('url');
            const imagesStr = $(this).attr('data-images');
            let imageType = $(this).data('type-image');
            const specifications = JSON.parse($(this).attr('data-specifications') || '[]');
            const packages = JSON.parse($(this).attr('data-paket') || '[]');
            let images = [];
            let packagesImgs = [];

            // 1. Handling jika ada tipe produk
            if (jenis !== 'card-types') {
                viewProduct(productId);
            }

            // 2. Parsing gambar
            if (imagesStr) {
                try {
                    images = JSON.parse(imagesStr.replace(/&quot;/g, '"'));
                } catch (e) {
                    images = [];
                    console.error(e);
                }
            }

            // 3. Handling urutan paket
            if (Array.isArray(packages)) {
                packagesImgs = packages.sort((a, b) => a.order - b.order).map((p) => `/storage/${p.image}`);
            }

            // 4. inisialisasi modal
            $('#notes').show();
            $('#modalPaket').empty();

            // 5. Handling klik pada jenis produk yang terdapat tipe
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
            $('#modalContact').data({ jenis, category, code, type });

            // reset kepadatan/notes
            $('.kepadatan').removeClass('active');
            $('#modalContact').data({ kepadatan: null, paket: null });
            $('.modalContact').prop('disabled', $('.kepadatan').length > 0);
        });

    // ===== Handling klik Kepadatan =====
    $(document).on('click', '.kepadatan', function () {
        $('.modalContact').prop('disabled', false);

        const kepadatan = $(this).data('value');
        const $modal = $(this).closest('#productModal');

        $modal.find('.kepadatan').removeClass('active');
        $(this).addClass('active');

        $('#notes').hide();
        $('#modalContact').data('kepadatan', kepadatan);
    });
});
