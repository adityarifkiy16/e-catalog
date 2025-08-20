import { renderProducts } from './renderProduct';
import { renderTypes } from './renderTypes';
import { renderMockup } from './renderMockup';
import { showLoading, hideLoading, setCategory } from './utils';

// Global variables
let selectedJenis = null;
let category = null;
let type = null;
let currentPage = 1;
let isLoading = false;
let lastPage = false;
const uniquePaths = new Set();

export function setCatalogConfig(config) {
    selectedJenis = config.selectedJenis;
    category = config.category ?? null;
    type = config.type ?? null;
}
export function loadMoreData(firstLoad = true) {
    return new Promise((resolve, reject) => {
        if ($(window).width() < 768) {
            $('#filter-container').addClass('d-none');
        }

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
                category,
                type
            },
            success: function (response) {
                console.log('Data berhasil dimuat.');
                console.log(response);
                const products = response.data.data ?? [];
                const types = response.types ?? [];
                if (selectedJenis == 3 && firstLoad) {
                    console.log('isFirstLoad:' + firstLoad);
                    if (types.length > 0) {
                        renderTypes(types, selectedJenis);
                        currentPage++;
                        if (currentPage > response.data.last_page) lastPage = true;
                    }
                    updateCategoryMenu(response, true);
                } else {
                    console.log('isFirstLoad:' + firstLoad);
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
                    updateCategoryMenu(response, false);
                }
                updateCategoryMenu(response, false);
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

function updateCategoryMenu(response, firstLoad = true) {
    const categories = response.category;
    const name = response.jenis?.name;
    const data = response;
    const images = data.category[0]?.images ?? [];

    if (categories.length === 0) {
        $('#category-container').addClass('d-none');
    } else {
        $('#category-container').removeClass('d-none');
        if (images.length === 0) {
            $('#mockup').addClass('d-none');
        }
        renderMockup(images, selectedJenis, uniquePaths);
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

    if (Array.isArray(categories) && categories.length > 0) {
        categories.forEach((cat) => {
            dropdown += `
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${cat.jenis_id}" data-id="${cat.id}" data-type="${cat.type_id}">
                <img src="${cat.path ? 'storage/' + cat.path : 'dist/img/product/1.webp'}" alt="${cat.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${cat.name}</span>
            </a>`;
        });
    } else {
        dropdown += `<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>`;
    }

    dropdown += `</li>`;
    $('#category-menu-item, #category-menu-item-modal').html(dropdown);

    // Auto select category if not yet set
    if (!category && categories.length > 0) {
        category = categories[0].id;
        setCategory(category);
        resetState();
        loadMoreData(firstLoad);
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
