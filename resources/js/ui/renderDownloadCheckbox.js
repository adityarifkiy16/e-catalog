/**
 * @function renderDownloadCheckbox
 * @description function to render download checkbox
 * @param {Array} categories - An array of category objects.
 * @returns {string} - An HTML string representing a checkbox for download a catalog.
 */
export function renderDownloadCheckbox(categories) {
    if (categories.length === 0) {
        return `
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`;
    }

    const all = `
        <div class="col-12 mb-2">
            <div class="text-white rounded py-2 px-3">
                <input type="checkbox" class="custom-control-input category-filter-download" id="all-cat" value="">
                <label class="custom-control-label" for="all-cat">
                    Semua Kategori
                </label>
            </div>
        </div>`;

    const items = categories
        .map(
            (cat) => `
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${cat.id}" value="${cat.id}">
                    <label class="custom-control-label" for="cat-${cat.id}">
                        ${cat.name}
                    </label>
                </div>
            </div>`
        )
        .join('');

    return `<div class="row font-poppins">${all}${items}</div>`;
}
