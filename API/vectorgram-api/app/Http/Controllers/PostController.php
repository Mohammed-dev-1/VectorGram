<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PostRequest;
use App\Models\{Post, User};

class PostController extends Controller {

    public function index() {

        $posts = Post::orderBy('created_at', 'desc')->get();
        $res = [];

        if(!$posts->first()) {
            return response()->json([
                'message' => 'You don\'t have post.'
            ], 404);
        }

        $user = auth()->user();
        foreach ($posts as $post) {
            $post_owner = $post->user;
            if(
                $post_owner->id == $user->id ||
                $user->following->contains($post_owner->id)
            ) {
                $res[] = (object) [
                    'id' => $post->id,
                    'author_id' => $post_owner->id,
                    'author' => $post_owner->username,
                    'title' => $post->title,
                    'body' => $post->body,
                    'post_image' => $post->post_image,
                    'category' => $post->category->name,
                    'comments' => $post->comments->count(),
                    'created_at' => $post->created_at->diffForHumans()
                ];
            }
        }

        if(!$res) {
            return response()->json([
                'message' => 'You don\'t have post.'
            ], 404);
        }

        return response()->json([
            'posts' => $res
        ], 200);
    }

    public function show($id) {

        $post = Post::where('id', $id)->first();

        if($post) {
            return response()->json([
                'id' => $post->id,
                'author' => $post->user->username,
                'title' => $post->title,
                'body' => $post->body,
                'post_image' => $post->post_image,
                'category' => $post->category->name,
                'created_at' => $post->created_at->diffForHumans()
            ], 200);
        }

        return response()->json([
            'message' => 'Post content was not found!'
        ], 404);
    }

    public function userPosts($user_id) {

        $user = User::where('id', $user_id)->first();

        if(!$user)
            return response()->json([
                'message' => 'User was not found!'
            ], 404);

        $posts = $user->posts()->get();

        if(!$posts->first()) {
            return response()->json([
                'message' => 'You don\'t have any post'
            ], 404);
        }

        $res = [];
        foreach ($posts as $post) {
            $res[] = (object) [
                'id' => $post->id,
                'author' => $user->username,
                'title' => $post->title,
                'body' => $post->body,
                'post_image' => $post->post_image,
                'category' => $post->category->name,
                'comments' => $post->comments->count(),
                'created_at' => $post->created_at->diffForHumans()
            ];
        }

        return response()->json([
            'posts' => $res
        ], 200);
    }

    public function store(PostRequest $req) {

        #check if request is validated.
        $input = $req->validated();
        #get image from the request.
        $file = $input['post_image'];
        #set the path you want to store an image inside it.
        $path = public_path().'/storage/images/';
        #set image inside the path have been created.
        $file->move($path, $file->getClientOriginalName());
        #get name of image to store it on data table.
        $input['post_image'] = $file->getClientOriginalName();

        $post = auth()->user()->posts()->create($input);

        if($post->first()) {
            return response()->json([
                'message' => 'Post was created successfuly!'
            ],201);
        }

        return response()->json([
            'message' => 'You can\'t create post ):'
        ],500);
    }

    public function update(PostRequest $req, $id) {

        $input = $req->validated();
        $post = Post::where('id',$id)->first();

        if(!$post) {
            return response()->json([
                'message' => 'Post was not found!'
            ], 404);
        }

        $post->fill($input);
        $post['post_image'] = Storage::putFileAs(
            'PostImages', $input['post_image'], auth()->user()->username
        );
        $post->save();

        return response()->json([
            'message' => 'Post was updated successfuly!'
        ], 200);
    }

    public function delete(Request $req, $id) {

        $post = Post::where('id',$id)->first();

        if(!$post) {
            return response()->json([
                'message' => 'Post was not found!'
            ], 404);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post was deleted successfuly!'
        ], 201);
    }
}
