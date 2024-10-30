<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use function Pest\Faker\fake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'synopsis' => fake()->sentence(),
            'redirect_url' => fake()->url(),
        ];
    }
}
