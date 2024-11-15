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

        $scifiImage = base_path('public/categories/sci-fi.jpg');
        $scifiImage = new UploadedFile($scifiImage, 'corinthians.jpg', 'image/jpg', null, true);
        $scifiImage = $scifiImage->storeAs('categories', "sci-fi.jpg");

        $fantasyImage = base_path('public/categories/fantasy.jpg');
        $fantasyImage = new UploadedFile($fantasyImage, 'corinthians.jpg', 'image/jpg', null, true);
        $fantasyImage = $fantasyImage->storeAs('categories', "fantasy.jpg");

        $romanceImage = base_path('public/categories/romance.jpg');
        $romanceImage = new UploadedFile($romanceImage, 'corinthians.jpg', 'image/jpg', null, true);
        $romanceImage = $romanceImage->storeAs('categories', "romance.jpg");

        $suspenseImage = base_path('public/categories/suspense.jpg');
        $suspenseImage = new UploadedFile($suspenseImage, 'corinthians.jpg', 'image/jpg', null, true);
        $suspenseImage = $suspenseImage->storeAs('categories', "suspense.jpg");

        $baseCategories = [
            [
                'name' => "Ficção Científica",
                'description' => "Histórias que exploram os limites da ciência e da tecnologia, muitas vezes projetadas em futuros distantes ou universos alternativos. Em cenários que vão de viagens espaciais a avanços tecnológicos, a ficção científica desafia nossa compreensão do que é possível, provocando reflexões sobre a humanidade e o futuro.",
                'thumb_path' => $scifiImage
            ],
            [
                'name' => "Fantasia",
                'description' => "Narrativas mágicas que mergulham o leitor em mundos cheios de seres místicos, reinos encantados e poderes sobrenaturais. Desde épicas batalhas entre o bem e o mal até jornadas pessoais de heróis improváveis, a fantasia transporta o leitor para além da realidade, onde tudo é possível.",
                'thumb_path' => $fantasyImage
            ],
            [
                'name' => "Romance",
                'description' => "Histórias emocionantes que exploram as complexidades do amor e dos relacionamentos humanos. Com personagens cativantes e encontros cheios de paixão, o romance convida os leitores a se envolverem nas alegrias e desafios do amor, em cenários variados que despertam emoções e empatia.",
                'thumb_path' => $romanceImage
            ],
            [
                'name' => "Suspense",
                'description' => "Enredos intrigantes e cheios de tensão, que mantêm o leitor na ponta da cadeira a cada página. Com mistérios para resolver, segredos ocultos e reviravoltas inesperadas, o suspense desafia o leitor a juntar as peças enquanto embarca em uma jornada de adrenalina e descoberta.",
                'thumb_path' => $suspenseImage
            ]
        ];


        foreach ($baseCategories as $category) {
            Category::factory()->create(
                $category
            );
        }
    }
}
