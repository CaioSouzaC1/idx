<?php

namespace Tests\Initiators;

use App\Models\Category;
use Illuminate\Http\UploadedFile;

class CategoryInitiator
{

    public static function create(): Category
    {
        $image = base_path('public/funnydog.jpeg');
        $image = new UploadedFile($image, 'corinthians.jpg', 'image/jpeg', null, true);
        $image = $image->storeAs('categories', "funnydog.jpeg");

        return Category::factory()->create([
            'thumb_path' => $image
        ]);
    }
}
