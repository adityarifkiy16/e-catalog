import { renderVariantsToModal } from './renderVariant';
import { resetState, setFirstLoad, setCatalogConfig } from '../core/helpers';
import { viewProduct } from '../core/api';
import { renderCarouselProduct } from './renderCarouselProduct';
import { state } from '../core/state';
import { loadMoreData } from '../core/loader';

/**
 * @function detailProduct
 * Handle click event on product card.
 * This function will trigger the modal to show the product detail.
 * It will also handle the click event on the kepadatan button.
 */
export function detailProduct() {
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
                setCatalogConfig({ selectedJenis: state.selectedJenis, type });
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
}
