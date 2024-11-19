<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('Pages/About');
    }

    public function help()
    {
        return Inertia::render('Pages/Help');
    }

    public function terms()
    {
        return Inertia::render('Pages/Terms');
    }

    public function privacy()
    {
        return Inertia::render('Pages/Privacy');
    }

    public function faq()
    {
        return Inertia::render('Pages/FAQ');
    }

    public function contact()
    {
        return Inertia::render('Pages/Contact');
    }
}