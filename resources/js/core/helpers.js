import { state } from './state';

export function setFirstLoad(v) {
    state.firstLoad = v;
}
export function getFirstLoad() {
    return state.firstLoad;
}

export function setIsLoading(v) {
    state.isLoading = v;
}
export function getIsLoading() {
    return state.isLoading;
}

export function setCatalogConfig(config) {
    state.selectedJenis = config.selectedJenis;
    state.category = config.category ?? null;
    state.type = config.type ?? null;
    state.version = config.version ?? null;
}

export function resetState() {
    state.currentPage = 1;
    state.isLoading = false;
    state.lastPage = false;
    state.uniquePaths.clear();
    state.isInitialLoad = true;
    $('#product-list .row').html('');
}
