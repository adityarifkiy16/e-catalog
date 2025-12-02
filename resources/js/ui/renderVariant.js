/**
 * @function renderVariantsToModal
 * @description renders the variants to the modal
 * @param {array} specifications - an array of specification objects
 * @param {string} container - the container element to append the rendered html
 */
export function renderVariantsToModal(specifications, container = '#modalVariants') {
    $(container).empty();
    $('#modalPaket').empty();
    $('#modalKepadatan').empty();

    if (Array.isArray(specifications) && specifications.length > 0) {
        specifications.forEach((v) => {
            const values = v.specification_values || [];
            const nameLower = v.name.toLowerCase();

            if (nameLower === 'warna') {
                $('#paket').text('Warna'); // ubah label Paket jadi Warna
                if (values.length > 0) {
                    values.forEach((val) => {
                        if (v.pivot && val.id === v.pivot.specification_value_id) {
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
                if (values.length > 0) {
                    values.forEach((val) => {
                        if (v.pivot && val.id === v.pivot.specification_value_id) {
                            if (values.length > 1) {
                                $('#modalKepadatan').append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${val.name}">
                                        ${val.name}
                                    </span>
                                `);
                            } else {
                                $('#modalKepadatan').append(val.name);
                            }
                        }
                    });
                } else {
                    $('#modalKepadatan').append(`<span class="text-muted">Tidak ada data</span>`);
                }
            } else {
                // varian biasa → row dengan unit
                const value = values.find((val) => v.pivot && val.id === v.pivot.specification_value_id);
                const displayValue = value ? value.name : '-';
                let unit = value ? value.unit : '';

                if (unit) {
                    unit = ' ' + unit;
                } else if (['panjang', 'tinggi', 'lebar'].includes(nameLower)) {
                    unit = ' cm';
                } else if (nameLower === 'ketebalan') {
                    unit = ' mm';
                }

                const rowHtml = `
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${v.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${displayValue}${unit}</div>
                    </div>
                `;
                $(container).append(rowHtml);
                $('#modalContact').data(nameLower, displayValue + unit);
            }
        });
    } else {
        $(container).append(`<div class="text-muted">Tidak ada varian</div>`);
        $('.paket').hide();
    }
}
