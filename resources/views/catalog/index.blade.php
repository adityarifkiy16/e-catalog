@extends('layouts.catalog')

@section('content')
    <div class="w-100 d-flex justify-content-center align-items-center mb-4">
        <div class="d-flex justify-content-around align-items-center p-2 w-100" style="background-color: #1B1A55">
            <img src="{{ asset('dist/img/osborn.png') }}" alt="osborn-logo" style="width: 100px; height: auto;">
            <div style="width: 300px;">
                <input type="text" id="search-input" class="form-control" placeholder="Search product by code"
                    value="{{ request()->query('search') }}">
            </div>
        </div>
    </div>
    <div class="container py-4">
        <div class="row">
            <div class="col-md-6">
                <div class="jenis-filter">
                    <div class="d-flex justify-content-between align-items-center mb-3 ">
                        <select id="jenis-filter" class="form-control mr-2" name="jenis">
                            <option value="">Choose Design</option>
                            @foreach ($jenis as $item)
                                <option value="{{ $item->id }}"
                                    {{ old('jenis', request()->query('jenis')) == $item->id ? 'selected' : '' }}>
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>
                        <button class="btn" type="submit" id="btn-filter-jenis"
                            style="width: 100px; background-color: #a3764c; color: white;">
                            Filter
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div id="category-container">
                </div>
            </div>
        </div>
        <div id="product-list">
            <div class="row">
                @forelse ($data as $product)
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-md">
                            <img src="{{ $product->photo ? asset('storage/' . $product->photo) : 'https://via.placeholder.com/300x200?text=No+Image' }}"
                                class="card-img-top" alt="{{ $product->name }}" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">{{ $product->code }}</h5>
                                <p class="card-text text-muted">{{ $product->category->name ?? 'Tanpa Kategori' }}</p>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12 text-muted">Belum ada produk yang tersedia.</div>
                @endforelse
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        let delayTimer;
        $('#search-input').on('input', function() {
            clearTimeout(delayTimer);
            const search = $(this).val();
            let jenis = $('#jenis-filter').val();
            let category = $('#category-filter').val();


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
                                <div class="col-md-4 mb-4">
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
                                `<div class="col-12 text-muted">Produk tidak ditemukan.</div>`;
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

        $('#btn-filter-jenis').on('click', function() {
            const selectedJenis = $('#jenis-filter').val();
            const url = "{{ route('catalog') }}";

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

                        // Tampilkan produk
                        if (response.data && response.data.length > 0) {
                            response.data.forEach(product => {
                                const image = product.photo ?
                                    `/storage/${product.photo}` :
                                    'https://via.placeholder.com/300x200?text=No+Image';
                                const category = product.category?.name ??
                                    'Tanpa Kategori';

                                html += `
                            <div class="col-md-4 mb-4">
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
                                `<div class="col-12 text-muted">Produk tidak ditemukan.</div>`;
                        }

                        html += '</div>';
                        $('#product-list').html(html);
                        console.log(response);
                        if (response.categories) {
                            let dropdown = `
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <select id="category-filter" class="form-control mr-2" name="category">
                                        <option value="">Choose Categories</option>`;

                            response.categories.forEach(cat => {
                                dropdown +=
                                    `<option value="${cat.id}">${cat.name}</option>`;
                            });

                            dropdown += `
                                    </select>
                                    <button class="btn" type="button" id="btn-filter-category"  style="width: 100px; background-color: #a3764c; color: white;">
                            Filter</button>
                                </div>`;

                            // Masukkan ke dalam container
                            $('#category-container').html(dropdown);
                        } else {
                            $('#category-container').html('');
                        }
                    },
                    error: function() {
                        $('#product-list').html(
                            '<div class="text-danger">Terjadi kesalahan saat mengambil data.</div>'
                        );
                    }
                });
            }, 500);
        });
        // Delegasi event karena #btn-filter-category di-render secara dinamis
        $(document).on('click', '#btn-filter-category', function() {
            const selectedJenis = $('#jenis-filter').val();
            const selectedCategory = $('#category-filter').val();

            $.ajax({
                url: "{{ route('catalog') }}",
                type: "GET",
                data: {
                    jenis: selectedJenis,
                    category: selectedCategory
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
                        <div class="col-md-4 mb-4">
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
                        html += `<div class="col-12 text-muted">Produk tidak ditemukan.</div>`;
                    }

                    html += '</div>';
                    $('#product-list').html(html);
                },
                error: function() {
                    $('#product-list').html(
                        '<div class="text-danger">Terjadi kesalahan saat mengambil data.</div>');
                }
            });
        });
    </script>
@endpush
