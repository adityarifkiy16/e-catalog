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
 * @param {string|null} selectedJenis - The selected type identifier for filtering cats.
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
    $carouselInner.empty();
    $carouselIndicators.empty();

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
                                style="
                                    width: 100%;  
                                    height: 70vh;                
                                    aspect-ratio: 16 / 9;      
                                    object-fit: cover;        
                                    object-position: center 75%;   
                                    display: block;
                                    margin: 0 auto;          
                                    border-radius: 8px;        
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
                                ">
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
