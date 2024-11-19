<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function payment()
    {
        return Inertia::render('Support/Payment');
    }

    public function safety()
    {
        return Inertia::render('Support/Safety');
    }

    public function report()
    {
        return Inertia::render('Support/Report', [
            'categories' => [
                'Technical Issue',
                'Payment Problem',
                'User Behavior',
                'Content Issue',
                'Other'
            ]
        ]);
    }
}