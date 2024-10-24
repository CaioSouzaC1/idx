<?php

namespace App\Helpers\Requests\Common;

class DescriptionRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule(): array
    {
        return [
            'description' => [
                'sometimes',
                'string',
            ],
        ];
    }

    /**
     * @return array<string,string>
     */
    public static function attribute(): array
    {
        return [
            'description' => 'Descrição',
        ];
    }
}
