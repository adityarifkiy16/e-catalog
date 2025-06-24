<nav class="mt-2">
    @include('partials.sidebar._user_panel')

    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        @if (auth()->check() && auth()->user()->hasPermission('view_dashboard'))
            @include('partials.sidebar._nav_item', [
                'route' => 'dashboard',
                'icon' => 'fas fa-home',
                'label' => 'Dashboard',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('view_users'))
            @include('partials.sidebar._nav_item', [
                'route' => 'users.index',
                'icon' => 'fas fa-users',
                'label' => 'User',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('view_categories'))
            @include('partials.sidebar._nav_item', [
                'route' => 'categories.index',
                'icon' => 'fas fa-tags',
                'label' => 'Categories',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('view_products'))
            @include('partials.sidebar._nav_item', [
                'route' => 'products.index',
                'icon' => 'fas fa-box',
                'label' => 'products',
            ])
        @endif

        {{-- @if (auth()->check() && auth()->user()->hasPermission('view_role'))
            @include('partials.sidebar._nav_item', [
                'route' => 'role.index',
                'icon' => 'fas fa-user',
                'label' => 'Role',
            ])
        @endif --}}

        {{-- 
                @include('partials.sidebar._nav_item', [
                    'route' => 'permission.index',
                    'icon' => 'fas fa-user',
                    'label' => 'Permission',
                ]) --}}

    </ul>
</nav>
