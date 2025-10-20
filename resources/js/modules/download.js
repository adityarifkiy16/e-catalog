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

    $('#btn-download')
        .off('click', '#btn-download')
        .on('click', function (e) {
            e.preventDefault();
            handleDownload(this, 'catalog/pdf?category=' + encodeURIComponent(getCategory()));
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
