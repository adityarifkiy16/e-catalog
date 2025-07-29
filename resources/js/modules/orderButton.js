export function bindOrderButton() {
    $(document).on('click', '.modalContact', function (e) {
        e.preventDefault();
        const phone = '62816659688';
        const message =
            `Halo Admin,\nSaya tertarik dengan produk berikut:\n\n` +
            `• Kode Produk: *${$(this).data('code')}*\n` +
            `• Jenis: *${$(this).data('jenis')}*\n` +
            `• Kategori: *${$(this).data('category')}*\n\n` +
            `Apakah produk ini masih tersedia? Terima kasih.`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
}
