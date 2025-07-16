@extends ('layouts.catalog')
@section('content')
    <!-- Page Title -->
    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-between align-items-center py-3 px-3 w-100" style="background-color: #000;">
            <a href="https://osborn.id/" target="_blank" class="py-2"> <img src="{{ asset('dist/img/osborn.png') }}"
                    alt="osborn-logo" style="width: 130px; height: auto;"></a>
        </div>
    </div>
    <!-- Carousel Content -->
    <div class="container-fluid p-0 mb-5 rounded">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                @for ($key = 0; $key < 2; $key++)
                    <li data-target="#carouselExampleIndicators" data-slide-to="{{ $key }}"
                        class="{{ $key == 0 ? 'active' : '' }}"></li>
                @endfor
            </ol>
            <div class="carousel-inner">
                @for ($key = 0; $key < 2; $key++)
                    <div class="carousel-item {{ $key == 0 ? 'active' : '' }}">
                        <img src="{{ asset('dist/img/slider/' . ($key + 1) . '.webp') }}" class="d-block w-100 img-fluid"
                            alt="{{ 'Slide ' . ($key + 1) }}">
                    </div>
                @endfor
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container my-5">
        <div class="text-center mb-5">
            <h1 class="display-4 font-weight-bold mb-5">Welcome to <a href="https://osborn.id">Osborn</a> Catalog</h1>
            <h4 class="font-weight-bold text-dark mb-2">
                To help you visualize the image pack,<br>
                we have separated it into four different products
            </h4>
            <p class="text-muted lead">
                Tap on the boxes below to explore<br>
                all the models within the categories 👇
            </p>
        </div>

        <!-- Product Categories -->
        <div class="row justify-content-center">
            @foreach ($jenis as $key => $item)
                <div class="col-6 col-sm-4 col-md-2 text-center mb-4 product-card" data-id="{{ $item->id }}">
                    <div class="card border-0 shadow-sm h-100 pointer">
                        <img src="{{ asset('dist/img/product/' . $key . '.webp') }}" class="card-img-top p-3"
                            alt="{{ $item->name }}">
                        <div class="card-body p-2">
                            <h4 class="card-text font-weight-bold">{{ $item->name }}</h4>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        $(document).ready(function() {
            $('.product-card').click(function() {
                var jenisId = $(this).data('id');
                window.location.href = '/catalog?jenis=' + jenisId;
            });
        });
    </script>
@endpush
