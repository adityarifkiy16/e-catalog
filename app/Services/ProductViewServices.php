<?php

namespace App\Services;

use App\Models\ProductView;
use App\Models\TProduct;
use Illuminate\Http\Request;
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

        ProductView::create([
            'product_id' => $product->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'viewed_at' => now(),
        ]);

        Cache::put($cacheKey, true, now()->addMinutes(1));

        return true;
    }

    public function filter($filter)
    {
        $query = TProduct::withCount(['views as views_count' => function ($q) use ($filter) {
            $q->where('viewed_at', '>=', now()->subDays($filter));
        }])
            ->orderBy('views_count', 'desc')
            ->limit(5);

        return $query;
    }
}
