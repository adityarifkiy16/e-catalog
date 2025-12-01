/**
 * @function toggleCategoryLayout
 * @description fungsi ini digunakan untuk mengatur layout kategori (sidebar)
 * @param {selectedJenis} jenis yang dipilih
 * @param {hasCategory} apakah jenis tersebut memiliki kategori
 * @param {isRenderTypes} apakah jenis tersebut memiliki types
 * @returns
 */
export function toggleCategoryLayout({ selectedJenis = null, hasCategory = false, isRenderTypes = false }) {
    const $filter = $('#filter-container');
    const $categoryContainer = $('#category-container');
    const $catalog = $('#catalog-col');
    const isMobile = $(window).width() < 768;

    // 1. Tampilkan sidebar
    $filter.removeClass('d-none');
    $categoryContainer.removeClass('d-none');
    $catalog.removeClass('col-md-12 col-md-9');

    // ====== Main Logic ======
    // 1. Jika sedang render types → sembunyikan semua kategori
    if (isRenderTypes) {
        $filter.addClass('d-none');
        $categoryContainer.addClass('d-none');
        $catalog.addClass('col-md-12');
        return;
    }

    // 2. Jika id jenis = 1 (pvc) → sembunyikan kategori total
    if (selectedJenis == 1) {
        $filter.addClass('d-none');
        $categoryContainer.addClass('d-none');
        $catalog.addClass('col-md-12');
        return;
    }

    // 3. Jika tidak ada kategori → sembunyikan sidebar & buat full
    if (!hasCategory) {
        $filter.addClass('d-none');
        $categoryContainer.addClass('d-none');
        $catalog.addClass('col-md-12');
        return;
    }

    // 4. Kalau kategori ada, tampilkan sidebar (kecuali di mobile)
    if (isMobile) {
        $filter.addClass('d-none');
        $categoryContainer.removeClass('d-none');
    } else {
        $filter.removeClass('d-none');
        $categoryContainer.removeClass('d-none');
    }

    // Sidebar aktif → catalog 9 kolom
    $catalog.addClass('col-md-9');
}
