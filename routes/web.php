<?php

use App\Http\Controllers\ProfileController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProjectController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',[CustomerController::class,'index'])->name('home');

Route::get('/dashboard',[DashboardController::class,'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/projects/store', [ProjectController::class, 'store'])->name('projects.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::put('/users/update-status/{id}', [UserController::class, 'updateStatus'])->name('users.update-status');
    Route::get('/users/create',[UserController::class,"create"])->name('users.create');
    Route::post('/users/store',[UserController::class,"store"])->name('users.store');
    Route::delete('/users/destroy/{users}',[UserController::class,"destroy"])->name('users.destroy');
    Route::put('/users/update/{id}',[UserController::class,"update"])->name('users.update');
    Route::get('/users/search',[UserController::class,"search"])->name('users.search');

    Route::get('/project-categories', [ProjectCategoryController::class, 'index'])->name('project-categories.index');
    Route::post('/project-categories/store', [ProjectCategoryController::class, 'store'])->name('project-categories.store');
    Route::delete('/project-categories/destroy/{projectCategory}', [ProjectCategoryController::class, 'destroy'])->name('project-categories.destroy');
    Route::post('/project-categories/update/{id}', [ProjectCategoryController::class, 'update'])->name('project-categories.update');
    Route::get('/project-categories/search', [ProjectCategoryController::class, 'search'])->name('project-categories.search');
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::put('/projects/update-status/{id}', [ProjectController::class, 'updateStatus'])->name('projects.update-status');
    Route::get('/projects/search', [ProjectController::class, 'search'])->name('projects.search');


});

require __DIR__.'/auth.php';
