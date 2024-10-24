<?php

namespace App\Helpers\Requests\Search;

class SearchRuleHelper
{
    public static function rule(): array
    {
        return [
            'search' => [
                'somtimes',
                'string',
            ],
        ];
    }
}
