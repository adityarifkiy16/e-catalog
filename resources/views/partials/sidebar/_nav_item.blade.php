<li class="nav-item {{ request()->routeIs($route) ? 'menu-open' : '' }}">
    <a href="{{ route($route) }}" class="nav-link">
        <i class="{{ $icon }} nav-icon"></i>
        <p>{{ $label }}</p>
    </a>
</li>
