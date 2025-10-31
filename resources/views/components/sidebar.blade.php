<nav class="mt-2">
    @include('partials.sidebar._user_panel')

    <ul class="nav nav-pills nav-sidebar nav-dark flex-column" data-widget="treeview" role="menu" data-accordion="false">
        @if (auth()->check())
            @include('partials.sidebar._nav_item', [
                'route' => 'dashboard',
                'icon' => 'fas fa-home',
                'label' => 'Dashboard',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('management_users'))
            <li class="nav-header">
                Pengguna
            </li>
            @include('partials.sidebar._nav_item', [
                'route' => 'users.index',
                'icon' => 'fas fa-users',
                'label' => 'User',
            ])
        @endif
        @if (auth()->check() && auth()->user()->hasPermission('management_roles'))
            @include('partials.sidebar._nav_item', [
                'route' => 'role.index',
                'icon' => 'fas fa-user',
                'label' => 'Role',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('management_product'))
            <li class="nav-header">
                Produk
            </li>
            @include('partials.sidebar._nav_tree', [
                'title' => 'Manajemen Produk',
                'icon' => 'fas fa-box',
                'items' => [
                    ['route' => 'jenis.index', 'label' => 'Jenis', 'icon' => 'far fa-circle'],
                    ['route' => 'type.index', 'label' => 'Tipe (Wallpanel)', 'icon' => 'far fa-circle'],
                    ['route' => 'categories.index', 'label' => 'Kategori', 'icon' => 'far fa-circle'],
                    ['route' => 'package.index', 'label' => 'Paket', 'icon' => 'far fa-circle'],
                    ['route' => 'products.index', 'label' => 'Produk', 'icon' => 'far fa-circle'],
                ],
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('view_reports'))
            <li class="nav-header">
                Laporan
            </li>
            @include('partials.sidebar._nav_item', [
                'route' => 'laporan.index',
                'icon' => 'fas fa-file-alt',
                'label' => 'Laporan Produk',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('management_product'))
            <li class="nav-header">
                Lainnya
            </li>
            @include('partials.sidebar._nav_item', [
                'route' => 'clear-cache',
                'icon' => 'fas fa-trash',
                'label' => 'Clean Up',
            ])
        @endif

        @if (auth()->check() && auth()->user()->hasPermission('management_settings'))
            <li class="nav-header">
                setting
            </li>
            @include('partials.sidebar._nav_item', [
                'route' => 'settings.index',
                'icon' => 'fas fa-cog',
                'label' => 'Pengaturan',
            ])
        @endif
        @include('partials.sidebar._nav_item', [
            'route' => 'pdf.index',
            'icon' => 'fas fa-cog',
            'label' => 'Manajemen PDF',
        ])
        @include('partials.sidebar._nav_item', [
            'route' => 'version.index',
            'icon' => 'fas fa-cog',
            'label' => 'Manajemen Versi Katalog',
        ])
    </ul>
</nav>
