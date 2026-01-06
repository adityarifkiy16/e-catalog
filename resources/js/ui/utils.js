let category = null;

export function setCategory(value) {
    category = value;
}

export function getCategory() {
    return category;
}

export function showLoading() {
    $('#loading').removeClass('d-none');
}

export function hideLoading() {
    $('#loading').addClass('d-none');
}

export function showPageLoading() {
    $('#page-loading').removeClass('d-none');
}

export function hidePageLoading() {
    $('#page-loading').addClass('d-none');
}

export function prepareImageOrder(images = []) {
    if (!Array.isArray(images)) return [];

    // Urutan prioritas tipe gambar
    const typePriority = {
        thumbnail: 3,
        motif: 2,
        product: 1
    };

    // Urutkan berdasarkan prioritas di atas (thumbnail > motif > product > lainnya)
    return images
        .slice()
        .sort((a, b) => (typePriority[b.type] || 0) - (typePriority[a.type] || 0))
        .map((image) => '/storage/' + image.path);
}
