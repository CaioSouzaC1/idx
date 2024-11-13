<?php

namespace App\Helpers\Requests\Common;

class BookPageRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule($optional = false): array
    {
        return [
            'page' => [
                'integer',
                !$optional ? 'required' : 'sometimes',
            ],
        ];
    }
}
