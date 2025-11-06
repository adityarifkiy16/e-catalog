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
        const version = $(this).data('version');
        try {
            setCatalogConfig({ selectedJenis, category, type, version });
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

    $(document).off('click', '.type-filter');
    $(document).on('click', '.type-filter', async function (e) {
        e.preventDefault();
        if (isLoading) return;
        isLoading = true;

        const type = $(this).data('id');
        try {
            setCatalogConfig({ selectedJenis, type });
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
