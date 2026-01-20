<nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-white mt-2">
        @foreach ($items as $index => $item)
            @if (is_array($item) && isset($item['url']))
                @if ($item['url'] === url()->current())
                    <li class="breadcrumb-item h4 active" aria-current="page">
                        {{ $item['label'] }}
                    </li>
                @else
                    <li class="breadcrumb-item h4">
                        <a href="{{ $item['url'] }}" class="text-decoration-none">
                            {{ $item['label'] }}
                        </a>
                    </li>
                @endif
            @endif
        @endforeach
    </ol>
</nav>
