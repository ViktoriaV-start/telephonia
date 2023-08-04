<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::check()) {
            return redirect(route('private'));
        }

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (User::where('email', $credentials['email'])->exists()) {

            if (Auth::attempt($credentials)) {


                if (Auth::user()->status == '0') {
                    Auth::logout();
                    return redirect()->to(route('login'))->withErrors([
                        'email' => 'Пользователь не активирован'
                    ]);
                }

                return redirect()->intended(route('private'));
            }

            return redirect()->to(route('login'))->withErrors([
                'password' => 'Введите правильный пароль и повторите попытку'
            ]);
        }
        return redirect()->to(route('login'))->withErrors([
            'email' => 'Пользователь с такой почтой не найден'
        ]);
    }

    public function loginForm()
    {
        if (Auth::check()) {
            return redirect(route('private'));
        }
        return view('login');
    }

    public function logOut()
    {
        Auth::logout();
        return redirect(route('login'));
    }
}
