<?php

namespace App\Helpers\Requests\Category;

class CategoryNameRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'unique:categories,name',
            ],
        ];
    }

    /**
     * @return array<string,string>
     */
    public static function attribute(): array
    {
        return [
            'name' => 'Nome',
        ];
    }
}
