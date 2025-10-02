export function renderVariantsToModal(variants, container = '#modalVariants') {
    $(container).empty();
    $('#modalPaket').empty();

    if (Array.isArray(variants) && variants.length > 0) {
        let hasWarna = false;
        let hasDensity = false;

        variants.forEach((v) => {
            const values = v.variant_values || [];
            const nameLower = v.name.toLowerCase();

            if (nameLower === 'warna') {
                hasWarna = true;
                $('#paket').text('Warna'); // ubah label Paket jadi Warna

                if (values.length > 0) {
                    values.forEach((val) => {
                        if (v.pivot && val.id === v.pivot.variant_value_id) {
                            $('#modalPaket').append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${val.name}">
                                    ${val.name}
                                </span>
                            `);
                        }
                    });
                } else {
                    $('#modalPaket').append(`<span class="text-muted">Tidak ada data</span>`);
                }
            } else if (nameLower === 'density') {
                hasDensity = true;
                $('#paket').text('Density'); // ubah label Paket jadi Density

                if (values.length > 0) {
                    values.forEach((val) => {
                        if (v.pivot && val.id === v.pivot.variant_value_id) {
                            $('#modalPaket').append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${val.name}">
                                    ${val.name}
                                </span>
                            `);
                        }
                    });
                } else {
                    $('#modalPaket').append(`<span class="text-muted">Tidak ada data</span>`);
                }
            } else {
                // varian biasa → row dengan unit
                const value = values.find((val) => v.pivot && val.id === v.pivot.variant_value_id);
                const displayValue = value ? value.name : '-';

                let unit = '';
                if (['panjang', 'tinggi', 'lebar'].includes(nameLower)) unit = ' cm';
                else if (nameLower === 'ketebalan') unit = ' mm';

                const rowHtml = `
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${v.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${displayValue}${unit}</div>
                    </div>
                `;
                $(container).append(rowHtml);
            }
        });

        // tampilkan badge jika ada warna atau density
        if (!hasWarna && !hasDensity) $('.paket').hide();
        else $('.paket').show();
    } else {
        $(container).append(`<div class="text-muted">Tidak ada varian</div>`);
        $('.paket').hide();
    }
}
