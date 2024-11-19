<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class BroadcastRateLimiting
{
    public function handle($request, Closure $next): Response
    {
        $key = sprintf(
            'broadcasting:%s',
            $request->user() ? $request->user()->id : $request->ip()
        );

        if (RateLimiter::tooManyAttempts($key, 60)) {  // 60 attempts per minute
            return response()->json([
                'message' => 'Too many broadcast attempts.'
            ], 429);
        }

        RateLimiter::hit($key);

        return $next($request);
    }
}