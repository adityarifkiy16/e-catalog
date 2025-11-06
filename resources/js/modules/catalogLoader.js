import { renderProducts } from './renderProduct';
import { renderTypes } from './renderTypes';
import { renderMockup } from './renderMockup';
import { showLoading, hideLoading, setCategory } from './utils';
import { toggleCategoryLayout } from '../catalog';

export { state };

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
    uniquePaths: new Set(),
    version: null
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
    state.version = config.version ?? null;
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
    state.isLoading = true;
    showLoading();

    const search = $('#search-input').val();

    // abort request lama
    if (state.currentRequest && state.currentRequest.readyState !== 4) {
        state.currentRequest.abort();
    }

    const params = {
        page: state.currentPage,
        search,
        jenis: state.selectedJenis,
        category: state.category,
        type: state.type,
        version: state.version
    };

    // kirim AJAX request
    state.currentRequest = $.ajax({
        url: `/catalog`,
        type: 'GET',
        data: params
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
    console.log(response);
    const products = response.data.data ?? [];
    const types = response.types ?? [];
    const version = response.active_version_id;

    // Handle back button
    if (state.type) {
        $('#backButton').removeClass('d-none');
        $('#homeButton').addClass('d-none');
    }

    console.log('state.version', state.version);
    console.log('state.type', state.type);

    if (state.version == null) {
        const firstVersion = $('#version-select option:first').val();
        if (firstVersion) {
            state.version = firstVersion;
        }
    }

    // 1. Render thumbnail type untuk jenis wallpanel (3) saat pertama kali load
    if (state.selectedJenis && state.firstLoad && types.length > 0) {
        $('#search-form').addClass('d-none');
        $('#downloadButton').addClass('d-none');
        $('#version-filter').addClass('d-none');
        if (types.length > 0) {
            renderTypes(types, state.selectedJenis);
            state.lastPage = true;
        }
        updateCategoryMenu(response, true);
    } else {
        $('#search-form').removeClass('d-none');
        $('#downloadButton').removeClass('d-none');
        $('#version-filter').removeClass('d-none');
        if (products.length > 0) {
            renderProducts(products, state.selectedJenis, version);
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
    const categories = response.category ?? [];
    const types = response.data.data[0]?.category?.types?.images ?? [];
    const name = response.jenis?.name;
    const images = response.data.data[0]?.category?.images ?? [];
    const isRenderTypes = state.firstLoad && (response.types?.length ?? 0) > 0;
    const hasCategory = (response.category?.length ?? 0) > 0;

    toggleCategoryLayout({ selectedJenis: state.selectedJenis, hasCategory, isRenderTypes });

    // --- 1. Toggle Layout ---
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

    // --- 2. Apply Header Label ---
    applyLabelMap(name);

    // --- 3. Render Category Menu ---
    const dropdown = renderCategory(categories, state.version);

    // --- 4. Render Download Checkbox ---
    const checkbox = renderDownloadCheckbox(categories);

    // --- 5. Render Type Menu ---
    const typeMenu = renderTypeMenu(response.types ?? []);

    // Inject to DOM
    if (firstLoad) {
        $('#category-menu-item, #category-menu-item-modal').html('tidak ada kategori');
    } else {
        $('#category-menu-item, #category-menu-item-modal').html(dropdown);
        $('#type-menu-item, #type-menu-item-modal').html(typeMenu);
        $('#pdf-catalog').html(checkbox);
    }

    // Auto choose first category if none selected
    if (!state.category && categories.length > 0) {
        state.category = categories[0].id;
        setCategory(state.category);
        resetState();

        setTimeout(() => {
            loadMoreData();
            console.log('loadMoreData');
            console.log('state.vers', state.version);
        }, 200);
    } else if (state.category) {
        $(`.category-filter[data-id="${state.category}"]`).addClass('active');
    }

    if (state.type) {
        $(`.type-filter[data-id="${state.type}"]`).addClass('active');
    }
}

function setCategoryLabel(label) {
    $('#category-menu-item-label, #category-modal-item-label').html(label);
}

function renderDownloadCheckbox(categories) {
    if (categories.length === 0) {
        return `
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`;
    }

    const all = `
        <div class="col-12 mb-2">
            <div class="text-white rounded py-2 px-3">
                <input type="checkbox" class="custom-control-input category-filter-download" id="all-cat" value="">
                <label class="custom-control-label" for="all-cat">
                    Semua Kategori
                </label>
            </div>
        </div>`;

    // Checkbox per kategori
    const items = categories
        .map(
            (cat) => `
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${cat.id}" value="${cat.id}">
                    <label class="custom-control-label" for="cat-${cat.id}">
                        ${cat.name}
                    </label>
                </div>
            </div>`
        )
        .join('');

    return `<div class="row font-poppins">${all}${items}</div>`;
}

function renderCategory(categories, version = null) {
    if (categories.length === 0) {
        return `
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`;
    }

    const items = categories
        .map(
            (cat) => `
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" 
                data-jenis-id="${cat.jenis_id}" 
                data-id="${cat.id}" 
                data-type="${cat.type_id}"
                data-version="${version}">
                    <img src="${cat.path ? 'storage/' + cat.path : 'dist/img/product/1.webp'}"
                        alt="${cat.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${cat.name}</span>
                </a>
            `
        )
        .join('');

    return `<li class="nav-item font-poppins">${items}</li>`;
}

function renderTypeMenu(types) {
    if (types.length === 0) {
        $('#type-menu-item-label').hide();
    }

    const items = types
        .map(
            (type) => `
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${type.id}">
                    <img src="${type.thumbnail ? `/storage/${type.thumbnail}` : 'dist/img/product/1.webp'}"
                        alt="${type.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${type.name}</span>
                </a>
            `
        )
        .join('');
    return `<li class="nav-item font-poppins">${items}</li>`;
}

function applyLabelMap(name) {
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
}
