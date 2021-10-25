<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentReplyController;

/**
 * Routes for replies
 * 1- get all replies
 * 2- create reply
 * 3- update reply
 * 4- delete reply
 */


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/{id}', [CommentReplyController::class, 'index']);
    Route::post('/create', [CommentReplyController::class, 'store']);
    Route::post('/update', [CommentReplyController::class, 'update']);
    Route::delete('/delete/{id}', [CommentReplyController::class, 'delete']);
});
