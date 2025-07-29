import { resetState, setCatalogConfig, loadMoreData } from './catalogLoader';
import { setCategory } from './utils';

export function bindFilterButton(selectedJenis) {
    $(document).on('click', '.category-filter', function (e) {
        e.preventDefault();
        const category = $(this).data('id');

        setCatalogConfig({ selectedJenis, category });
        setCategory(category);

        $('#filterModal').modal('hide');
        resetState();
        loadMoreData();
    });
}
