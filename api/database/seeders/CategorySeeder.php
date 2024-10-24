<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $image = base_path('public/funnydog.jpeg');
        $image = new UploadedFile($image, 'corinthians.jpg', 'image/jpeg', null, true);
        $image = $image->storeAs('categories', "funnydog.jpeg");

        Category::factory()->count(3)->create([
            'thumb_path' => $image
        ]);
    }
}
