// import { loadYoutubeAPI } from './youtube';

/**
 * Render mockup carousel
 */
export function renderMockup(categories, selectedJenis, uniquePaths, firstLoad = false) {
    if (selectedJenis == null) return;

    categories.forEach((item) => {
        if (item.images) {
            item.images.forEach((img) => {
                if (img.path) uniquePaths.add(img.path);
            });
        }

        // kalau langsung array of image object
        if (item.path) {
            uniquePaths.add(item.path);
        }
    });

    const paths = Array.from(uniquePaths);
    const $carouselInner = $('#mockup-carousel-inner');
    const $carouselIndicators = $('#mockup-carousel-indicators');

    const videos = [
        'https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s'
    ];

    const imagesWpc = [];
    for (let i = 1; i <= 6; i++) {
        imagesWpc.push(`/dist/img/wpc/${i}.webp?v=${Date.now()}`);
    }

    $carouselInner.empty();
    $carouselIndicators.empty();

    if (selectedJenis == 4) {
        $('#mockup-carousel').carousel({
            interval: false
        });

        $('#mockup .carousel-control-next').addClass('d-none');
        $('#mockup .carousel-control-prev').addClass('d-none');

        videos.forEach((video, i) => {
            $carouselInner.append(`
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${video}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `);
        });
        $('#mockup').removeClass('d-none');
        return;
    } else if (selectedJenis == 3) {
        if (firstLoad) {
            $('#mockup-carousel').carousel({
                interval: 3000
            });

            $('#mockup .carousel-control-next').removeClass('d-none');
            $('#mockup .carousel-control-prev').removeClass('d-none');

            imagesWpc.forEach((path, i) => {
                $carouselInner.append(`
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${path}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `);
                $carouselIndicators.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></li>
        `);
            });

            $('#mockup').removeClass('d-none');
            return;
        }
    }

    // Mode gambar
    if (paths.length > 0) {
        if (paths.length === 1) {
            $('#mockup .carousel-control-next').addClass('d-none');
            $('#mockup .carousel-control-prev').addClass('d-none');
            $carouselIndicators.addClass('d-none');
        } else {
            $('#mockup .carousel-control-next').removeClass('d-none');
            $('#mockup .carousel-control-prev').removeClass('d-none');
        }

        paths.slice(0, 5).forEach((path, i) => {
            $carouselInner.append(`
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="/storage/${path}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `);
            $carouselIndicators.append(`
                <li data-target="#mockup-carousel" data-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></li>
            `);
        });

        $('#mockup').removeClass('d-none');
    } else {
        $('#mockup').addClass('d-none');
    }
}
