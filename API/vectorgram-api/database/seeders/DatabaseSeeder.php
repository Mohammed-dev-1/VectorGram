<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{ Role, Permission, Category};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        Category::factory()
            ->count(3)
            ->create();
    }
}
