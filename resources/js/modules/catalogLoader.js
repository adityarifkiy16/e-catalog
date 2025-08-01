import { renderProducts } from './renderProduct';
import { renderMockup } from './renderMockup';
import { showLoading, hideLoading, setCategory } from './utils';

// Global variables
let selectedJenis = null;
let category = null;
let currentPage = 1;
let isLoading = false;
let lastPage = false;
const uniquePaths = new Set();

export function setCatalogConfig(config) {
    selectedJenis = config.selectedJenis;
    category = config.category ?? null;
}

/**
 * Load more products from server and render them.
 * This function will be called when user reaches the bottom of the page.
 * If the data is successfully loaded, it will render the products and update the current page.
 * If the data is failed to load, it will show an error message.
 * If the data is empty, it will show a message that there is no more data.
 */
export function loadMoreData() {
    if (!category || category === 'null' || category === '') {
        $('#btn-download').addClass('d-none');
    } else {
        $('#btn-download').removeClass('d-none');
    }

    if (isLoading || lastPage) return;
    isLoading = true;
    showLoading();

    const search = $('#search-input').val();
    $.ajax({
        url: `/catalog`,
        type: 'GET',
        data: {
            page: currentPage,
            search,
            jenis: selectedJenis,
            category
        },
        success: function (response) {
            const products = response.data.data ?? [];
            if (products.length > 0) {
                renderProducts(products, selectedJenis);
                currentPage++;
                if (currentPage > response.data.last_page) lastPage = true;
            } else {
                if (currentPage === 1) {
                    $('#mockup').addClass('d-none');
                    $('#product-list .row').append(
                        `<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                            class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`
                    );
                }
                lastPage = true;
            }
            updateCategoryMenu(response);
            isLoading = false;
        },
        error: function () {
            isLoading = false;
            console.log('Gagal memuat data.');
        },
        complete: function () {
            isLoading = false;
            hideLoading();
        }
    });
}

/**
 * Update category menu based on the given response and selected jenis
 * @param {object} response - response from the server
 */
function updateCategoryMenu(response) {
    const categories = response.jenis?.categories ?? [];
    const name = response.jenis?.name;
    const data = response;

    if (categories.length === 0) {
        $('#category-container').addClass('d-none');
    } else {
        $('#category-container').removeClass('d-none');
    }
    if (data.category.images.length === 0) {
        $('#mockup').addClass('d-none');
    }
    renderMockup(data.category.images, selectedJenis, uniquePaths);

    switch (name) {
        case 'PVC Board':
            $('#category-container, #category-modal-container').addClass('d-none');
            break;
        case 'Wallboard':
        case 'UV Board':
            $('#category-menu-item-label, #category-modal-item-label').html('Motif');
            break;
        case 'Wallpanel':
            $('#category-container, #category-modal-container').addClass('d-none');
            break;
        default:
            $('#category-menu-item-label, #category-modal-item-label').html('Kategori');
    }

    let dropdown = `<li class="nav-item font-poppins">`;
    categories.forEach((cat) => {
        dropdown += `
            <a class="nav-link text-dark category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${cat.jenis_id}" data-id="${cat.id}">
                <img src="${cat.path ? 'storage/' + cat.path : 'dist/img/product/1.webp'}" alt="${cat.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${cat.name} ${
            cat.products_count > 0 ? `(${cat.products_count})` : ''
        }</span>
            </a>`;
    });

    dropdown += `</li>`;
    $('#category-menu-item, #category-menu-item-modal').html(dropdown);

    // Auto select category if not yet set
    if (!category && categories.length > 0) {
        category = categories[0].id;
        setCategory(category);
        resetState();
        loadMoreData();
    } else if (category) {
        $(`.category-filter[data-id="${category}"]`).addClass('active');
    }
}

/**
 * Reset state of catalog loader.
 * This function will reset the state of catalog loader to its initial state.
 * It will reset the current page to 1, set isLoading to false, set lastPage to false, and clear the product list.
 */
export function resetState() {
    currentPage = 1;
    isLoading = false;
    lastPage = false;
    uniquePaths.clear();
    $('#product-list .row').html('');
}
