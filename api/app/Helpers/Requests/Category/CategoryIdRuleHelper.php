<?php

namespace App\Helpers\Requests\Category;

class CategoryIdRuleHelper
{
    public static function rule(): array
    {
        return [
            'id' => [
                'required',
                'string',
                'exists:categories,id',
            ],
        ];
    }
}
