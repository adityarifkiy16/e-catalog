/**
 * @function applyLabelMap
 * @description fungsi untuk menerapkan header/title menu kategori
 * @param {string} name - name jenis produk
 */
export function applyLabelMap(name) {
    const labelMap = {
        'PVC Board': () => {
            $('#category-container').addClass('d-none');
            $('.category-modal-container').text('Tidak ada kategori');
        },
        Wallboard: () => setCategoryLabel('Motif'),
        'UV Board': () => setCategoryLabel('Motif'),
        Wallpanel: () => setCategoryLabel('Motif'),
        Aksesoris: () => setCategoryLabel('Ukuran'),
        default: () => setCategoryLabel('Kategori')
    };
    (labelMap[name] || labelMap.default)();
}

function setCategoryLabel(label) {
    $('#category-menu-item-label, #category-modal-item-label').html(label);
}
