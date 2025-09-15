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

export function prepareImageOrder(images) {
    return images
        .slice()
        .sort((a, b) => (b.type === 'motif') - (a.type === 'motif'))
        .map((image) => '/storage/' + image.path);
}
