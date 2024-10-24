<?php

namespace App\Helpers\Requests\Search;

class PerPageRuleHelper
{
    public static function rule(): array
    {
        return [
            'per_page' => [
                'sometimes',
                'integer',
            ],
        ];
    }
}
