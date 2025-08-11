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
export function loadMoreData(selectedWallpanel = null) {
    return new Promise((resolve, reject) => {
        if (!category || category === 'null' || category === '') {
            $('#btn-download').addClass('d-none');
        } else {
            $('#btn-download').removeClass('d-none');
        }

        if (isLoading || lastPage) return resolve(); // tetap resolve untuk menghindari deadlock
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
                updateCategoryMenu(response, selectedWallpanel);
                resolve();
            },
            error: function () {
                console.log('Gagal memuat data.');
                reject();
            },
            complete: function () {
                isLoading = false;
                hideLoading();
            }
        });
    });
}

function updateCategoryMenu(response, selectedWallpanel = null) {
    const categories = response.jenis?.categories ?? [];
    const name = response.jenis?.name;
    const data = response;

    if (categories.length === 0) {
        $('#category-container').addClass('d-none');
    } else {
        $('#category-container').removeClass('d-none');
    }

    if (category) {
        if (data.category.images.length === 0) {
            $('#mockup').addClass('d-none');
        }
        renderMockup(data.category.images, selectedJenis, uniquePaths);
    }

    switch (name) {
        case 'PVC Board':
            $('#category-container, #category-modal-container').addClass('d-none');
            break;
        case 'Wallboard':
        case 'UV Board':
            $('#category-menu-item-label, #category-modal-item-label').html('Motif');
            break;
        case 'Wallpanel':
            break;
        case 'Aksesoris':
            $('#category-container, #category-modal-container').addClass('d-none');
            break;
        default:
            $('#category-menu-item-label, #category-modal-item-label').html('Kategori');
    }

    let dropdown = `<li class="nav-item font-poppins">`;
    let filteredCategories = categories;

    if (selectedWallpanel) {
        filteredCategories = categories.filter((cat) => cat.jenis_id === 5 || (cat.jenis_id === 2 && cat.id !== 25));
    }
    console.log(selectedWallpanel);

    filteredCategories.forEach((cat) => {
        dropdown += `
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
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
        loadMoreData(selectedWallpanel);
    } else if (category) {
        $(`.category-filter[data-id="${category}"]`).addClass('active');
    }
}

export function resetState() {
    currentPage = 1;
    isLoading = false;
    lastPage = false;
    uniquePaths.clear();
    $('#product-list .row').html('');
}
