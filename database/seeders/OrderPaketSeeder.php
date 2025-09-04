<?php

namespace Database\Seeders;

use App\Models\TPackage;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderPaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Paket 1
        $order = ['order' => 1];
        TPackage::where("name", "paket 1")->update($order);

        // Paket 2
        $order = ['order' => 2];
        TPackage::where("name", "paket 2")->update($order);

        // Paket 3
        $order = ['order' => 3];
        TPackage::where("name", "paket 3")->update($order);
    }
}
