<?php

namespace Tests\Initiators;

use App\Models\User;

use App\Services\AuthService;
use function Pest\Faker\fake;

class AdminInitiator
{
    public static function login()
    {

        $adminData = [
            "name" => fake()->name(),
            "email" => fake()->email(),
            "password" => 'corinthians',
            "type" => 'admin'
        ];

        $admin = User::create($adminData);

        $authService = new AuthService();
        return $authService->login(['email' => $admin->email, 'password' => $adminData['password']]);
    }
}
