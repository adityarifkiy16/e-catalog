import { resetState } from '../core/helpers';
import { loadMoreData } from '../core/loader';
import { state } from '../core/state';
import { updateURLParams } from '../events/updateURLParams';

/**
 * bindFilterVersion - handling pilihan versi
 * dan mengeset list produk berdasarkan versi yang dipilih
 *
 * @returns {undefined}
 */
export function bindFilterVersion() {
    $('#version-select').on('change', function () {
        const selectedVersion = $(this).val() || null;

        // Simpan ke global state
        state.version = selectedVersion;
        updateURLParams({ version: selectedVersion });

        // Reset list produk dan load ulang
        resetState();
        loadMoreData();
    });
}
