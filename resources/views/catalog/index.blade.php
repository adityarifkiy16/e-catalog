@extends('layouts.catalog')

@section('content')
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4 p-2 rounded" style="background-color: #1B1A55">
            <img src="{{ asset('dist/img/osborn.png') }}" alt="osborn-logo" style="width: 100px; height: auto;">
            <div style="width: 300px;">
                <input type="text" id="search-input" class="form-control" placeholder="Cari produk...">
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
                                <h5 class="card-title">{{ $product->code }}</h5>
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

            delayTimer = setTimeout(() => {
                $.ajax({
                    url: "{{ route('catalog') }}",
                    type: "GET",
                    data: {
                        search
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
    </script>
@endpush
