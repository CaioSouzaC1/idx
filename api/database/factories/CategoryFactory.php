<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $image = base_path('public/funnydog.jpeg');
        $image = new UploadedFile($image, 'corinthians.jpg', 'image/jpeg', null, true);
        $image = $image->storeAs('categories', "funnydog.jpeg");

        return [
            'name' => fake()->name(),
            'description' => fake()->sentence(),
            'thumb_path' => $image
        ];
    }
}
