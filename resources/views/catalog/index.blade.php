@extends('layouts.catalog')

@section('content')
    <div class="w-100 d-flex justify-content-center align-items-center mb-4">
        <div class="d-flex justify-content-start align-items-center py-3 px-3 w-100" style="background-color: #1B1A55">
            <a href="https://osborn.id/" target="_blank" style="margin-left: 7.5rem" class="py-2"> <img
                    src="{{ asset('dist/img/osborn.png') }}" alt="osborn-logo" style="width: 130px; height: auto;"></a>
        </div>
    </div>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-10 col-12 order-2 order-md-2 center-content" id="catalog-col">
                <div class="row">
                    <div class="col-md-12">
                        <div class="jenis-filter">
                            <div class="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row">
                                <select id="jenis-filter" class="form-control mt-2" name="jenis" style="width: 300px">
                                    <option value="">Choose Design</option>
                                    @foreach ($jenis as $item)
                                        <option value="{{ $item->id }}"
                                            {{ old('jenis', request()->query('jenis')) == $item->id ? 'selected' : '' }}>
                                            {{ $item->name }}
                                        </option>
                                    @endforeach
                                </select>
                                <div style="width: 300px;" class="mt-2">
                                    <input type="text" id="search-input" class="form-control"
                                        placeholder="Search product by code" value="{{ request()->query('search') }}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="product-list">
                    <div class="row">
                        @forelse ($data as $product)
                            <div class="col-md-3 mb-4">
                                <div class="card h-100 shadow-md">
                                    <img src="{{ $product->photo ? asset('storage/' . $product->photo) : 'https://via.placeholder.com/300x200?text=No+Image' }}"
                                        class="card-img-top" alt="{{ $product->name }}"
                                        style="height: 200px; object-fit: cover;">
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="card-title font-weight-bold">{{ $product->code }}</h5>
                                        <p class="card-text text-muted">{{ $product->category->name ?? 'Tanpa Kategori' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                                class="img-fluid mx-auto d-block mt-5" style="max-width: 100%; height: auto;">
                        @endforelse
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-12 order-1 order-md-1 d-none" id="category-container">
                <div class="sidebarborder-end">
                    <div class="accordion" id="accordionExample">
                        <div class="" style="background: #f5efe0">
                            <div class="" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-block text-left" type="button" data-toggle="collapse"
                                        data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <span class="font-weight-bold h3">Kategori</span>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                data-parent="#accordionExample">
                                <div class="card-body">
                                    <ul class="nav flex-column" id="category-menu-item">
                                        <!-- Kategori akan diisi oleh JavaScript -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        let delayTimer;
        let category;
        $('#search-input').on('input', function() {
            clearTimeout(delayTimer);
            const search = $(this).val();
            let jenis = $('#jenis-filter').val();



            delayTimer = setTimeout(() => {
                $.ajax({
                    url: "{{ route('catalog') }}",
                    type: "GET",
                    data: {
                        search,
                        jenis,
                        category
                    },
                    success: function(response) {
                        console.log(response);
                        let html = '<div class="row">';
                        if (response) {
                            response.data.forEach(product => {
                                const image = product.photo ?
                                    `/storage/${product.photo}` :
                                    'https://via.placeholder.com/300x200?text=No+Image';
                                const category = product.category?.name ??
                                    'Tanpa Kategori';

                                html += `
                                <div class="col-md-3 mb-4">
                                    <div class="card h-100 shadow-md">
                                        <img src="${image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                        <div class="card-body d-flex flex-column">
                                            <h5 class="card-title">${product.code}</h5>
                                            <p class="card-text text-muted">${category}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                            });
                        } else {
                            html +=
                                `<img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                                class="img-fluid mx-auto d-block mt-5" style="max-width: 100%; height: auto;">`;
                        }
                        html += '</div>';
                        $('#product-list').html(html);
                    },
                    error: function() {
                        $('#product-list').html(
                            '<div class="text-danger">Terjadi kesalahan saat mengambil data.</div>'
                        );
                    }
                });
            }, 500);
        });

        $('#jenis-filter').on('change', function() {
            const selectedJenis = $('#jenis-filter').val();
            const url = "{{ route('catalog') }}";
            if (selectedJenis) {
                $('#category-container').removeClass('d-none'); // Show sidebar
                $('#catalog-col').removeClass('center-content'); // Geser ke kanan
            } else {
                $('#category-container').addClass('d-none'); // Hide sidebar
                $('#catalog-col').addClass('center-content'); // Center kembali
            }

            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                $.ajax({
                    url: url,
                    type: "GET",
                    data: {
                        jenis: selectedJenis
                    },
                    success: function(response) {
                        let html = '<div class="row">';
                        $("#category-container").show();
                        // Tampilkan produk
                        if (response.data && response.data.length > 0) {
                            response.data.forEach(product => {
                                const image = product.photo ?
                                    `/storage/${product.photo}` :
                                    'https://via.placeholder.com/300x200?text=No+Image';
                                const category = product.category?.name ??
                                    'Tanpa Kategori';

                                html += `
                            <div class="col-md-3 mb-4">
                                <div class="card h-100 shadow-sm">
                                    <img src="${image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="card-title">${product.code}</h5>
                                        <p class="card-text text-muted">${category}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                            });
                        } else {
                            html +=
                                `<img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                                class="img-fluid mx-auto d-block mt-5" style="max-width: 100%; height: auto;">`;
                        }

                        html += '</div>';
                        $('#product-list').html(html);

                        // Inject kategori ke sidebar
                        if (response.categories) {
                            if (response.categories) {
                                let dropdown = `
                                    <li class="nav-item">
                                `;

                                response.categories.forEach(cat => {
                                    dropdown +=
                                        `
                                     <a class="nav-link text-dark category-filter" href="#" data-id="${cat.id}"><i class="fa fa-tags mr-2"></i> ${cat.name}</a>`;
                                });

                                dropdown += `</li>`;

                                $('#category-menu-item').html(dropdown);
                            }
                        } else {
                            $('#category-menu-item').html('');
                        }
                    },
                    error: function() {
                        $('#product-list').html(
                            '<div class="text-danger">Terjadi kesalahan saat mengambil data.</div>'
                        );
                    }
                });
            }, 300);
        });

        $(document).on('click', '.category-filter', function(e) {
            e.preventDefault();

            const categoryId = $(this).data('id');
            const url = "{{ route('catalog') }}";
            category = categoryId;
            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    category: categoryId
                },
                success: function(response) {
                    let html = '<div class="row">';

                    if (response.data && response.data.length > 0) {
                        response.data.forEach(product => {
                            const image = product.photo ?
                                `/storage/${product.photo}` :
                                'https://via.placeholder.com/300x200?text=No+Image';
                            const category = product.category?.name ?? 'Tanpa Kategori';

                            html += `
                        <div class="col-md-3 mb-4">
                            <div class="card h-100 shadow-sm">
                                <img src="${image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${product.code}</h5>
                                    <p class="card-text text-muted">${category}</p>
                                </div>
                            </div>
                        </div>
                    `;
                        });
                    } else {
                        html += `<img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                                class="img-fluid mx-auto d-block mt-5" style="max-width: 100%; height: auto;">`;
                    }

                    html += '</div>';
                    $('#product-list').html(html);
                },
                error: function() {
                    $('#product-list').html(
                        '<div class="text-danger">Gagal memuat produk berdasarkan kategori.</div>');
                }
            });
        });
    </script>
@endpush
