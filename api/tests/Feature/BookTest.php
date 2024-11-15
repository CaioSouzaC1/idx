<?php

use Illuminate\Http\UploadedFile;
use Tests\Initiators\AdminInitiator;
use Tests\Initiators\BookInitiator;
use Tests\Initiators\CategoryInitiator;
use function Pest\Faker\fake;

it('Should create a book', function () {

    $token = AdminInitiator::login()['token'];

    $category = CategoryInitiator::create();

    $body = [
        'title' => fake()->name(),
        'synopsis' => fake()->sentence(),
        'category_id' => $category->id,
        'pdf' => UploadedFile::fake()->create(name: 'book.pdf', mimeType: 'application/pdf'),
        'thumb' => UploadedFile::fake()->image('p.jpg'),
        'redirect_url' => fake()->url(),
    ];

    $response = $this->post(
        '/api/book',
        $body,
        [
            'Bearer ' . $token,
            'Content-Type' => 'multipart/form-data',
        ]
    );

    dd($response->json());

    $response->assertStatus(200);
})->only();


it('Should delete a book', function () {

    $token = AdminInitiator::login()['token'];

    $book = BookInitiator::create(category: CategoryInitiator::create());

    $response = $this->delete(
        '/api/book/' . $book->id,
        [
            'Bearer ' . $token,
        ]
    );

    $response->assertStatus(200);
});

it('Should show a book', function () {

    $token = AdminInitiator::login()['token'];

    $book = BookInitiator::create(CategoryInitiator::create());

    $response = $this->get(
        '/api/book/' . $book->id,
        [
            'Bearer ' . $token,
        ]
    );

    $response->assertStatus(200);
});

it('Should index book', function () {

    $token = AdminInitiator::login()['token'];

    BookInitiator::create(CategoryInitiator::create());

    $response = $this->get(
        '/api/book/',
        [
            'Bearer ' . $token,
        ]
    );

    $response->assertStatus(200);
});

it('Should update a book', function () {

    $token = AdminInitiator::login()['token'];

    $book = BookInitiator::create(CategoryInitiator::create());
    $category = CategoryInitiator::create();

    $body = [
        'title' => fake()->name(),
        'synopsis' => fake()->sentence(),
        'category_id' => $category->id,
        'pdf' => UploadedFile::fake()->create(name: 'book.pdf', mimeType: 'application/pdf'),
        'thumb' => UploadedFile::fake()->image('p.jpg'),
        'redirect_url' => fake()->url(),
    ];

    $response = $this->put(
        '/api/book/' . $book->id,
        $body,
        [
            'Bearer ' . $token,
            'Content-Type' => 'multipart/form-data',
        ]
    );

    $response->assertStatus(200);
});
