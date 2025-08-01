import { resetState, setCatalogConfig, loadMoreData } from './catalogLoader';
import { setCategory } from './utils';

let isLoading = false;

export function bindFilterButton(selectedJenis) {
    $(document).on('click', '.category-filter', async function (e) {
        e.preventDefault();
        if (isLoading) return; // prevent overlapping calls
        isLoading = true;

        const category = $(this).data('id');

        try {
            setCatalogConfig({ selectedJenis, category });
            setCategory(category);
            $('#filterModal').modal('hide');
            resetState();

            await loadMoreData(); // pastikan ini mengembalikan Promise
        } catch (err) {
            console.error('Gagal memuat data:', err);
        } finally {
            isLoading = false;
        }
    });
}
