<?php

namespace App\Services;

use App\Models\TProduct;
use App\Models\ProductView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class ProductViewServices
{

    public function store(TProduct $product, Request $request)
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();
        $cacheKey = "product_view_{$product->id}_{$ipAddress}";

        if (Cache::has($cacheKey)) {
            return;
        }

        ProductView::updateOrCreate([
            'product_id' => $product->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'viewed_at' => now(),
        ], ['viewed_at' => now()]);

        Cache::put($cacheKey, true, now()->addDay());

        return true;
    }

    public function filter($filter)
    {
        $query = TProduct::withCount([
            'views as views_count' => function ($q) use ($filter) {
                if ($filter) {
                    $filter = trim($filter);

                    // Jika mengandung rentang (contoh: 2025-10-01 - 2025-10-21)
                    if (str_contains($filter, ' - ')) {
                        [$start, $end] = array_map('trim', explode(' - ', $filter));

                        try {
                            $start = \Carbon\Carbon::parse($start)->startOfDay();
                            $end =  \Carbon\Carbon::parse($end)->endOfDay();
                            $q->whereBetween('viewed_at', [$start, $end]);
                        } catch (\Exception $e) {
                            Log::warning('Filter tanggal tidak valid: ' . $filter);
                        }
                    } else {
                        // Jika hanya 1 tanggal
                        try {
                            $date =  \Carbon\Carbon::parse($filter)->toDateString();
                            $q->whereDate('viewed_at', $date);
                        } catch (\Exception $e) {
                            Log::warning('Filter tanggal tunggal tidak valid: ' . $filter);
                        }
                    }
                }
            }
        ])
            ->having('views_count', '>', 0)
            ->orderBy('views_count', 'desc')
            ->limit(10);

        return $query;
    }
}
