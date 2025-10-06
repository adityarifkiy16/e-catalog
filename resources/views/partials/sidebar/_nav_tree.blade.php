<li class="nav-item has-treeview bg-dark rounded menu-open">
    <a href="#" class="nav-link">
        <i class="nav-icon {{ $icon }}"></i>
        <p>
            {{ $title }}
            <i class="right fas fa-angle-left"></i>
        </p>
    </a>
    <ul class="nav nav-treeview pl-4">
        @foreach ($items as $item)
            <li class="nav-item">
                <a href="{{ route($item['route']) }}" class="nav-link" style="">
                    <i class="{{ $item['icon'] ?? 'fas fa-circle' }} nav-icon"></i>
                    <p>{{ $item['label'] }}</p>
                </a>
            </li>
        @endforeach
    </ul>
</li>
