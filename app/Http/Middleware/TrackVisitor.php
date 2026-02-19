<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('catalog') || $request->is('/')) {
            $today = today()->toDateString();
            $ip = $request->ip();

            $exists = Visitor::where('ip_address', $ip)
                ->where('visited_at', $today)
                ->exists();
            if (!$exists) {
                Visitor::create([
                    'ip_address' => $ip,
                    'user_agent' => $request->userAgent(),
                    'visited_at' => $today,
                ]);
            }
        }
        return $next($request);
    }
}
