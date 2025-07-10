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
    <table style="height: 100%;">
        <tr>
            <td width="50%" align="center" valign="top">
                <img src="{{ $product->converted_photo }}" alt="{{ $product->code }}">
            </td>
            <td width="50%" align="center" valign="middle">
                <h1><strong>{{ $product->code }}</strong></h1>
                <br>
                <p style="margin-top: 0px;" class="uppercase">Kategori: {{ $product->category->name ?? 'Tanpa Kategori' }}</p><br>
                <p style="margin-top: 0px;" class="uppercase">Ukuran: 3mm</p><br>
                <p style="margin-top: 0px;" class="uppercase">Panjang: 20x20x20</p>
            </td>
        </tr>
    </table>

    <div class="footer">
        <p>&copy; {{ date('Y') }} Osborn</p>
    </div>
</body>