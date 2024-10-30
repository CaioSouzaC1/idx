<?php

namespace App\Helpers\Requests\Book;

class BookIdRuleHelper
{
    public static function rule($helperName = 'id'): array
    {
        return [
            $helperName => [
                'required',
                'string',
                'exists:books,id',
            ],
        ];
    }
}
