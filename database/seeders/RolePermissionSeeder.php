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
        \App\Models\MPermissions::truncate();
        \App\Models\MRole::truncate();

        // Create roles
        $superAdminRole = \App\Models\MRole::firstOrCreate(['name' => 'Super Admin']);
        $adminRole = \App\Models\MRole::firstOrCreate(['name' => 'Admin Data']);

        // Create permissions
        $permissions = [
            ['name' => 'management_users'],
            ['name' => 'management_roles'],
            ['name' => 'management_product'],
        ];

        foreach ($permissions as $permission) {
            $perm = \App\Models\MPermissions::firstOrCreate($permission);
            if ($permission['name'] == 'management_users') {
                $adminRole->permissions()->syncWithoutDetaching($perm->id);
            }
            $superAdminRole->permissions()->syncWithoutDetaching($perm->id);
        }
    }
}
