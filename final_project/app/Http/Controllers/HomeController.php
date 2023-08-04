<?php

namespace App\Http\Controllers;


use App\Models\Application;
use App\Services\CheckAuthService;
use App\Services\CreateApplicationService;
use \Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home(): View
    {
        return view('home');
    }

    public function checkAdmin(CheckAuthService $checkAuthService)
    {
        return $checkAuthService->checkAuth();
    }

    public function createApplication(Request $request)
    {
        return (new CreateApplicationService)->createApplication($request);
    }
}
