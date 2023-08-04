<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\NumbersController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\HomeController;
use \App\Http\Controllers\AboutController;
use \App\Http\Controllers\Admin\ApplicationController;
use \App\Http\Controllers\Admin\ManagerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Home стартовая страница
Route::get('/', [HomeController::class, 'home'])->name('home');
Route::post('/check_admin', [HomeController::class, 'checkAdmin'])->name('check_admin');
Route::post('/create_application', [HomeController::class, 'createApplication'])->name('create_application');

// Тестовая страница About
Route::get('/about', [AboutController::class, 'about'])->name('about');

// Базовые параметры для получения категорий номеров городские || 8-800(8-804)
// params : getDidNumberSetList || getFreeNumberSetList
Route::post('/numbers/{params}',[NumbersController::class, 'getData']);

Route::get('/login', [LoginController::class, 'loginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LoginController::class, 'logOut'])->name('logout');

Route::get('admin', [ApplicationController::class, 'redirect']);
Route::resource('admin/applications', ApplicationController::class, [
'names' => [
    'index' => 'private',
    // etc...
]])->middleware('auth');

Route::resource('admin/managers', ManagerController::class);
Route::get('admin/managers', [ManagerController::class, 'index'])->name('managers_index');
Route::post('admin/managers/{id}', [ManagerController::class, 'update'])->name('managers_update');
