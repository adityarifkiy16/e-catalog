import { renderProducts } from './renderProduct';
import { renderTypes } from './renderTypes';
import { renderMockup } from './renderMockup';
import { showLoading, hideLoading, setCategory } from './utils';

// ===== Global State =====
let state = {
    selectedJenis: null,
    category: null,
    type: null,
    currentPage: 1,
    isLoading: false,
    lastPage: false,
    firstLoad: true,
    currentRequest: null,
    uniquePaths: new Set()
};

// ===== State Helpers =====
export function setFirstLoad(value) {
    state.firstLoad = value;
}
export function getFirstLoad() {
    return state.firstLoad;
}
export function setCatalogConfig(config) {
    state.selectedJenis = config.selectedJenis;
    state.category = config.category ?? null;
    state.type = config.type ?? null;
}
export function setIsLoading(value) {
    state.isLoading = value;
}
export function getIsLoading() {
    return state.isLoading;
}

// ===== Reset =====
export function resetState() {
    state.currentPage = 1;
    state.isLoading = false;
    state.lastPage = false;
    state.uniquePaths.clear();
    $('#product-list .row').html('');
}

// ===== Main Loader =====
export function loadMoreData() {
    if (state.isLoading || state.lastPage) return Promise.resolve();

    console.log('loadMoreData');
    state.isLoading = true;
    showLoading();

    const search = $('#search-input').val();

    // abort request lama
    if (state.currentRequest && state.currentRequest.readyState !== 4) {
        state.currentRequest.abort();
    }

    state.currentRequest = $.ajax({
        url: `/catalog`,
        type: 'GET',
        data: {
            page: state.currentPage,
            search,
            jenis: state.selectedJenis,
            category: state.category,
            type: state.type
        }
    });

    return new Promise((resolve, reject) => {
        state.currentRequest
            .done((response) => handleResponse(response))
            .fail((xhr, status) => {
                if (status !== 'abort') {
                    console.error('Gagal memuat data.');
                    reject();
                }
            })
            .always(() => {
                state.isLoading = false;
                hideLoading();
                state.currentRequest = null;
            })
            .then(resolve);
    });
}

// ===== Response Handler =====
function handleResponse(response) {
    const products = response.data.data ?? [];
    const types = response.types ?? [];

    // Handle back button
    if (state.type) {
        $('#backButton').removeClass('d-none');
        $('#homeButton').addClass('d-none');
    }

    if (state.selectedJenis == 3 && state.firstLoad) {
        if (types.length > 0) {
            $('#search-form').addClass('d-none');
            renderTypes(types, state.selectedJenis);
            state.currentPage++;
            if (state.currentPage > response.data.last_page) state.lastPage = true;
        }
        updateCategoryMenu(response, true);
    } else {
        if (products.length > 0) {
            renderProducts(products, state.selectedJenis);
            state.currentPage++;
            if (state.currentPage > response.data.last_page) state.lastPage = true;
        } else {
            if (state.currentPage === 1) {
                $('#mockup').addClass('d-none');
                $('#product-list .row').append(
                    `<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`
                );
            }
            state.lastPage = true;
        }
        updateCategoryMenu(response, false);
    }
}

// ===== Category Menu =====
function updateCategoryMenu(response, firstLoad = true) {
    // console.log('updateCategoryMenu', firstLoad);

    const categories = response.category ?? [];
    const types = response.data.data[0]?.category?.types?.images ?? [];
    const name = response.jenis?.name;
    const images = response.data.data[0]?.category?.images ?? [];

    // Toggle category container
    if (categories.length === 0) {
        $('#category-container').addClass('d-none');
    } else {
        $('#category-container').removeClass('d-none');
        if (types.length > 0) {
            renderMockup(types, state.selectedJenis, state.uniquePaths, firstLoad);
        } else if (images.length > 0) {
            renderMockup(images, state.selectedJenis, state.uniquePaths, firstLoad);
        } else if (state.selectedJenis == 3) {
            renderMockup([], state.selectedJenis, state.uniquePaths, firstLoad);
        } else if (state.selectedJenis == 4) {
            renderMockup([], state.selectedJenis, state.uniquePaths, firstLoad);
        } else {
            $('#mockup').addClass('d-none');
        }
    }

    // Header label
    const labelMap = {
        'PVC Board': () => {
            $('#category-container').addClass('d-none');
            $('.category-modal-container').text('Tidak ada kategori');
        },
        Wallboard: () => setCategoryLabel('Motif'),
        'UV Board': () => setCategoryLabel('Motif'),
        Wallpanel: () => setCategoryLabel('Motif'),
        Aksesoris: () => setCategoryLabel('Ukuran'),
        default: () => setCategoryLabel('Kategori')
    };
    (labelMap[name] || labelMap.default)();

    // Build dropdown
    let dropdown = `<li class="nav-item font-poppins">`;
    if (categories.length > 0) {
        categories.forEach((cat) => {
            dropdown += `
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${cat.jenis_id}" data-id="${cat.id}" data-type="${cat.type_id}">
                    <img src="${cat.path ? 'storage/' + cat.path : 'dist/img/product/1.webp'}" alt="${cat.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${cat.name}</span>
                </a>`;
        });
    } else {
        dropdown += `<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>`;
    }
    dropdown += `</li>`;

    // Inject to DOM
    if (firstLoad) {
        $('#category-menu-item, #category-menu-item-modal').html('tidak ada kategori');
    } else {
        $('#category-menu-item, #category-menu-item-modal').html(dropdown);
    }

    // Auto choose first category if none selected
    if (!state.category && categories.length > 0) {
        console.log('auto choose category');
        state.category = categories[0].id;
        setCategory(state.category);
        resetState();

        setTimeout(() => {
            loadMoreData();
        }, 200);
    } else if (state.category) {
        $(`.category-filter[data-id="${state.category}"]`).addClass('active');
    }
}

function setCategoryLabel(label) {
    $('#category-menu-item-label, #category-modal-item-label').html(label);
}
