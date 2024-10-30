<?php

namespace Tests\Initiators;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\UploadedFile;

class BookInitiator
{

    public static function create(Category $category): Book
    {
        $image = base_path('public/funnydog.jpeg');
        $image = new UploadedFile($image, 'corinthians.jpg', 'image/jpeg', null, true);
        $image = $image->storeAs('/books/thumbs', "funnydog.jpeg");

        $pdf = base_path('public/war-art.pdf');
        $pdf = new UploadedFile($pdf, 'corinthians.pdf', 'application/pdf', null, true);
        $pdf = $pdf->storeAs('/books', "war-art.pdf");

        return Book::factory()->create([
            'category_id' => $category->id,
            'pdf_path' => $pdf,
            'thumb_path' => $image
        ]);
    }
}
