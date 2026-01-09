import { toImageVariant } from '../core/helpers';

/**
 * @function renderTypeMenu
 * @description function to render type as menu sidebar
 * @param {Array} types - Array of objects representing card types
 * @returns {string} - HTML string of type menu items
 */
export function renderTypeMenu(types) {
    if (types.length === 0) {
        $('#type-menu-item-label').hide();
    }

    const items = types
        .map(function (type) {
            const thumb100 = toImageVariant(type.thumbnail, 100);
            return `
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${type.id}">
                    <img src="${type.thumbnail ? `/storage/${thumb100}` : 'dist/img/product/1.webp'}"
                        alt="${type.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${type.name}</span>
                </a>
            `;
        })
        .join('');
    return `<li class="nav-item font-poppins">${items}</li>`;
}
