<?php

namespace App\Helpers\Requests\Category;

class CategoryIdRuleHelper
{
    public static function rule($helperName = 'id', $optional = false): array
    {
        return [
            $helperName => [
                !$optional ? 'required' : 'sometimes',
                'string',
                'exists:categories,id',
            ],
        ];
    }
}
