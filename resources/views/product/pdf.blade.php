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

<body
    style="margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif;">

    <table style="width: 100%; max-width: 1000px; border-collapse: collapse;">
        <tr>
            <!-- Kolom Kiri: Mockup -->
            <td align="center" width="100%" valign="middle">
                <img src="{{ $product->converted_photo }}" alt="{{ $product->code }}"
                    style="max-width: 80vh; height: auto; display: block;">
            </td>

            <!-- Kolom Kanan: Motif + Informasi -->
            <td width="50%" valign="middle" align="center">
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <img src="{{ $product->converted_photo2 }}" alt="{{ $product->code }}"
                        style="width: 50%; height: auto; margin-bottom: 10px;">
                    <h1 style="margin: 10px 0; font-size: 24px;"><strong>{{ $product->code }}</strong></h1>
                    <p style="margin: 2px 0;"><strong>Kategori:</strong>
                        {{ $product->category->name ?? 'Tanpa Kategori' }}</p>
                    @if ($product->category->jenis_id == 1)
                        <p style="margin: 2px 0;"><strong>Panjang:</strong> {{ (int) $product->panjang ?? '-' }} cm</p>
                        <p style="margin: 2px 0;"><strong>Tinggi:</strong> {{ (int) $product->tinggi ?? '-' }} cm</p>
                        <p style="margin: 2px 0;"><strong>ketebalan:</strong> {{ (int) $product->ketebalan ?? '-' }} mm
                        </p>
                    @endif
                </div>
            </td>
        </tr>
    </table>
</body>
