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
        .sort((a, b) => {
            if (a.pivot.motif && !b.pivot.motif) {
                return -1;
            } else if (!a.pivot.motif && b.pivot.motif) {
                return 1;
            } else {
                return 0;
            }
        })
        .map((image) => '/storage/' + image.path);
}
