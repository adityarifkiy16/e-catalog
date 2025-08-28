/**
 * Renders a mockup carousel for categories based on the selected type.
 *
 * This function processes the provided categories to extract and display
 * images in a carousel format. It filters images to exclude those marked
 * as motifs and uses unique image paths for the carousel. The carousel
 * is updated with up to five image slides, and the navigation controls
 * are adjusted based on the number of images.
 *
 * @param {Array} categories - The list of categories to render images from.
 * @param {int|null} selectedJenis - The selected type identifier for filtering cats.
 * @param {Set} uniquePaths - A set to store unique image paths.
 */

export function renderMockup(categories, selectedJenis, uniquePaths) {
    if (selectedJenis == null) {
        return;
    }

    categories.forEach((image) => {
        if (image.path) {
            uniquePaths.add(image.path);
        }
    });

    const paths = Array.from(uniquePaths);
    const $carouselInner = $('#mockup-carousel-inner');
    const $carouselIndicators = $('#mockup-carousel-indicators');
    const videos = [
        'https://www.youtube.com/embed/x55DLsMH-lA?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=x55DLsMH-lA'
    ];

    $carouselInner.empty();
    $carouselIndicators.empty();

    if (selectedJenis == 4) {
        $('#carouselExampleControls').carousel({ interval: false });
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
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen 
                            ></iframe>
                        </div>
                    </div>
                </div>
            `);
        });

        $('#mockup').removeClass('d-none');
        return;
    }

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
                        <li data-target="#carouselExampleControls" data-slide-to="${i}" ${
                i === 0 ? 'class="active"' : ''
            }></li>
                    `);
        });
        $('#mockup').removeClass('d-none');
    } else {
        $('#mockup').addClass('d-none');
    }
}
