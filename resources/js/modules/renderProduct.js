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

        // Tampilan sesuai bentuk
        if (product.category?.display_style === 'square' || selectedJenis === null) {
            html += `
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `;
        } else if (product.category?.display_style === 'rectangle') {
            html += `
                    <div class="col-md-4 mb-4">
                        <div class="h-100 product-card"
                    `;
        } else {
            html += `
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `;
        }

        html += `
                    data-id="${product.id}"
                    data-code="${product.code}"
                    data-category="${categoryName}"
                    data-jenis="${product.category?.jenis?.name ?? ''}"
                    data-images="${imagesJson}"
                    data-image="${image}"
                    >
                       <img 
                            src="${image}" 
                            class="card-img-top" 
                            alt="${product.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 200px;
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
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${product.code}</h4>
                            <h6 class="card-text text-muted mb-1">${categoryName}</h6>
                        </div>
                    </div>
                </div>`;
    });
    $('#product-list .row').append(html);
}
