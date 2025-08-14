export function bindOrderButton() {
    $(document).on('click', '.modalContact', function (e) {
        e.preventDefault();
        console.log('Klik tombol order', $(this).data('code'));
        const phone = '62816659688';
        let message = '';
        if ($(this).data('wallpanel')) {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Tipe Wallpanel: *${$(this).data('wallpanel')}*\n` +
                `• Kode Motif : *${$(this).data('code')}*\n` +
                `• Produk : *${$(this).data('jenis')}*\n` +
                `• Kategori: *${$(this).data('category')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        } else if ($(this).data('kepadatan')) {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Produk : *${$(this).data('jenis')}*\n` +
                `• Ukuran : *${$(this).data('code')}*\n` +
                `• Kepadatan: *${$(this).data('kepadatan')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        } else {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Kode Motif : *${$(this).data('code')}*\n` +
                `• Produk : *${$(this).data('jenis')}*\n` +
                `• Kategori: *${$(this).data('category')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        }
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
}
