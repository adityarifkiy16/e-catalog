import { state } from './state';
import { fetchCatalog } from './api';
import { showLoading, hideLoading, hidePageLoading, showPageLoading } from '../ui/utils';
import { renderTypes } from '../ui/renderTypes';
import { updateCategoryMenu } from '../ui/updateCategoryMenu';
import { displayCarousel } from '../ui/displayCarousel';
import { renderProducts } from '../ui/renderProduct';
import { resetState } from './helpers';
import { updateURLParams } from '../events/updateURLParams';

const SELECTORS = {
    SEARCH_INPUT: '#search-input',
    BACK_BUTTON: '#backButton',
    HOME_BUTTON: '#homeButton',
    SEARCH_FORM: '#search-form',
    DOWNLOAD_BUTTON: '#downloadButton',
    VERSION_FILTER: '#version-filter',
    VERSION_SELECT: '#version-select',
    MOCKUP: '#mockup',
    PRODUCT_LIST: '#product-list',
    NO_DATA_IMAGE: 'dist/img/no-data.png'
};

const CLASSES = {
    HIDDEN: 'd-none',
    ROW: '.row',
    COL_12: 'col-12'
};

export async function loadMoreData() {
    if (shouldSkipLoading()) {
        return;
    }

    state.isLoading = true;

    if (state.isInitialLoad) {
        showPageLoading();
    } else {
        showLoading();
    }

    try {
        const params = buildFetchParams();
        const response = await fetchCatalog(params);
        await handleResponse(response);
    } finally {
        state.isLoading = false;
        state.isInitialLoad = false;
        hideLoading();
        hidePageLoading();
        state.currentRequest = null;
    }
}

function shouldSkipLoading() {
    return state.isLoading || state.lastPage;
}

function buildFetchParams() {
    return {
        page: state.currentPage,
        search: $(SELECTORS.SEARCH_INPUT).val(),
        jenis: state.selectedJenis,
        category: state.category,
        type: state.type,
        version: state.version
    };
}

async function handleResponse(response) {
    const { products = [], types = [], category = [] } = response;
    const productData = products.data || [];
    const version = response.active_version_id;

    handleTypeNavigation();
    handleVersionInitialization();

    if (await handleFirstCategorySelection(category)) {
        return;
    }

    if (state.firstLoad) {
        await handleFirstLoadResponse(types, productData, version, response);
    } else {
        await handleSubsequentLoadResponse(productData, version, response);
    }

    state.firstLoad = false;
}

function handleTypeNavigation() {
    if (state.type) {
        $(SELECTORS.BACK_BUTTON).removeClass(CLASSES.HIDDEN);
        $(SELECTORS.HOME_BUTTON).addClass(CLASSES.HIDDEN);
    }
}

function handleVersionInitialization() {
    if (state.version === null) {
        const firstVersion = $(`${SELECTORS.VERSION_SELECT} option:first`).val();
        if (firstVersion) {
            state.version = firstVersion;
        }
    }
}

async function handleFirstCategorySelection(categories) {
    if (!state.category && Array.isArray(categories) && categories.length > 0) {
        state.category = categories[0].id;
        resetState();
        updateURLParams({ category: state.category });
        await loadMoreData();
        return true;
    }
    return false;
}

async function handleFirstLoadResponse(types, products, version, response) {
    if (types.length > 0 && !state.type) {
        showTypeView(types, response);
    } else {
        await showProductView(products, version, response, true);
    }
}

function showTypeView(types, response) {
    hideFormElements();
    renderTypes(types, state.selectedJenis);
    state.lastPage = true;
    updateCategoryMenu(response, true);
    displayCarousel(response, true);
}

async function showProductView(products, version, response, isFirstLoad) {
    showFormElements();

    if (products.length > 0) {
        await renderProducts(products, state.selectedJenis, version);
        state.currentPage++;

        if (state.currentPage > products.last_page) {
            state.lastPage = true;
        }
    } else {
        if (state.currentPage === 1) {
            showNoDataMessage();
            state.lastPage = true;
        } else {
            state.lastPage = true;
        }
    }

    if (isFirstLoad && state.selectedJenis == 4) {
        displayCarousel(response, true);
    }

    if (isFirstLoad && !state.type) {
        updateCategoryMenu(response, true);
    }

    updateCategoryMenu(response, false);

    if (!isFirstLoad) {
        displayCarousel(response, false);
    }
}

async function handleSubsequentLoadResponse(products, version, response) {
    await showProductView(products, version, response, false);
}

function hideFormElements() {
    $(SELECTORS.SEARCH_FORM).addClass(CLASSES.HIDDEN);
    $(SELECTORS.DOWNLOAD_BUTTON).addClass(CLASSES.HIDDEN);
    $(SELECTORS.VERSION_FILTER).addClass(CLASSES.HIDDEN);
}

function showFormElements() {
    $(SELECTORS.SEARCH_FORM).removeClass(CLASSES.HIDDEN);
    $(SELECTORS.DOWNLOAD_BUTTON).removeClass(CLASSES.HIDDEN);
    $(SELECTORS.VERSION_FILTER).removeClass(CLASSES.HIDDEN);
}

function showNoDataMessage() {
    $(SELECTORS.MOCKUP).addClass(CLASSES.HIDDEN);

    const noDataHtml = `
    <div class="${CLASSES.COL_12}">
      <img src="${SELECTORS.NO_DATA_IMAGE}" alt="no-data" 
           class="img-fluid mx-auto d-block" 
           style="max-width:100%;height:auto;margin:100px 0;">
    </div>
  `;

    $(`${SELECTORS.PRODUCT_LIST} ${CLASSES.ROW}`).append(noDataHtml);
}
