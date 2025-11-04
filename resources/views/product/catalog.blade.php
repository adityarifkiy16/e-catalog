<head>
    <title>CATALOG - PDF</title>
</head>

<body>
    <table width="100%" cellspacing="10" style="margin-top: 0; border-bottom: 1px solid #000;">
        <tr>
            <td width="50%" align="start">
                <h5 style="margin-bottom: 0;">KATALOG PRODUK</h5>
                <h2 style="margin-top: 1; font-weight: bold">{{ config('app.name') }}</h2>
            </td>
            <td width="30%" align="right">
                <H3 style="margin-top: 0; font-weight: bold">Versi Katalog: {{ $version->version ?? '' }}</H3>
                <p style="margin-bottom: 0;">Jl. Kamajaya No. 8A, Kel. Wonosari, Kec. Ngaliyan, Kota Semarang, Jawa
                    Tengah</p>
                <p style="margin-top: 0; font-weight: bold">Telp: +62816659688</p>
            </td>
        </tr>
    </table>
    <br><br>

    <h3 style="margin-top: 20px;">Kategori: {{ $categoryName }}</h3>
    <table width="100%" cellspacing="10" style="margin-bottom: 0;">
        <tr>
            @foreach ($products as $i => $product)
                <td width="25%" align="center" valign="top">
                    @foreach ($product->images as $image)
                        @if ($image->type == 'thumbnail')
                            <img src="{{ $image->converted_photo }}"
                                style="max-width: 200px; height: auto; margin-bottom: 10px;">
                        @endif
                    @endforeach
                    <br>
                    <strong class="uppercase">{{ $categoryName }}</strong>
                    <p>{{ $product->product->code ?? '' }}</p>
                </td>

                @if (($i + 1) % 4 == 0)
        </tr>
        <tr>
            @endif
            @endforeach
        </tr>
    </table>
    <br><br>
    <div style="position: absolute; bottom: 0; width: 100%; text-align: center;">
        <table width="100%" cellspacing="10">
            <tr>
                <td align="center">
                    <p><strong>&copy;{{ date('Y') }} Osborn</strong> — osborn.id</p>
                    <p>Design Beyond Limits</p>
                </td>
            </tr>
        </table>
    </div>
</body>
