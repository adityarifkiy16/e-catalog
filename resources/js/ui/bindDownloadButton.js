import { state } from '../core/state';

/**
 * @function bindDownloadButtons
 * @description fungsi ini digunakan untuk mengatur checkbox yang
 * digunakan untuk memilih kategori yang akan diunduh.
 *
 */
export function bindDownloadButtons() {
    let selectedCategories = [];

    // 1. Handle klik "Semua Kategori"
    $(document).on('change', '#all-cat', function () {
        if ($(this).prop('checked')) {
            $('.category-filter-download').prop('checked', true);
            selectedCategories = [''];
        } else {
            $('.category-filter-download').prop('checked', false);
            selectedCategories = [];
        }
    });

    // 2. Handle klik tiap kategori
    $(document).on('change', '.category-filter-download', function () {
        if (!$(this).prop('checked')) {
            $('#all-cat').prop('checked', false);
        }

        selectedCategories = $('.category-filter-download:checked')
            .map(function () {
                return $(this).val();
            })
            .get()
            .filter((v) => v !== '');

        // 3. Handle jika semua kategori di klik kecuali "Semua Kategori"
        const totalCats = $('.category-filter-download').length - 1; // -1 karena all-cat tidak dihitung
        if (selectedCategories.length === totalCats) {
            $('#all-cat').prop('checked', true);
            selectedCategories = [''];
        }
    });

    // === Download logic ===
    $(document)
        .off('click', '#btn-download')
        .on('click', '#btn-download', function (e) {
            e.preventDefault();
            const selectedType = state.type;
            const selectedJenis = state.selectedJenis;
            const selectedVersion = state.version;
            if (!selectedVersion) {
                alert('Silakan pilih versi terlebih dahulu.');
                return;
            }
            let params = new URLSearchParams();
            if (selectedCategories.length > 0 && selectedCategories[0] !== '') {
                selectedCategories.forEach((id) => params.append('category[]', id));
            }
            if (selectedJenis) params.append('jenis_id', selectedJenis);
            if (selectedVersion) params.append('version_id', selectedVersion);
            if (selectedType) params.append('type_id', selectedType);
            const url = `/catalog/pdf?${params.toString()}`;
            window.location.href = url;
        });
}
