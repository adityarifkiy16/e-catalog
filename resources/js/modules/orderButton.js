export function bindOrderButton() {
    let selectedWallpanel = sessionStorage.getItem('selectedWallpanel');

    if (selectedWallpanel) {
        selectedWallpanel = JSON.parse(selectedWallpanel);
        console.log('Restore wallpanel dari sessionStorage:', selectedWallpanel);
    }

    $(document).on('click', '.modalContact', function (e) {
        e.preventDefault();
        console.log('Klik tombol order', $(this).data('code'));
        const phone = '62816659688';
        let message = '';
        if (selectedWallpanel && selectedWallpanel.code) {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Wallpanel: *${selectedWallpanel.code}*\n` +
                `• Motif : *${$(this).data('code')}*\n` +
                `• Jenis: *${$(this).data('jenis')}*\n` +
                `• Kategori: *${$(this).data('category')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        } else {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Kode : *${$(this).data('code')}*\n` +
                `• Jenis : *${$(this).data('jenis')}*\n` +
                `• Kategori: *${$(this).data('category')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        }
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
}
