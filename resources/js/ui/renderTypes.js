/**
 * Render list of card types as a row of cards.
 * Each card type will have a thumbnail image, a name
 * @param {Array} types - Array of objects representing card types.
 * @param {number} selectedJenis - The selected jenis ID.
 */
export function renderTypes(types, selectedJenis) {
    $('#btn-download').addClass('d-none');

    let html = '';
    types.forEach((type) => {
        const image = type.thumbnail
            ? `/storage/${type.thumbnail}`
            : 'https://via.placeholder.com/300x200?text=No+Image';

        const categoryName = selectedJenis == 3 ? 'wallpanel' : 'tanpa kategori';

        html += `
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 type-filter d-flex flex-column justify-content-center align-items-center"
                    `;

        html += `
                    data-id="${type.id}"
                    data-jenis="card-types"
                    data-category="${categoryName}"
                    data-type="${type.id}"
                    >
                       <img 
                            src="${image}" 
                            class="card-img-top" 
                            alt="${type.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${type.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${categoryName}</h6>
                        </div>
                    </div>
                </div>`;
    });
    $('#product-list .row').append(html);
}
