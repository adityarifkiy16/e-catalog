/**
 * @function renderCarouselProduct
 * @description function to render carousel product
 * @param {Array} images - array of images
 * @param {Array} extraImages - array of extra images
 * @param {String} jenis - selected jenis
 */
export function renderCarouselProduct(images, extraImages = [], jenis = '') {
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
