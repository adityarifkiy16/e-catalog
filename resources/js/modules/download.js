export function bindDownloadButtons() {
    // === Checkbox logic ===
    let selectedCategories = [];

    // Handle perubahan "Semua Kategori"
    $(document).on('change', '#all-cat', function () {
        if ($(this).prop('checked')) {
            $('.category-filter-download').prop('checked', true);
            selectedCategories = [''];
        } else {
            $('.category-filter-download').prop('checked', false);
            selectedCategories = [];
        }
    });

    // Handle perubahan tiap kategori
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

        const totalCats = $('.category-filter-download').length - 1; // -1 karena all-cat tidak dihitung
        if (selectedCategories.length === totalCats) {
            $('#all-cat').prop('checked', true);
            selectedCategories = [''];
        }
    });

    $(document)
        .off('click', '#btn-download')
        .on('click', '#btn-download', function (e) {
            e.preventDefault();

            const selectedJenis = new URLSearchParams(window.location.search).get('jenis');
            const selectedVersion = $('#version-select').val();

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

            const url = `/catalog/pdf?${params.toString()}`;

            window.location.href = url;
        });
}
