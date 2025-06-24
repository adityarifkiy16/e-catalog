<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = \App\Models\MRole::firstOrCreate(['name' => 'admin']);

        // Create permissions
        $permissions = [
            ['name' => 'view_dashboard'],
            ['name' => 'view_users'],
            ['name' => 'create_users'],
            ['name' => 'edit_users'],
            ['name' => 'delete_users'],
            ['name' => 'view_categories'],
            ['name' => 'create_categories'],
            ['name' => 'edit_categories'],
            ['name' => 'delete_categories'],
            ['name' => 'view_products'],
            ['name' => 'create_products'],
            ['name' => 'edit_products'],
            ['name' => 'delete_products'],
        ];

        foreach ($permissions as $permission) {
            $perm = \App\Models\MPermissions::firstOrCreate($permission);
            $adminRole->permissions()->syncWithoutDetaching($perm->id);
        }
    }
}
