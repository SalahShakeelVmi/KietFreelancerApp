<?php

use App\Http\Controllers\ProfileController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectUserController;
use App\Http\Controllers\WorkSpaceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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


Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

Route::delete('/project-users/delete/{id}', [ProjectUserController::class, 'freelancerDestroy'])->name('project-users.freelancer.delete');

Route::resource('dashboard/workspace', WorkSpaceController::class);
});

Route::post('/projects/store', [ProjectController::class, 'store'])->name('projects.store');

Route::middleware(['admin_auth'])->group(function () {

    // Resource Route of users
    Route::resource('users', UserController::class);

    // Direct Route of users
    Route::put('/users/update-status/{user}', [UserController::class, 'updateStatus'])->name('users.update-status');
    Route::get('/users/role-filter/{role}',[UserController::class,"roleFilter"])->name('users.role-filter');

    // Resource Route of projects categories
    Route::resource('project-categories', ProjectCategoryController::class);

    // Direct Route of projects categories
    Route::post('/project-categories/update/{projectCategory}', [ProjectCategoryController::class, 'update'])->name('project-categories.update');
  
    // Direct Route of projects
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::put('/projects/update-status/{project}', [ProjectController::class, 'updateStatus'])->name('projects.update-status');
    Route::get('/projects/search', [ProjectController::class, 'search'])->name('projects.search');
    Route::delete('/projects/destroy/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    Route::get('/project-users', [ProjectUserController::class, 'index'])->name('project-users.index');
    Route::get('/project-users/users/projects/{user}', [ProjectUserController::class, 'create'])->name('project-users.create');
   
    // Direct Route of payments
    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
    Route::post('/payments-store', [PaymentController::class, 'store'])->name('payments.store');
    Route::delete('/payments/destroy/{payment}', [PaymentController::class, 'destroy'])->name('payments.destroy');
});

Route::middleware(['customer_auth'])->group(function () {
    Route::get('order',[CustomerController::class,'create'])->name('order.index');
    Route::get('payments/{payment}',[PaymentController::class,'show'])->name('payments.show');
    Route::get('order/payments/{payment}/edit', [PaymentController::class, 'edit'])->name('payments.edit');
    Route::post('order/payments/update/{payment}',[PaymentController::class, 'update'])->name('payment.update');

    Route::resource('notifications', NotificationController::class);
});

// Route::get("default/admin",function(){
//     $default_admin = User::create([
//         'name' => 'Admin',
//         'email' => 'admin@kietfreelancerapp.com',
//         'password' => Hash::make('admin@kietfreelancerapp.com'),
//     ]); 
//     if($default_admin){
//        return "default admin created";
//     }
//     else{
//         return "already default admin created";
//     }
// });

require __DIR__.'/auth.php';
