import { prepareImageOrder } from "./utils";

/**
 * @function renderProducts
 * Render list of products to the page
 * @param {Array} products list of products to render
 * @param {String} selectedJenis selected jenis id
 * @param {String} version selected version id
 */
export function renderProducts(products, selectedJenis, version) {
    $("#btn-download").removeClass("d-none");
    let html = "";
    products.forEach((product) => {
        const orderedImages = prepareImageOrder(
            product?.product_versions?.[0]?.images ?? []
        );
        const image = orderedImages.length
            ? orderedImages[0]
            : "https://via.placeholder.com/300x200?text=No+Image";

        const thumb164 = toImageVariant(image, 164);

        // Masukkan gambar utama di paling depan
        let allImages = orderedImages;
        let thumb = product.category?.type?.thumbnail ?? "";

        if (thumb && !thumb.startsWith("http")) {
            thumb = `storage/${thumb.replace(/^\/?storage\//, "")}`;
            allImages.push(thumb);
        }

        // Simpan array ini sebagai string JSON yang aman untuk HTML
        const imagesJson = JSON.stringify(allImages).replace(/"/g, "&quot;");
        const packagesJson = JSON.stringify(product.packages).replace(
            /"/g,
            "&quot;"
        );
        const categoryName = product.category?.name ?? "Tanpa Kategori";
        const displayName =
            product.product_versions.find((p) => p.version_id == version)
                ?.name ?? "Tanpa Nama";

        // Tampilan sesuai bentuk
        if (
            product.category?.display_style === "square" ||
            selectedJenis === null
        ) {
            html += `
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `;
        } else if (product.category?.display_style === "rectangle") {
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

        const isRectangle = product.category?.display_style === "rectangle";

        const specificationsJson = JSON.stringify(
            product.specifications
        ).replace(/"/g, "&quot;");

        html += `
                    data-id="${product.id}"
                    data-code="${product.code}"
                    data-name="${displayName}"
                    data-category="${categoryName}"
                    data-jenis="${product.category?.jenis?.name ?? ""}"
                    data-images="${imagesJson}"
                    data-image="${image}"
                    data-type="${product.category?.type?.name ?? ""}"
                    data-type-image="${product.category?.type?.image ?? ""}"
                    data-url="${product.url_video}"
                    data-paket="${packagesJson}"
                    data-specifications = "${specificationsJson}"
                    >
                       <img 
                            src="${thumb164}"
                            class="card-img-top" 
                            alt="${product.name}" 
                            loading="lazy"
                            fetchpriority="low"
                            decoding="async"
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${
                                    product.category?.jenis?.name ===
                                    "PVC Board"
                                        ? "bottom center"
                                        : "center center"
                                };
                                aspect-ratio: ${isRectangle ? "16/9" : "1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${displayName}
                            </h4>
                            <h5 class="card-text text-white mb-1 font-weight-light">${categoryName}</h5>
                        </div>
                    </div>
                </div>`;
    });
    $("#product-list .row").append(html);
}

function toImageVariant(src, size) {
    if (!src) return src;
    return src.replace(/\.webp$/, `-${size}.webp`);
}
