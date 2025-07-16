@extends ('layouts.catalog')
@section('content')
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
