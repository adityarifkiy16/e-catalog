<nav class="mt-2">
    @include('partials.sidebar._user_panel')

    <ul class="nav nav-pills nav-sidebar nav-dark flex-column" data-widget="treeview" role="menu" data-accordion="false">
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

        @include('partials.sidebar._nav_tree', [
            'title' => 'Manajemen Produk',
            'icon' => 'fas fa-box',
            'items' => [
                ['route' => 'jenis.index', 'label' => 'Jenis', 'icon' => 'fas fa-tags'],
                ['route' => 'categories.index', 'label' => 'Kategori', 'icon' => 'fas fa-tags'],
                ['route' => 'products.index', 'label' => 'Produk', 'icon' => 'fas fa-box'],
            ],
        ])


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
