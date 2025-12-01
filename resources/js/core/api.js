import { state } from './state';

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
