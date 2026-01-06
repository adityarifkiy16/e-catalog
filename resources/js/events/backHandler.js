import { updateURLParams } from './updateURLParams';
import { state } from '../core/state';
import { resetState } from '../core/helpers';

export function backHandler() {
    $('#backButton').on('click', () => {
        console.log('Back button clicked');
        resetState();
        state.type = null;
        updateURLParams({ type: null });
        state.isInitialLoad = true;
        window.location.href = window.location.href;
    });
}
