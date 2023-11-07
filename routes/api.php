<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectUserController;
use App\Http\Controllers\WorkSpaceController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::put('/project-users/store', [ProjectUserController::class, 'store'])->name('project-users.store');
Route::delete('/project-users/delete/{id}', [ProjectUserController::class, 'destroy'])->name('project-users.delete');

Route::put('/workspace/update/{id}', [WorkSpaceController::class, 'update'])->name('workspace.update');