<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

/**
 * Routes for posts
 * 1- get all posts
 * 2- get post content
 * 3- create psots
 * 4- update posts
 * 5- delete posts
 */


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/all', [PostController::class, 'index']);
    Route::get('/{id}', [PostController::class, 'show']);
    Route::get('/user/{user_id}', [PostController::class, 'userPosts']);

    // create new post title without image
    Route::post('/create', [PostController::class, 'store']);
    // create image to the same post
    Route::post('/create/post-image', [PostController::class, 'storeImage']);

    Route::post('/update/{id}', [PostController::class, 'update']);
    Route::delete('/delete/{id}', [PostController::class, 'delete']);
});
