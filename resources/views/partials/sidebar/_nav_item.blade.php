<li class="nav-item {{ request()->routeIs($route) ? 'menu-open' : '' }}">
    <a href="{{ route($route) }}" class="nav-link {{ request()->routeIs($route) ? 'bg-primary' : 'bg-dark' }}">
        <i class="{{ $icon }} nav-icon"></i>
        <p>{{ $label }}</p>
    </a>
</li>
