import { resetState } from '../core/helpers';
import { state } from '../core/state';
import { updateURLParams } from '../events/updateURLParams';

export function bindBackButton() {
    $('#backButton').on('click', function () {
        updateURLParams({ type: null });
        state.type = null;
        resetState();
        window.location.href = window.location.href;
    });
}
