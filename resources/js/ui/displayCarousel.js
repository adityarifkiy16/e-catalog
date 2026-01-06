import { renderMockup } from './renderMockup';
import { state } from '../core/state';

/**
 * @function displayCarousel
 * @description function to showing carousel
 * @param {Object} response - response data from API
 * @param {Boolean} firstLoad - flaggin first load
 */
export function displayCarousel(response, firstLoad = true) {
    const firstProduct = response.products?.data[0];
    const imageTypes = firstProduct?.category?.type?.images ?? [];
    const images = firstProduct?.category?.images ?? [];
    const isMockupJenis = state.selectedJenis == 3 || state.selectedJenis == 4;

    if (firstLoad) {
        if (imageTypes.length > 0) {
            renderMockup(imageTypes, state.selectedJenis, state.uniquePaths, firstLoad);
            return;
        }
        if (images.length > 0) {
            renderMockup(images, state.selectedJenis, state.uniquePaths, firstLoad);
            return;
        }
        if (isMockupJenis) {
            renderMockup([], state.selectedJenis, state.uniquePaths, firstLoad);
            return;
        }
    } else {
        if (imageTypes.length > 0) {
            renderMockup(imageTypes, state.selectedJenis, state.uniquePaths, firstLoad);
            return;
        }
        if (images.length > 0) {
            renderMockup(images, state.selectedJenis, state.uniquePaths, firstLoad);
            return;
        }
    }
}
