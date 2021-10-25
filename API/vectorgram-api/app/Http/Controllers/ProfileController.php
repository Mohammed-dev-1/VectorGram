<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\{ImageRequestValidation, UpdateProfileRequest};
use App\Models\{User, Profile};

class ProfileController extends Controller {

    public function index($id) {

        $profile = Profile::where('id', $id)->first();
        if(!$profile)
            return response()->json([
                'message' => 'Profile was not found!'
            ], 404);

        $followers = [];
        $following = [];
        $followingContent = $profile
            ->user
            ->following()
            ->get();

        $followersContent = $profile
            ->followers()
            ->get();

        if($followingContent->count()>0) {
            foreach ($followingContent as $fUser) {
                $following[] = (object) [
                    'following_userId' => $fUser->user_id
                ];
            }
        }

        if($followersContent->count()>0) {
            foreach ($followersContent as $fUser) {
                $followers[] = (object) [
                    'follower_userId' => $fUser->id
                ];
            }
        }

        return response()->json([
            'id' => $profile->id,
            'user_id' => $profile->user_id,
            'profile_name' => $profile->title,
            'description' => $profile->description,
            'url' => $profile->url,
            'avatar' => $profile->avatar,
            'posts' => $profile->user->posts()->count(),
            'followers' => [
                'count' => $followersContent->count(),
                'users' => $followers
            ],
            'following' => [
                'count' => $followingContent->count(),
                'users' => $following
            ],
        ], 200);
    }

    public function follow($id) {

        $user = User::where('id', $id)->first();

        if(!$user) {
            return response()->json([
                'message' => 'User was not found!'
            ], 404);
        }

        $res = auth()->user()->following()->toggle($user->profile);

        if($res['attached']) {
            return response()->json([
                'message' => 'Now you are following to '.$user->username,
                'status' => true
            ], 200);
        }

        return response()->json([
            'message' => 'Now you are unfollowing to '.$user->username,
            'status' => false
        ], 200);
    }

    /**
    * Change profile pick
    */
    public function changeProfileImage(ImageRequestValidation $req) {
        #check if request has image and max size 2m.
        $input = $req->validated();
        #get image from the request.
        $file = $input['profile_image'];
        #set the path you want to store an image inside it.
        $path = public_path().'/storage/images/';
        #set image inside the path have been created.
        $file->move($path, $file->getClientOriginalName());
        #get name of image to store it on data table.
        $input['profile_image'] = $file->getClientOriginalName();

        $user = auth()
                ->user()
                ->profile;

        $user->avatar = $input['profile_image'];

        $user->save();

        return response()->json([
            'message' => 'Profile image has been changed.',
            'avatar' => asset('/storage/images/'.$input['profile_image'])
        ], 200);
    }

    public function update(UpdateProfileRequest $req) {

        if(!($req->username||$req->description||$req->url)) {
            return response()->json([
                'message' => 'Please complete form.'
            ], 401);
        }

        $user = auth()->user()->profile;

        if($req->username) {
            $user->title = $req->username;
            if($req->description) {
                $user->description = $req->description;
            }
            if($req->url) {
                $user->url = $req->url;
            }
        }

        else if($req->description) {
            $user->description = $req->description;
            if($req->username) {
                $user->title = $req->username;
            }
            if($req->url) {
                $user->url = $req->url;
            }
        }

        else if($req->url) {
            $user->url = $req->url;
            if($req->description) {
                $user->description = $req->description;
            }
            if($req->username) {
                $user->title = $req->username;
            }
        }

        $user->save();

        return response()->json([
            'message' => 'Profile has been updated.'
        ], 200);
    }

    public function search(Request $req) {

        $input = $req->validate([
            'user' => 'required|string|alpha_num'
        ]);

        $profiles = Profile::where(
            'title',
            'LIKE',
            '%'.$input['user'].'%'
        )->get();

        if(!$profiles->first()) {
            return response()->json([
                'message' => 'There is no one with this name.'
            ], 404);
        }

        $res = [];
        foreach ($profiles as $profile) {
            $res[] = (object) [
                'id' => $profile->id,
                'name' => $profile->title,
                'description' => $profile->description,
                'website' => $profile->url,
                'avatar' => $profile->avatar
            ];
        }

        return response()->json([
            'profiles' => $res
        ], 200);
    }
}
