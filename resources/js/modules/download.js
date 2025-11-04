import { getCategory } from './utils';

export function bindDownloadButtons() {
    // $(document)
    //     .off('click', '.modalDownload')
    //     .on('click', '.modalDownload', function (e) {
    //         e.preventDefault();
    //         const productId = $(this).data('id');
    //         const url = 'catalog/pdf/product?id=' + encodeURIComponent(productId);
    //         handleDownload(this, url);
    //     });

    $(document)
        .off('click', '#btn-download')
        .on('click', '#btn-download', function (e) {
            e.preventDefault();
            let url;
            const selectedCategories = $('.category-filter-download:checked')
                .map(function () {
                    return $(this).val();
                })
                .get();

            const selectedJenis = new URLSearchParams(window.location.search).get('jenis');
            const selectedVersion = $('#version-select').val();

            if (!selectedVersion) {
                alert('Silakan pilih versi terlebih dahulu.');
                return;
            }

            const params = selectedCategories.map((id) => `category[]=${encodeURIComponent(id)}`).join('&');
            const jenisParams = selectedJenis ? `&jenis_id=${encodeURIComponent(selectedJenis)}` : '';
            const versionParams = selectedVersion ? `&version_id=${encodeURIComponent(selectedVersion)}` : '';
            url = `catalog/pdf?${params}${jenisParams}${versionParams}`;
            handleDownload(this, url);
        });
}

function handleDownload(button, url) {
    const $btn = $(button);

    $btn.prop('disabled', true).html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'
    );

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            if (response.status === 'success') {
                window.open(response.url, '_blank');
                $btn.prop('disabled', false).html('Unduh PDF');
            } else {
                alert(response.message);
                $btn.prop('disabled', false).html('Unduh PDF');
            }
        }
    });
}
