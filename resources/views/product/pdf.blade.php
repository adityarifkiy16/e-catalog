<head>
    <title>CATALOG - PDF</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 15mm;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }

        h4 {
            margin: 0;
        }

        .uppercase {
            text-transform: uppercase;
        }

        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
        }

        .footer p {
            font-size: 12px;
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            padding: 10px;
        }

        img {
            width: 100%;
            height: auto;
        }
    </style>
</head>

<body>
    <table style="height: 100%; width: 100%;">
        <tr>
            <td align="center" valign="top" colspan="2">
                <img src="{{ $product->converted_photo }}" alt="{{ $product->code }}">
            </td>
        </tr>
        <tr>
            <td width="90%" align="left" valign="middle" style="padding: 10px;">
                <h1 style="margin: 0;"><strong>{{ $product->code }}</strong></h1>
                <p style="margin-top: 10px; text-align: left;" class="uppercase">
                    <span style="font-weight: bold;">Kategori:</span>
                    {{ $product->category->name ?? 'Tanpa Kategori' }}
                </p>
                <p style="margin-top: 10px; text-align: left;">
                    <span style="font-weight: bold;" class="uppercase">Ukuran:</span>
                    3mm
                </p>
                <p style="margin-top: 10px; text-align: left;">
                    <span style="font-weight: bold;" class="uppercase">Panjang:</span>
                    20x20x20
                </p>
            </td>
            <td width="23%" align="right" valign="top" style="padding: 10px;">
                <img src="{{ $product->converted_photo2 }}" alt="{{ $product->code }}">
            </td>
        </tr>
    </table>


    <div class="footer">
        <p>&copy; {{ date('Y') }} Osborn</p>
    </div>
</body>
