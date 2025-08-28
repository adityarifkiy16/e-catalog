import { renderProducts } from './renderProduct';
import { renderTypes } from './renderTypes';
import { renderMockup } from './renderMockup';
import { showLoading, hideLoading, setCategory } from './utils';

// Global State
let selectedJenis = null;
let category = null;
let type = null;
let currentPage = 1;
let isLoading = false;
let lastPage = false;
const uniquePaths = new Set();
let firstLoadFlag = true;

// ===== State Setter =====
export function setFirstLoad(value) {
    firstLoadFlag = value;
}
export function setCatalogConfig(config) {
    selectedJenis = config.selectedJenis;
    category = config.category ?? null;
    type = config.type ?? null;
}

// ===== Main Loader =====
export function loadMoreData() {
    return new Promise((resolve, reject) => {
        if ($(window).width() < 768) {
            $('#filter-container').addClass('d-none');
        }

        if (!category || category === 'null' || category === '') {
            $('#btn-download').addClass('d-none');
        } else {
            $('#btn-download').removeClass('d-none');
        }

        if (isLoading || lastPage) return resolve(); //  menghindari deadlock
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
                const products = response.data.data ?? [];
                const types = response.types ?? [];

                // === handle back button ===
                if (type) {
                    $('#backButton').removeClass('d-none');
                    $('#homeButton').addClass('d-none');
                    console.log('remove class');
                }

                // === handle first load ===
                if (selectedJenis == 3 && firstLoadFlag) {
                    if (types.length > 0) {
                        renderTypes(types, selectedJenis);
                        currentPage++;
                        if (currentPage > response.data.last_page) lastPage = true;
                    }
                    updateCategoryMenu(response, true);
                } else {
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
    const images = data.data.data[0]?.category?.images ?? [];

    // ===== Handle Category =====
    if (categories.length === 0) {
        $('#category-container').addClass('d-none');
    } else {
        $('#category-container').removeClass('d-none');
        if (images.length === 0) {
            $('#mockup').addClass('d-none');
        }
        renderMockup(images, selectedJenis, uniquePaths);
    }

    // ===== Handle Header Category =====
    switch (name) {
        case 'PVC Board':
            $('#category-container').addClass('d-none');
            $('.category-modal-container').text('Tidak ada kategori');
            break;
        case 'Wallboard':
            $('#category-menu-item-label, #category-modal-item-label').html('Motif');
            break;
        case 'UV Board':
            $('#category-menu-item-label, #category-modal-item-label').html('Motif');
            break;
        case 'Wallpanel':
            $('#category-menu-item-label, #category-modal-item-label').html('Motif');
            break;
        case 'Aksesoris':
            $('#category-container').addClass('d-none');
            $('.category-modal-container').text('Tidak ada kategori');
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

    // ===== Handle Category =====
    if (firstLoad) {
        $('#category-menu-item-label, #category-modal-item-label').html('');
        $('#category-menu-item,#category-menu-item-modal').html('tidak ada kategori');
    } else {
        $('#category-menu-item, #category-menu-item-modal').html(dropdown);
    }

    // ===== auto choose category =====
    if (!category && categories.length > 0) {
        console.log('auto choose category');
        category = categories[0].id;
        setCategory(category);
        resetState();
        loadMoreData(true);
    } else if (category) {
        $(`.category-filter[data-id="${category}"]`).addClass('active');
    }
}

// ===== Reset =====
export function resetState() {
    currentPage = 1;
    isLoading = false;
    lastPage = false;
    uniquePaths.clear();
    $('#product-list .row').html('');
}
