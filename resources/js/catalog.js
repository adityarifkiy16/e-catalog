// UI
import { bindDownloadButtons } from './ui/bindDownloadButton';
import { bindOrderButton } from './ui/bindOrderButton';
import { bindScrollTopButton } from './ui/bindScrollTopButton';
import { bindFilterButton } from './ui/bindFilterButton';
import { bindFilterVersion } from './ui/bindFilterVersion';
import { toggleCategoryLayout } from './ui/toggleCategoryLayout';
import { detailProduct } from './ui/handlerDetailProduct';
// Core
import { setCatalogConfig } from './core/helpers';
import { loadMoreData } from './core/loader';
// Events
import { searchHandler } from './events/searchHandler';
import { scrollHandler } from './events/scrollHandler';

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedJenis = urlParams.get('jenis');
    const version = urlParams.get('version');
    const category = urlParams.get('category');
    // 1. Load pertama dan set global state
    setCatalogConfig({ selectedJenis, category, version });
    loadMoreData();
    // 2. Toggle layout kategori dipanggil pertama kali + on resize
    toggleCategoryLayout({ selectedJenis, hasCategory: category, isRenderTypes: false });
    $(window).on('resize', () => toggleCategoryLayout({ selectedJenis, hasCategory: category, isRenderTypes: false }));

    bindFilterButton(selectedJenis);
    bindDownloadButtons();
    bindOrderButton();
    bindScrollTopButton();
    bindFilterVersion();
    searchHandler();
    scrollHandler();
    detailProduct();
});
