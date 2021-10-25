<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\{Comment ,CommentReply};

class CommentReplyController extends Controller
{
    public function index($id) {

        $comment = Comment::where('id', $id)->first();
        if(!$comment) {
            return response()->json([
                'message' => 'Comment not found!'
            ], 404);
        }

        $replies = $comment->commentReplies()->get();
        if(!$replies->first()) {
            return response()->json([
                'message' => 'No replies in this comment.'
            ], 404);
        }

        $res = [];
        foreach ($replies as $reply) {
            $res[] = (object) [
                'id' => $reply->id,
                'author_id' => $reply->user->id,
                'author' => $reply->user->username,
                'comment' => $reply->comment,
                'created_at' => $reply->created_at->diffForHumans()
            ];
        }

        return response()->json([
            'replies' => $res
        ], 200);
    }

    public function store(CommentRequest $req) {

        $input = $req->validated();
        $comment = Comment::where('id', $req->comment_id)->first();

        if(!$comment) {
            return response()->json([
                'message' => 'Comment not found!'
            ], 404);
        }

        $reply = $comment->commentReplies()->create([
            'user_id' => auth()->user()->id,
            'comment' => $input['comment']
        ]);

        if(!$reply) {
            return response()->json([
                'message' => 'You can\'t create a comment reply!'
            ], 401);
        }

        return response()->json([
            'message' => 'Comment reply was created successfuly!'
        ], 200);
    }

    public function delete($id) {

        $reply = CommentReply::where('id', $id)->first();

        if(!$reply) {
            return response()->json([
                'message' => 'Comment reply was not found!'
            ], 404);
        }

        $reply->delete();

        return response()->json([
            'message' => 'Comment reply was deleted successfuly.'
        ], 200);
    }
}
