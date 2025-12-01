import { resetState } from '../core/helpers';
import { loadMoreData } from '../core/loader';

let delayTimer;

$('#search-input').on('input', function () {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
        resetState();
        loadMoreData();
    }, 500);
});
