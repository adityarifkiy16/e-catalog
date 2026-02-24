<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Catalog Generated</title>
</head>

<body>
    <h2>Catalog Berhasil Dibuat</h2>

    <p>Halo,</p>

    <p>
        Catalog untuk versi
        <strong>{{ $version->name }}</strong>
        telah berhasil digenerate.
    </p>

    <p>
        Anda dapat mengunduh file melalui sistem atau dashboard.
    </p>

    <p>
        Link download:
        <a href="{{ asset('storage/' . $path) }}">
            Download Catalog
        </a>
    </p>

    <br>
    <p>Terima kasih.</p>
</body>

</html>
