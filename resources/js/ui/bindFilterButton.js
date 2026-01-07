import { resetState, setCatalogConfig } from '../core/helpers';
import { loadMoreData } from '../core/loader';
import { setCategory } from './utils';
import { updateURLParams } from '../events/updateURLParams';

let isLoading = false;

/**
 * Bind filter button event listener
 * Filter berdasarkan kategori dan tipe barang
 * @param {string} selectedJenis - id jenis yang dipilih atau sedang digunakan
 */
export function bindFilterButton(selectedJenis) {
    /**
     * @description filter berdasarkan Kategori barang ex: Marble, Wood etc
     */
    $(document).off('click', '.category-filter');
    $(document).on('click', '.category-filter', async function (e) {
        e.preventDefault();
        if (isLoading) return;
        isLoading = true;

        const category = $(this).data('id');
        const type = $(this).data('type');
        const version = $(this).data('version');
        try {
            updateURLParams({
                category: category,
                type: type,
                version: version,
                jenis: selectedJenis
            });

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

    /**
     * @description filter berdasarkan tipe barang, ex: 628, 643 etc
     */
    $(document).off('click', '.type-filter');
    $(document).on('click', '.type-filter', async function (e) {
        e.preventDefault();
        if (isLoading) return;
        isLoading = true;
        const type = $(this).data('id');
        try {
            updateURLParams({ type: type });
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
