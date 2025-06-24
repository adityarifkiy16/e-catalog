<nav aria-label="breadcrumb" class="d-flex justify-content-between align-items-center py-3">
    <ol class="breadcrumb bg-white">
        @foreach ($items as $index => $item)
            @if (is_array($item) && isset($item['url']))
                <li class="breadcrumb-item h4">
                    <a href="{{ $item['url'] }}" class="text-decoration-none text-dark">
                        {{ $item['label'] }}
                    </a>
                </li>
            @else
                <li class="breadcrumb-item h4 active" aria-current="page">
                    {{ $item['label'] ?? $item }}
                </li>
            @endif
            @if (!$loop->last)
                <!-- Menambahkan separator hanya jika bukan item terakhir -->
                <span class="breadcrumb-separator"> </span>
            @endif
        @endforeach
    </ol>
</nav>
