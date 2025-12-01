/**
 * @function renderTypeMenu
 * @description fungsi untuk menampilkan tipe sebagai menu
 * @param {Array} types - Array dari object tipe
 * @returns {string} - HTML string of type menu items
 */
export function renderTypeMenu(types) {
    if (types.length === 0) {
        $('#type-menu-item-label').hide();
    }

    const items = types
        .map(
            (type) => `
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${type.id}">
                    <img src="${type.thumbnail ? `/storage/${type.thumbnail}` : 'dist/img/product/1.webp'}"
                        alt="${type.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${type.name}</span>
                </a>
            `
        )
        .join('');
    return `<li class="nav-item font-poppins">${items}</li>`;
}
