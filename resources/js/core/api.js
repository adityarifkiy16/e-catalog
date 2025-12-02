import { state } from './state';

/**
 * @function fetchCatalog
 * @description fungsi untuk fetching data produk
 * jika ada request yang sedang berjalan maka abort request tersebut
 * @param {Object} params - Parameters to be sent with the request.
 * @returns {jqXHR} The jQuery XMLHttpRequest object.
 */
export function fetchCatalog(params) {
    if (state.currentRequest && state.currentRequest.readyState !== 4) {
        state.currentRequest.abort();
    }
    return (state.currentRequest = $.ajax({
        url: '/catalog',
        type: 'GET',
        data: params
    }));
}

/**
 * @function viewProduct
 * @description Melakukan record view produk yang diklik
 * @param {*} productId id dari produk yang diklik
 */
export function viewProduct(productId) {
    $.ajax({
        url: `/products/${productId}/viewed`,
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        success: (res) => console.log('View recorded:', res),
        error: (err) => console.error(err)
    });
}
