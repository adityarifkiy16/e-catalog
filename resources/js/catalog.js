import { bindDownloadButtons } from './modules/download';
import { bindOrderButton } from './modules/orderButton';
import { initScrollTopButton } from './modules/scroll';
import { resetState, setCatalogConfig, loadMoreData } from './modules/catalogLoader';
import { bindFilterButton } from './modules/filter';

$(document).ready(function () {
    let selectedJenis = new URLSearchParams(window.location.search).get('jenis');
    let category = new URLSearchParams(window.location.search).get('category');
    let delayTimer;

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
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        if (scrollTop + windowHeight >= documentHeight - 150) {
            loadMoreData();
        }
    });

    function renderCarouselProduct(images, wallpanelImages = null) {
        $('#carousel-product-image').empty();
        $('#thumbnailGallery').empty();
        let newimages = [...images];

        if (wallpanelImages) {
            newimages = [...images, ...wallpanelImages];
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
        $('#thumbnailGallery').on('click', '.thumbnail-image', function () {
            const index = $(this).data('index');
            $('#carouselProduct .carousel-item').removeClass('active');
            $('#carouselProduct .carousel-item').eq(index).addClass('active');
        });
    }

    let selectedWallpanel = null;
    const storedWallpanel = sessionStorage.getItem('selectedWallpanel');

    if (storedWallpanel) {
        selectedWallpanel = JSON.parse(storedWallpanel);
        console.log('Restore wallpanel dari sessionStorage:', selectedWallpanel);
    }

    $(document).on('click', '.product-card', function () {
        const code = $(this).data('code');
        const category = $(this).data('category');
        const images = JSON.parse(
            $(this)
                .attr('data-images')
                .replace(/&quot;/g, '"')
        );
        const jenis = $(this).data('jenis');
        const productId = $(this).data('id');

        // Klik produk wallpanel → ganti data wallpanel dan load UV Board / Wallboard
        if (jenis.toLowerCase() === 'wallpanel') {
            $('#filter-container').removeClass('d-none');
            $('#catalog-col').addClass('col-md-10').removeClass('col-md-12');

            selectedWallpanel = { code, images, productId, jenis };
            // set selectedWallpanel ke sessionStorage
            sessionStorage.setItem('selectedWallpanel', JSON.stringify(selectedWallpanel));

            resetState();
            setCatalogConfig({ selectedJenis: [2, 5] });
            loadMoreData(selectedWallpanel);
            bindFilterButton([2, 5]);
            if ($(window).width() < 768) {
                $('#filter-container').addClass('d-none');
            }

            console.log('Pilih wallpanel:', selectedWallpanel);
            return;
        }

        // Klik UV Board / Wallboard
        if (jenis.toLowerCase() === 'uv board' || jenis.toLowerCase() === 'wallboard') {
            if (selectedWallpanel) {
                console.log('Klik UV Board / Wallboard saat ada wallpanel terpilih');
                console.log('Wallpanel saat ini:', selectedWallpanel);

                // Render gambar UV Board yang diklik
                renderCarouselProduct(images, selectedWallpanel.images);

                // Tampilkan info wallpanel di modal
                $('#modalCode').text(code);
                $('#productModalLabel').text(code);
                $('#modalCategory').text('Wallpanel ' + selectedWallpanel.code);
                $('#modalDownload').data('id', productId);
                $('#productModal').modal('show');
                $('#modalContact').data('jenis', selectedWallpanel.jenis);
                $('#modalContact').data('category', category);
                $('#modalContact').data('code', code);
            } else {
                console.log('Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa');
                renderCarouselProduct(images);
                $('#modalCode').text(code);
                $('#productModalLabel').text(code);
                $('#modalCategory').text(jenis + ' / ' + category);
                $('#modalDownload').data('id', productId);
                $('#productModal').modal('show');
                $('#modalContact').data('jenis', jenis);
                $('#modalContact').data('category', category);
                $('#modalContact').data('code', code);
            }
            return;
        }

        // Klik produk biasa
        renderCarouselProduct(images);
        $('#modalCode').text(code);
        $('#productModalLabel').text(code);
        $('#modalCategory').text(jenis + ' / ' + category);
        $('#modalDownload').data('id', productId);
        $('#productModal').modal('show');
        $('#modalContact').data('jenis', jenis);
        $('#modalContact').data('category', category);
        $('#modalContact').data('code', code);
        console.log('Produk biasa:', code);
    });

    bindFilterButton(selectedJenis);
    bindDownloadButtons();
    bindOrderButton();
    initScrollTopButton();
});
