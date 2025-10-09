<li class="nav-item has-treeview menu-open">
    <a href="#" class="nav-link">
        <i class="nav-icon {{ $icon }}"></i>
        <p>
            {{ $title }}
            <i class="right fas fa-angle-left"></i>
        </p>
    </a>
    <ul class="nav nav-treeview">
        @foreach ($items as $item)
            <li class="nav-item">
                <a href="{{ route($item['route']) }}"
                    class="nav-link {{ Route::is(Str::before($item['route'], '.') . '.*') ? 'active' : '' }}">
                    <i class="{{ $item['icon'] ?? 'fas fa-circle' }} nav-icon"></i>
                    <p>{{ $item['label'] }}</p>
                </a>
            </li>
        @endforeach
    </ul>
</li>
