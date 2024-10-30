<?php

namespace App\Helpers\Requests\Book;

class BookTitleRuleHelper
{
    public static function rule(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'unique:books,title',
            ],
        ];
    }
}
