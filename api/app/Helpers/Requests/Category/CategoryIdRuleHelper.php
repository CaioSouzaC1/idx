<?php

namespace App\Helpers\Requests\Category;

class CategoryIdRuleHelper
{
    public static function rule($helperName = 'id'): array
    {
        return [
            $helperName => [
                'required',
                'string',
                'exists:categories,id',
            ],
        ];
    }
}
