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
            @include('partials.sidebar._nav_item', [
                'route' => 'role.index',
                'icon' => 'fas fa-user',
                'label' => 'Role',
            ])
        @endif

        @include('partials.sidebar._nav_tree', [
            'title' => 'Manajemen Produk',
            'icon' => 'fas fa-box',
            'items' => [
                ['route' => 'jenis.index', 'label' => 'Jenis', 'icon' => 'fas fa-layer-group'],
                ['route' => 'type.index', 'label' => 'Tipe', 'icon' => 'fas fa-shapes'],
                ['route' => 'categories.index', 'label' => 'Kategori', 'icon' => 'fas fa-folder'],
                ['route' => 'products.index', 'label' => 'Produk/Motif', 'icon' => 'fas fa-cubes'],
                ['route' => 'package.index', 'label' => 'Paket', 'icon' => 'fas fa-box'],
            ],
        ])

        @include('partials.sidebar._nav_tree', [
            'title' => 'Varian',
            'icon' => 'fas fa-box',
            'items' => [
                ['route' => 'variants.index', 'label' => 'Varian', 'icon' => 'fas fa-layer-group ml-2'],
                ['route' => 'variant_values.index', 'label' => 'Tipe', 'icon' => 'fas fa-shapes ml-2'],
            ],
        ])
    </ul>
</nav>
