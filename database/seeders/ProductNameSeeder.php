<?php

namespace Database\Seeders;

use App\Models\TProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductNameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $acc = TProduct::whereHas('category', function ($query) {
            $query->where('jenis_id', 4);
        })->get();

        foreach ($acc as $a) {
            $name = preg_replace('/\[\d+mm\]/i', '', $a->code);
            $a->update([
                'name' => $name,
            ]);
        }

        $wp = TProduct::whereHas('category', function ($query) {
            $query->where('jenis_id', 3);
        })->get();

        foreach ($wp as $w) {
            $parts = explode(' ', $w->code);
            $name = trim(implode(' ', array_slice($parts, 4)));
            $w->update([
                'name' => $name,
            ]);
        }

        $uv = TProduct::whereHas('category', function ($query) {
            $query->where('jenis_id', 5);
        })->get();

        foreach ($uv as $u) {
            $parts = explode(' ', $u->code);
            $name = trim(implode(' ', array_slice($parts, 1)));
            $u->update([
                'name' => $name,
            ]);
        }

        $otherProd = TProduct::whereHas('category', function ($query) {
            $query->where('jenis_id', '!=', 3);
            $query->where('jenis_id', '!=', 4);
            $query->where('jenis_id', '!=', 5);
        })->get();

        foreach ($otherProd as $o) {
            $o->update([
                'name' => $o->code,
            ]);
        }
    }
}
