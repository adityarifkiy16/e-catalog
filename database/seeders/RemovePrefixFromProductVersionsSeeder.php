<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RemovePrefixFromProductVersionsSeeder extends Seeder
{
    public function run(): void
    {
        $versions = DB::table('t_product_m_versions')->get();
        $count = 0;
        $prefixes = [
            '628-',
            '629-',
            '643-',
            '644-',
            '709-',
            '710-',
        ];
        foreach ($versions as $version) {
            $oldName = $version->name;
            $newName = $oldName;

            foreach ($prefixes as $prefix) {
                if (str_starts_with($oldName, $prefix)) {
                    $newName = substr($oldName, strlen($prefix));
                    break;
                }
            }

            if ($newName !== $oldName) {
                DB::table('t_product_m_versions')
                    ->where('id', $version->id)
                    ->update(['name' => $newName]);

                echo "✔️ Updated ID {$version->id}: {$oldName} → {$newName}\n";
                $count++;
            }
        }

        echo "✅ Selesai: {$count} nama versi produk dibersihkan.\n";
    }
}
