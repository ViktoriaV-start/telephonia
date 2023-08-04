<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Illuminate\Contracts\View\View;

class AboutController extends Controller
{
    public function about(): View
    {
        return view('about');
    }
}
