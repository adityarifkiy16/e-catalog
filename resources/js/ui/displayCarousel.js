import { renderMockup } from './renderMockup';
import { state } from '../core/state';

/**
 * @function displayCarousel
 * @description function to showing carousel
 * @param {Object} response - response data from API
 * @param {Boolean} firstLoad - flaggin first load
 */
export function displayCarousel(response, firstLoad = true) {
    const firstProduct = response.data.data[0];
    const imageTypes = firstProduct?.category?.type?.images ?? [];
    const images = firstProduct?.category?.images ?? [];
    if (imageTypes.length > 0) {
        renderMockup(imageTypes, state.selectedJenis, state.uniquePaths, firstLoad);
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
