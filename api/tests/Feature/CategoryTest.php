<?php

use Illuminate\Http\UploadedFile;
use Tests\Initiators\AdminInitiator;
use Tests\Initiators\CategoryInitiator;

use function Pest\Faker\fake;

it("Should create a category", function () {

    $loggedAdmin = AdminInitiator::login();

    $response = $this->post(
        '/api/category',
        [
            'name' => fake()->name(),
            'description' => fake()->sentence(),
            'thumb' => UploadedFile::fake()->image('p.jpg'),
        ],
        [
            'Bearer ' . $loggedAdmin['token'],
            'Content-Type' => 'multipart/form-data',
        ]
    );

    $response->assertStatus(200);
});


it("Should delete a category", function () {

    $loggedAdmin = AdminInitiator::login();

    $category = CategoryInitiator::create();

    $response = $this->delete(
        "/api/category/{$category->id}",
        [
            'Bearer ' . $loggedAdmin['token'],
        ]
    );

    $response->assertStatus(200);
});


it("Should show a category", function () {

    $loggedAdmin = AdminInitiator::login();

    $category = CategoryInitiator::create();

    $response = $this->get(
        "/api/category/{$category->id}",
        [
            'Bearer ' . $loggedAdmin['token'],
        ]
    );

    $response->assertStatus(200);
});

it("Should index category", function () {

    $loggedAdmin = AdminInitiator::login();

    CategoryInitiator::create();

    $response = $this->get(
        "/api/category/",
        [
            'Bearer ' . $loggedAdmin['token'],
        ]
    );

    $response->assertStatus(200);
});

it("Should update a category", function () {

    $loggedAdmin = AdminInitiator::login();

    $category = CategoryInitiator::create();

    $response = $this->put(
        "/api/category/{$category->id}",
        [
            'name' => fake()->name(),
            'description' => fake()->sentence(),
            'thumb' => UploadedFile::fake()->image('corinthians.jpg'),
        ],
        [
            'Bearer ' . $loggedAdmin['token'],
            'Content-Type' => 'multipart/form-data',
        ]
    );

    $response->assertStatus(200);
});
