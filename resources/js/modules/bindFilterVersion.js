import { state, resetState, loadMoreData } from './catalogLoader';

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
