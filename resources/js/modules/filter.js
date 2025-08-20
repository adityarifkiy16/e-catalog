import { resetState, setCatalogConfig, loadMoreData } from './catalogLoader';
import { setCategory } from './utils';

let isLoading = false;

export function bindFilterButton(selectedJenis) {
    $(document).off('click', '.category-filter');

    $(document).on('click', '.category-filter', async function (e) {
        e.preventDefault();
        if (isLoading) return;
        isLoading = true;

        const category = $(this).data('id');
        const type = $(this).data('type');
        console.log(type);
        try {
            setCatalogConfig({ selectedJenis, category, type });
            setCategory(category);
            $('#filterModal').modal('hide');
            resetState();

            await loadMoreData(false);
        } catch (err) {
            console.error('Gagal memuat data:', err);
        } finally {
            isLoading = false;
        }
    });
}
