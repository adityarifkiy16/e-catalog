import { resetState } from '../core/helpers';
import { loadMoreData } from '../core/loader';
import { state } from '../core/state';
import { applyLabelMap } from './applyLabelMap';
import { toggleCategoryLayout } from './toggleCategoryLayout';
import { renderCategory } from './renderCategory';
import { renderDownloadCheckbox } from './renderDownloadCheckbox';
import { renderTypeMenu } from './renderTypeMenu';
import { setCategory } from './utils';

/**
 * @function updateCategoryMenu
 * @description fungsi untuk mengupdate menu kategori
 * @param {*} response
 * @param {*} firstLoad
 */
export function updateCategoryMenu(response, firstLoad = true) {
    const categories = response.category ?? [];
    const name = response.jenis?.name;

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
    applyLabelMap(name);
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

    // Auto choose first category if none selected
    if (!state.category && categories.length > 0) {
        state.category = categories[0].id;
        setCategory(state.category);
        resetState();

        setTimeout(() => {
            loadMoreData();
        }, 200);
    } else if (state.category) {
        $(`.category-filter[data-id="${state.category}"]`).addClass('active');
    }

    if (state.type) {
        $(`.type-filter[data-id="${state.type}"]`).addClass('active');
    }
}
