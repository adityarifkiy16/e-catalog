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

            const selectedJenis = new URLSearchParams(window.location.search).get('jenis');
            const selectedVersion = 1;

            const params = selectedCategories.map((id) => `category[]=${encodeURIComponent(id)}`).join('&');
            const jenisParams = selectedJenis ? `&jenis_id=${encodeURIComponent(selectedJenis)}` : '';
            const versionParams = selectedVersion ? `&version_id=${encodeURIComponent(selectedVersion)}` : '';
            const url = `catalog/pdf?${params}${jenisParams}${versionParams}`;
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
