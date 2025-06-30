<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Verifikasi Email - Reset Password</title>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3490dc;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Verifikasi Email - Reset Password</h2>
        <p>Dear {{ $name }},</p>

        <p>You are receiving this email because we received a password reset request for your account.</p>

        <p>
            <a class="btn" href="{{ $url }}">Reset Password</a>
        </p>

        <p>If you did not request a password reset, no further action is required.</p>

        <p>Regards,</p>
        <p>Team {{ config('app.name') }}</p>
    </div>
</body>

</html>
