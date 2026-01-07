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

export { state };
