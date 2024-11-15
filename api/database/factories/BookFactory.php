<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

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

        $image = base_path('public/funnydog.jpeg');
        $image = new UploadedFile($image, 'corinthians.jpg', 'image/jpeg', null, true);
        $image = $image->storeAs('/books/thumbs', "funnydog.jpeg");

        $pdf = base_path('public/war-art.pdf');
        $pdf = new UploadedFile($pdf, 'corinthians.pdf', 'application/pdf', null, true);
        $pdf = $pdf->storeAs('/books', "war-art.pdf");

        $category = Category::factory()->create()->first();

        return [
            'title' => fake()->name(),
            'synopsis' => fake()->sentence(),
            'redirect_url' => fake()->url(),
            'category_id' => $category->id,
            'pdf_path' => $pdf,
            'thumb_path' => $image,
            'page_count' => 10
        ];
    }
}
