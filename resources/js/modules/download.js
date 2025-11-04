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

            const selectedCategories = $('.category-filter-download:checked')
                .map(function () {
                    return $(this).val();
                })
                .get()
                .filter((v) => v !== ''); // hilangkan kosong

            const selectedJenis = new URLSearchParams(window.location.search).get('jenis');
            const selectedVersion = $('#version-select').val();

            if (!selectedVersion) {
                alert('Silakan pilih versi terlebih dahulu.');
                return;
            }

            let params = new URLSearchParams();

            if (selectedCategories.length > 0) {
                selectedCategories.forEach((id) => params.append('category[]', id));
            }
            if (selectedJenis) params.append('jenis_id', selectedJenis);
            if (selectedVersion) params.append('version_id', selectedVersion);

            const url = `/catalog/pdf?${params.toString()}`;

            window.location.href = url;
        });
}
