<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'corinthians'
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'a@a.com',
            'password' => 'corinthians'
        ]);

        $this->call([
            CategorySeeder::class,
            BookSeeder::class
        ]);
    }
}
