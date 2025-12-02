/**
 * Bind event listener for order button
 * Send whatsapp message to admin when button is clicked
 * The message will contain the product details
 */
export function bindOrderButton() {
    $(document)
        .off('click', '.modalContact')
        .on('click', '.modalContact', function (e) {
            e.preventDefault();
            const phone = '62816659688';
            const jenis = $(this).data('jenis');
            let message = '';
            if (jenis.toLowerCase() == 'wallpanel') {
                message =
                    `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                    `• Tipe Wallpanel: *${$(this).data('type')}*\n` +
                    `• Kode : *${$(this).data('code')}*\n` +
                    `• panjang : *${$(this).data('panjang')}*\n` +
                    `• tinggi : *${$(this).data('tinggi')}*\n` +
                    `• lebar : *${$(this).data('lebar')}*\n` +
                    `• Produk : *${$(this).data('jenis')}*\n` +
                    `• Kategori: *${$(this).data('category')}*\n\n` +
                    `Apakah produk ini masih tersedia? Terima kasih.`;
            } else if (jenis.toLowerCase() == 'pvc board') {
                message =
                    `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                    `• Produk : *${$(this).data('jenis')}*\n` +
                    `• Ketebalan : *${$(this).data('code')}*\n` +
                    `• density: *${$(this).data('kepadatan') ?? '-'}*\n\n` +
                    `Apakah produk ini masih tersedia? Terima kasih.`;
            } else if (jenis.toLowerCase() == 'uv board') {
                message =
                    `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                    `• Kode Motif : *${$(this).data('code')}*\n` +
                    `• Produk : *${$(this).data('jenis')}*\n` +
                    `• Kategori: *${$(this).data('category')}*\n\n` +
                    `• Paket: *${$(this).data('kepadatan') ?? '-'}*\n\n` +
                    `Apakah produk ini masih tersedia? Terima kasih.`;
            } else if (jenis.toLowerCase() == 'aksesoris') {
                message =
                    `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                    `• Kode : *${$(this).data('code')}*\n` +
                    `• Produk : *${$(this).data('jenis')}*\n` +
                    `• Ukuran : *${$(this).data('category')}*\n\n` +
                    `• Warna : *${$(this).data('kepadatan')}*\n\n` +
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
