import { prepareImageOrder } from './utils';

export function renderProducts(products, selectedJenis) {
    let html = '';
    products.forEach((product) => {
        const image = product.photo ? `/storage/${product.photo}` : 'https://via.placeholder.com/300x200?text=No+Image';

        const orderedImage = prepareImageOrder(product.images);

        // Masukkan gambar utama di paling depan
        const allImages = [image, ...orderedImage];

        // Simpan array ini sebagai string JSON yang aman untuk HTML
        const imagesJson = JSON.stringify(allImages).replace(/"/g, '&quot;');

        const categoryName = product.category?.name ?? 'Tanpa Kategori';

        let displayCode = product.code;

        if (selectedJenis == 3) {
            displayCode = product.code.split(' ').slice(4).join(' ').trim();
        } else if (selectedJenis == 5) {
            displayCode = product.code.split(' ').slice(1).join(' ');
        } else {
            displayCode = product.code;
        }

        // Tampilan sesuai bentuk
        if (product.category?.display_style === 'square' || selectedJenis === null) {
            html += `
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `;
        } else if (product.category?.display_style === 'rectangle') {
            html += `
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `;
        } else {
            html += `
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;
        }

        html += `
                    data-id="${product.id}"
                    data-code="${displayCode}"
                    data-category="${categoryName}"
                    data-jenis="${product.category?.jenis?.name ?? ''}"
                    data-length="${product.panjang}"
                    data-height="${product.tinggi}"
                    data-density="${product.ketebalan}"
                    data-images="${imagesJson}"
                    data-image="${image}"
                    data-type="${product.category?.types?.name ?? ''}"
                    data-url="${product.url_video}"
                    >
                       <img 
                            src="${image}" 
                            class="card-img-top" 
                            alt="${product.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${
                                    product.category?.jenis?.name === 'PVC Board' ? 'bottom center' : 'center center'
                                };
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${displayCode}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${categoryName}</h6>
                        </div>
                    </div>
                </div>`;
    });
    $('#product-list .row').append(html);
}
