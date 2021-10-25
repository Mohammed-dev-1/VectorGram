<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;

/**
 * Routes for comments
 * 1- get all comments
 * 2- create comment
 * 3- update comment
 * 4- delete comment
 */


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/{post_id}', [CommentController::class, 'index']);
    Route::post('/create', [CommentController::class, 'store']);
    Route::post('/update', [CommentController::class, 'update']);
    Route::delete('/delete/{id}', [CommentController::class, 'delete']);
});
