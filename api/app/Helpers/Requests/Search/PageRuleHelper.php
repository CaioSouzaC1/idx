<?php

namespace App\Helpers\Requests\Search;

class PageRuleHelper
{
    public static function rule(): array
    {
        return [
            'page' => [
                'sometimes',
                'integer',
            ],
        ];
    }
}
