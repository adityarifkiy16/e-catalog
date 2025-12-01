import { state } from './state';
import { fetchCatalog } from './api';
import { showLoading, hideLoading } from '../ui/utils';
import { renderTypes } from '../ui/renderTypes';
import { updateCategoryMenu } from '../ui/updateCategoryMenu';
import { displayCarousel } from '../ui/displayCarousel';
import { renderProducts } from '../ui/renderProduct';

/**
 * @function loadMoreData
 * @description Memuat data produk
 * @returns
 */
export function loadMoreData() {
    if (state.isLoading || state.lastPage) return Promise.resolve();
    state.isLoading = true;
    showLoading();

    const search = $('#search-input').val();

    const params = {
        page: state.currentPage,
        search,
        jenis: state.selectedJenis,
        category: state.category,
        type: state.type,
        version: state.version
    };

    return fetchCatalog(params)
        .done(handleResponse)
        .always(() => {
            state.isLoading = false;
            hideLoading();
            state.currentRequest = null;
        });
}

/**
 * @function handleResponse
 * @description Handle response dari API
 * @param {*} response response dari API
 */
function handleResponse(response) {
    const products = response.data.data ?? [];
    const types = response.types ?? [];
    const version = response.active_version_id;

    if (state.type) {
        $('#backButton').removeClass('d-none');
        $('#homeButton').addClass('d-none');
    }

    if (state.version == null) {
        const firstVersion = $('#version-select option:first').val();
        if (firstVersion) {
            state.version = firstVersion;
        }
    }

    // === Function Handle jika load pertama dan ada types ===
    if (state.selectedJenis && state.firstLoad && types.length > 0) {
        $('#search-form').addClass('d-none');
        $('#downloadButton').addClass('d-none');
        $('#version-filter').addClass('d-none');
        if (types.length > 0) {
            renderTypes(types, state.selectedJenis);
            state.lastPage = true;
        }
        updateCategoryMenu(response, true);
        displayCarousel(response, true);
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
        displayCarousel(response, false);
    }
}
