<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/{id}', [ProfileController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/follow/{id}', [ProfileController::class, 'follow']);
    Route::post('/change/image', [ProfileController::class, 'changeProfileImage']);
    Route::post('/update', [ProfileController::class, 'update']);
    Route::post('/search', [ProfileController::class, 'search']);
});
