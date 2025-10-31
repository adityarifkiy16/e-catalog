import { getCategory } from './utils';

export function bindDownloadButtons() {
    $(document)
        .off('click', '.modalDownload')
        .on('click', '.modalDownload', function (e) {
            e.preventDefault();
            const productId = $(this).data('id');
            const url = 'catalog/pdf/product?id=' + encodeURIComponent(productId);
            handleDownload(this, url);
        });

    $(document)
        .off('click', '#btn-download')
        .on('click', '#btn-download', function (e) {
            e.preventDefault();
            const selectedCategories = $('.category-filter-download:checked')
                .map(function () {
                    return $(this).val();
                })
                .get();

            if (selectedCategories.length === 0) {
                alert('Pilih minimal satu kategori untuk diunduh.');
                return;
            }

            const params = selectedCategories.map((id) => `category[]=${encodeURIComponent(id)}`).join('&');
            const url = `catalog/pdf?${params}`;

            handleDownload(this, url);
        });
}

function handleDownload(button, url) {
    const $btn = $(button);

    $btn.prop('disabled', true).html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'
    );

    window.open(url, '_blank');
    setTimeout(() => {
        $btn.prop('disabled', false).html('<i class="fa fa-file-download"></i> Download');
    }, 5000);
}
