<?php

use App\Services\AuthService;
use function Pest\Faker\fake;

it('Should register an user', function () {
    $response = $this->postJson('/api/auth/register', [
        'name' => fake()->name,
        'email' => fake()->safeEmail,
        'password' => 'corinthians',
    ]);

    $response->assertStatus(200);
});


it('Should login an user', function () {
    $service = new AuthService();

    $userData = [
        'name' => fake()->name,
        'email' => fake()->safeEmail,
        'password' => 'corinthians',
    ];

    $service->register($userData);

    $response = $this->postJson('/api/auth/login', [
        'email' => $userData['email'],
        'password' => 'corinthians',
    ]);

    $response->assertStatus(200);
});


it('Should access me route', function () {
    $service = new AuthService();

    $userData = [
        'name' => fake()->name,
        'email' => fake()->safeEmail,
        'password' => 'corinthians',
    ];

    $service->register($userData);

    $loginResponse = $this->postJson('/api/auth/login', [...$userData]);

    $response = $this->getJson('/api/auth/me', headers: ['Authorization' => 'Bearer ' . $loginResponse['data']['token']]);

    $response->assertStatus(200);
});
