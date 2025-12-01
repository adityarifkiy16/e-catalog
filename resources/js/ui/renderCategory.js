/**
 * @function renderCategory
 * @description fungsi untuk menampilkan kategori sebagai menu
 * @param {Array} categories - Array dari object kategori
 * @param {Number} version - versi katalog
 * @returns {String} - rendered HTML for the dropdown menu
 */
export function renderCategory(categories, version = null) {
    if (categories.length === 0) {
        return `
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`;
    }

    const items = categories
        .map(
            (cat) => `
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" 
                data-jenis-id="${cat.jenis_id}" 
                data-id="${cat.id}" 
                data-type="${cat.type_id}"
                data-version="${version}">
                    <img src="${cat.path ? 'storage/' + cat.path : 'dist/img/product/1.webp'}"
                        alt="${cat.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${cat.name}</span>
                </a>
            `
        )
        .join('');

    return `<li class="nav-item font-poppins">${items}</li>`;
}
