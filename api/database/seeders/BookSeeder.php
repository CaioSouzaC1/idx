<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $image = base_path('public/funnydog.jpeg');
        $image = new UploadedFile($image, 'corinthians.jpg', 'image/jpeg', null, true);
        $image = $image->storeAs('/books/thumbs', "funnydog.jpeg");

        $pdf = base_path('public/war-art.pdf');
        $pdf = new UploadedFile($pdf, 'corinthians.pdf', 'application/pdf', null, true);
        $pdf = $pdf->storeAs('/books', "war-art.pdf");

        $category = Category::factory()->create([
            'thumb_path' => $image
        ]);

        Book::factory()->count(3)->create([
            'category_id' => $category->id,
            'pdf_path' => $pdf,
            'thumb_path' => $image
        ]);
    }
}
