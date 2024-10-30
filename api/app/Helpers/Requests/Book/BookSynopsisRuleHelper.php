<?php

namespace App\Helpers\Requests\Book;

class BookSynopsisRuleHelper
{
    public static function rule(): array
    {
        return [
            'synopsis' => [
                'required',
                'string',
                'unique:books,synopsis',
            ],
        ];
    }
}
