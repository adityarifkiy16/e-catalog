// Core
import { resetState } from '../core/helpers';
import { loadMoreData } from '../core/loader';
import { state } from '../core/state';
// UI
import { applyLabelMap } from './applyLabelMap';
import { toggleCategoryLayout } from './toggleCategoryLayout';
import { renderCategory } from './renderCategory';
import { renderDownloadCheckbox } from './renderDownloadCheckbox';
import { renderTypeMenu } from './renderTypeMenu';
import { setCategory } from './utils';

/**
 * @function updateCategoryMenu
 * @description function to update content on category menu
 * @param {*} response - response data from API
 * @param {Boolean} firstLoad - flagging first load
 */
export function updateCategoryMenu(response, firstLoad = true) {
    const categories = response.category ?? [];
    const jenis = response.jenis?.name;
    const isRenderTypes = state.firstLoad && (response.types?.length ?? 0) > 0;
    const hasCategory = (response.category?.length ?? 0) > 0;

    toggleCategoryLayout({
        selectedJenis: state.selectedJenis,
        hasCategory,
        isRenderTypes
    });

    // --- 1. Toggle Layout ---
    if (categories.length === 0) {
        $('#category-container').addClass('d-none');
    } else {
        $('#category-container').removeClass('d-none');
    }

    // --- 2. Apply Header Label ---
    applyLabelMap(jenis);
    const dropdown = renderCategory(categories, state.version);
    const checkbox = renderDownloadCheckbox(categories);
    const typeMenu = renderTypeMenu(response.types ?? []);

    // Inject to DOM
    if (firstLoad) {
        $('#category-menu-item, #category-menu-item-modal').html('tidak ada kategori');
    } else {
        $('#category-menu-item, #category-menu-item-modal').html(dropdown);
        $('#type-menu-item, #type-menu-item-modal').html(typeMenu);
        $('#pdf-catalog').html(checkbox);
    }

    if (state.category) {
        $(`.category-filter[data-id="${state.category}"]`).addClass('active');
    }

    if (state.type) {
        $(`.type-filter[data-id="${state.type}"]`).addClass('active');
    }
}
