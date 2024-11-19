<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateFileSize
{
    protected $maxSize = 10240; // 10MB in kilobytes

    public function handle(Request $request, Closure $next)
    {
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                if ($file->getSize() > ($this->maxSize * 1024)) {
                    return redirect()
                        ->back()
                        ->withInput()
                        ->withErrors(['attachments' => 'File size cannot exceed 10MB.']);
                }
            }
        }

        return $next($request);
    }
}