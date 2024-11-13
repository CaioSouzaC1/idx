<?php

namespace Tests\Initiators;

use App\Models\UserHasReadBook;

class UserHasReadBookInitiator
{
    public static function create(): UserHasReadBook
    {
        return UserHasReadBook::factory()->create();
    }
}
