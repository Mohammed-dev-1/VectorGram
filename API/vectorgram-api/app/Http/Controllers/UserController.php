<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AuthRequest;
use App\Models\User;

class UserController extends Controller {

    public function register(AuthRequest $req) {

        $input = $req->validated();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $token = $user
            ->createToken('vectorgram-secret')
            ->plainTextToken;

        $res = [
            'id' => $user->id,
            'username' => $user->username,
            'fullname' => $user->name,
            'email' => $user->email,
            'token' => $token
        ];

        return response()->json($res,201);
    }

    public function login(Request $req) {

        $input = $req->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|max:15',
        ]);

        $user = User::where('email', $input['email'])->first();

        if($user) {
            if(Hash::check($input['password'], $user->password)) {
                $token = $user
                    ->createToken('vectorgram-secret')
                    ->plainTextToken;

                $res = [
                    'id' => $user->id,
                    'username' => $user->username,
                    'fullname' => $user->name,
                    'email' => $user->email,
                    'token' => $token
                ];

                return response()->json($res,201);
            }
        }

        return response()->json([
            'message' => 'User not found!'
        ], 401);
    }

    public function logout() {

        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'User was logout!'
        ], 201);
    }
}
