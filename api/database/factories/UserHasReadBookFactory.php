<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\$\{UserHasReadBook}>
 */
class UserHasReadBookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        $user = User::where(column: ['email' => 'a@a.com'])->first() ?? User::factory()->create()->first();

        $book = Book::factory()->create()->first();

        return [
            "book_id" => $book->id,
            "user_id" => $user->id,
            "page" => 1
        ];
    }
}
