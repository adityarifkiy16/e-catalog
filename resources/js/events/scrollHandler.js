import { getIsLoading, setFirstLoad } from '../core/helpers';
import { loadMoreData } from '../core/loader';

let scrollTimer;
let scrollLock = false;

export function scrollHandler() {
    $(window).on('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(async () => {
            if (scrollLock || getIsLoading()) return; // jika sedang loading, return
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();
            if (scrollTop + windowHeight >= documentHeight - 150) {
                scrollLock = true;
                try {
                    setFirstLoad(false);
                    await loadMoreData();
                } finally {
                    scrollLock = false;
                }
            }
        }, 200);
    });
}
