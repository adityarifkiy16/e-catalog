export function bindOrderButton() {
    $(document).on('click', '.modalContact', function (e) {
        e.preventDefault();
        console.log('Klik tombol order', $(this).data('code'));
        const phone = '62816659688';
        const jenis = $(this).data('jenis');
        console.log(jenis.toLowerCase());
        let message = '';
        if (jenis.toLowerCase() == 'wallpanel') {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Tipe Wallpanel: *${$(this).data('type')}*\n` +
                `• Kode Motif : *${$(this).data('code')}*\n` +
                `• Produk : *${$(this).data('jenis')}*\n` +
                `• Kategori: *${$(this).data('category')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        } else if (jenis.toLowerCase() == 'pvc board') {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Produk : *${$(this).data('jenis')}*\n` +
                `• Ketebalan : *${$(this).data('code')}*\n` +
                `• Kepadatan: *${$(this).data('kepadatan')}*\n\n` +
                `Apakah produk ini masih tersedia? Terima kasih.`;
        } else if (jenis.toLowerCase() == 'uv board') {
            message =
                `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
                `• Kode Motif : *${$(this).data('code')}*\n` +
                `• Produk : *${$(this).data('jenis')}*\n` +
                `• Kategori: *${$(this).data('category')}*\n\n` +
                `• Paket: *${$(this).data('kepadatan')}*\n\n` +
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
