<head>
    <title>CATALOG - PDF</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 15mm;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 13px;
            color: #333;
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            vertical-align: middle;
            padding: 0 20px;
        }

        .left-col {
            width: 55%;
            text-align: center;
        }

        .left-col img {
            max-width: 90%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 10px;
        }

        .right-col {
            width: 45%;
            text-align: left;
        }

        .product-code {
            font-size: 26px;
            font-weight: 700;
            color: #2c2c2c;
            margin-bottom: 5px;
        }

        .product-type {
            font-size: 14px;
            color: #888;
            margin-bottom: 20px;
        }

        .spec-table {
            font-size: 14px;
            width: auto;
        }

        .spec-table td {
            padding: 4px 8px;
        }

        .spec-table td:first-child {
            text-transform: capitalize;
            width: 80px;
            color: #333;
        }

        .spec-table td:nth-child(2) {
            width: 10px;
        }

        .thumb {
            margin-top: 25px;
        }

        .thumb img {
            width: 80px;
            height: auto;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 4px;
        }

        footer {
            position: fixed;
            bottom: 10px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 11px;
            color: #666;
            border-top: 0.5px solid #ccc;
            padding-top: 5px;
        }

        footer p {
            margin: 2px 0;
        }
    </style>
</head>

<body>
    <table width="100%" cellspacing="10" style="margin-top: 0; border-bottom: 1px solid #000;">
        <tr>
            <td width="50%" align="start">
                <h5 style="margin-bottom: 0;">KATALOG PRODUK</h5>
                <h2 style="margin-top: 1; font-weight: bold">{{ config('app.name') }}</h2>
            </td>
            <td width="30%" align="right">
                <p style="margin-bottom: 0;">Jl. Kamajaya No. 8A, Kel. Wonosari, Kec. Ngaliyan, Kota Semarang, Jawa
                    Tengah</p>
                <p style="margin-top: 0; font-weight: bold">Telp: +62816659688</p>
            </td>
        </tr>
    </table>
    <br><br>
    <table>
        <tr>
            <!-- Gambar utama -->
            <td class="left-col">
                <img src="{{ $product->converted_photo }}" alt="{{ $product->code }}">
            </td>

            <!-- Informasi produk -->
            <td class="right-col">
                <div class="product-info">
                    <div class="product-code">{{ $product->code }}</div>
                    <div class="product-type">{{ strtoupper($product->category->name ?? 'TANPA KATEGORI') }}
                        {{ strtoupper($product->category->types ? '/' . $product->category->types->name : '') }}
                    </div>

                    @if ($specifications->count() > 0)
                        <table class="spec-table">
                            @php
                                // Kelompokkan spesifikasi berdasarkan nama (lowercase agar konsisten)
                                $groupedSpecs = $specifications->groupBy(fn($s) => strtolower($s->specification_name));
                            @endphp

                            @foreach ($groupedSpecs as $name => $items)
                                <tr>
                                    <td>{{ $name }}</td>
                                    <td>:</td>
                                    <td>
                                        {{-- Gabungkan semua nilai dengan koma --}}
                                        {{ collect($items)->pluck('specification_value')->join(', ') }}
                                        {{-- Tambahkan satuan jika berlaku --}}
                                        @if (in_array($name, ['panjang', 'lebar', 'tinggi']))
                                            cm
                                        @else
                                            {{ $items->first()->specification_unit ?? '' }}
                                        @endif
                                    </td>
                                </tr>
                            @endforeach

                        </table>
                    @endif

                    <div class="thumb">
                        <img src="{{ $product->converted_photo2 }}" alt="{{ $product->code }}">
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <footer>
        <p><strong>&copy;{{ date('Y') }} Osborn</strong> — osborn.id</p>
        <p>Design Beyond Limits</p>
    </footer>
</body>
