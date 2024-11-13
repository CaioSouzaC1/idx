<?php

use Tests\Initiators\AdminInitiator;
use Tests\Initiators\BookInitiator;
use Tests\Initiators\CategoryInitiator;
use Tests\Initiators\UserHasReadBookInitiator;

use function Pest\Faker\fake;

it('Should create a userHasReadBook', function () {

    $loggedAdmin = AdminInitiator::login();

    $book = BookInitiator::create(category: CategoryInitiator::create());

    $response = $this->post(
        '/api/read',
        [
            'book_id' => $book->id
        ],
        [
            'Bearer ' . $loggedAdmin['token'],
        ]
    );

    $response->assertStatus(200);
});


// it('Should delete a userHasReadBook', function () {

//     $token = 'tokenJWT';

//     $userHasReadBook = UserHasReadBook::factory()->create();

//     $response = $this->delete(
//         '/api/read/' . $userHasReadBook->id,
//         [
//             'Bearer ' . $token,
//         ]
//     );

//     $response->assertStatus(200);
// });

it('Should show a userHasReadBook', function () {

    $loggedAdmin = AdminInitiator::login();

    $userHasReadBook = UserHasReadBookInitiator::create();

    $response = $this->put(
        '/api/read/',
        [
            'book_id' => $userHasReadBook->book_id,
            'page' => fake()->randomNumber()
        ],
        [
            'Bearer ' . $loggedAdmin['token'],
        ]
    );

    dd($response->json());

    $response->assertStatus(200);
});

it('Should index userHasReadBook', function () {

    $loggedAdmin = AdminInitiator::login();

    $response = $this->get(
        '/api/read/',
        [
            'Bearer ' . $loggedAdmin['token'],
        ]
    );

    $response->assertStatus(200);
})->only();

// it('Should update a userHasReadBook', function () {

//     $token = 'tokenJWT';

//     $userHasReadBook = UserHasReadBook::factory()->create();

//     $body = [];

//     $response = $this->put(
//         '/api/read/' . $userHasReadBook->id,
//         $body,
//         [
//             'Bearer ' . $token,
//         ]
//     );

//     $response->assertStatus(200);
// });
