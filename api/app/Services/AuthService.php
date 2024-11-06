<?php

namespace App\Services;

use App\Exceptions\ApiException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function register($data)
    {
        User::create(
            [
                "name" => $data["name"],
                "email" => $data["email"],
                "password"  => Hash::make($data["password"])
            ]
        );

        return $this->login($data);
    }

    public function login($data)
    {
        if (Auth::attempt(["email" => $data["email"], "password" => $data["password"]])) {
            $token = JWTAuth::fromUser(Auth::user());
            return ["user" => Auth::user(), "token" => $token];
        }
        throw new ApiException("Usuário não encontrado");
    }

    public function me()
    {
        if (!JWTAuth::user()) throw new ApiException("Usuário não encontrado");
        return JWTAuth::user();
    }
}
