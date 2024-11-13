<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserHasReadBook;

class UserHasReadBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserHasReadBook::factory()->count(1)->create();
    }
}
