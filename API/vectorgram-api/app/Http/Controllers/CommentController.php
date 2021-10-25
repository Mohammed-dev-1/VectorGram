<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\{Post, Comment};

class CommentController extends Controller {

    public function index($post_id) {

        $post = Post::where('id', $post_id)->first();

        #check if the post is existe
        if(!$post) {
            return response()->json([
                'message' => 'Post was not found!'
            ], 404);
        }

        #get all comments of post
        $comments = $post->comments()->get();

        #check if this post have comments
        if(!$comments->first()) {
            return response()->json([
                'message' => 'No comments in this post'
            ], 404);
        }

        #to customize all comments data
        $resComments = [];

        #to customize all replies data
        $resReplies = [];

        foreach ($comments as $comment) {
            #get all replies of indvidal comment
            $replies = $comment->commentReplies()->get();

            if($replies->count()>0) {
                foreach ($replies as $reply) {
                    $author = $reply->user;
                    $resReplies[] = (object) [
                        'id' => $reply->id,
                        'author_id' => $author->id,
                        'author' => $author->username,
                        'comment' => $reply->comment,
                        'created_at' => $reply->created_at->diffForHumans()
                    ];
                }
            } else {
                $resReplies = [];
            }

            $resComments[] = (object) [
                'id' => $comment->id,
                'author_id' => $comment->user->id,
                'author' => $comment->user->username,
                'comment' => $comment->comment,
                'replies' => $resReplies,
                'created_at' => $comment->created_at->diffForHumans()
            ];
        }

        return response()->json([
            'comments' => $resComments
        ], 200);

    }

    public function store(CommentRequest $req) {

        $input = $req->validated();
        $post = Post::where('id', $req->post_id)->first();

        if(!$post) {
            return response()->json([
                'message' => 'Post was not found!'
            ], 404);
        }

        $comment = $post->comments()->create([
            'user_id' => auth()->user()->id,
            'comment' => $input['comment']
        ]);

        if(!$comment) {
            return response()->json([
                'message' => 'You can\'t create a comment!'
            ], 401);
        }

        return response()->json([
            'message' => 'Comment was created successfuly!'
        ], 200);
    }

    public function update(CommentRequest $req) {

        $input = $req->validated();
        $comment = Comment::where('id', $req->comment_id)->first();

        if(!$comment) {
            return response()->json([
                'message' => 'Comment was not found!'
            ], 404);
        }

        $comment->comment = $input['comment'];
        $comment->save();

        return response()->json([
            'message' => 'Comment was updated successfuly (:'
        ], 200);
    }

    public function delete($id) {

        $comment = Comment::where('id', $id)->first();

        if(!$comment) {
            return response()->json([
                'message' => 'Comment was not found!'
            ], 404);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Comment was deleted successfuly (:'
        ], 200);
    }
}
