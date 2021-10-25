<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function boot() {

        parent::boot();

        static::created(function($user) {
            $user->profile()->create([
                'title' => $user->username
            ]);
        });
    }

    // public function getAvatarAttribute($value) {

    //     return $value ?: asset('/images/avatar.png');
    // }


    public function profile() {

        return $this->hasOne(Profile::class);
    }

    public function following() {

        return $this->belongsToMany(Profile::class);
    }

    public function posts() {

        return $this->hasMany(Post::class);
    }

    public function comments() {

        return $this->hasMany(Comment::class);
    }

    public function replies() {

        return $this->hasMany(CommentReply::class);
    }

    public function userHasRole($role_name) {

        foreach ($this->roles as $role) {
            if($role_name == $role->slug)
                return true;
        }

        return false;
    }
}
