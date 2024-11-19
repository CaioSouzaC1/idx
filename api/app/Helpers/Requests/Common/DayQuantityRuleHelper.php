<?php

namespace App\Helpers\Requests\Common;

class DayQuantityRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule(): array
    {
        return [
            'day_quantity' => [
                'integer',
                'required',
                'min:1',
                'max:365'
            ],
        ];
    }
}
