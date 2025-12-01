import { resetState } from '../core/helpers';
import { loadMoreData } from '../core/loader';
import { state } from '../core/state';

/**
 * Mengikatkan event onchange pada select version
 * dan mengeset list produk berdasarkan versi yang dipilih
 *
 * @returns {undefined}
 */
export function bindFilterVersion() {
    $('#version-select').on('change', function () {
        const selectedVersion = $(this).val() || null;

        // Simpan ke global state
        state.version = selectedVersion;

        // Reset list produk dan load ulang
        resetState();
        loadMoreData();
    });
}
