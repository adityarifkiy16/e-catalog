// import { loadYoutubeAPI } from './youtube';

/**
 * Render mockup carousel
 */
export function renderMockup(categories, selectedJenis, uniquePaths) {
    if (selectedJenis == null) return;

    categories.forEach((image) => {
        if (image.path) uniquePaths.add(image.path);
    });

    const paths = Array.from(uniquePaths);
    const $carouselInner = $('#mockup-carousel-inner');
    const $carouselIndicators = $('#mockup-carousel-indicators');
    // const videos = [
    //     'https://www.youtube.com/embed/YWcZ_vkBfBc?autoplay=0&mute=1&rel=0&controls=0',
    //     'https://www.youtube.com/embed/bQMXGcg_wX4?autoplay=0&mute=1&rel=0&controls=0',
    //     'https://www.youtube.com/embed/0JM9rrRTZwU?autoplay=0&mute=1&rel=0&controls=0',
    //     'https://www.youtube.com/embed/0mctlz5WkIc?autoplay=0&mute=1&rel=0&controls=0'
    // ];

    const videos = [
        'https://www.youtube.com/embed/x55DLsMH-lA?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=x55DLsMH-lA'
    ];

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

        // load API lalu init player
        // loadYoutubeAPI();
        $('#mockup').removeClass('d-none');
        return;
    }

    // Mode gambar
    if (paths.length > 0) {
        if (paths.length === 1) {
            $('#mockup .carousel-control-next').addClass('d-none');
            $('#mockup .carousel-control-prev').addClass('d-none');
        } else {
            $('#mockup .carousel-control-next').removeClass('d-none');
            $('#mockup .carousel-control-prev').removeClass('d-none');
        }

        paths.slice(0, 5).forEach((path, i) => {
            $carouselInner.append(`
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="/storage/${path}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
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
