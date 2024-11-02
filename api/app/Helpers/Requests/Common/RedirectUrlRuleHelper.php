<?php

namespace App\Helpers\Requests\Common;

class RedirectUrlRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule(): array
    {
        return [
            'redirect_url' => [
                'sometimes',
                'nullable',
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
            'redirect_url' => 'Link de redirecionamento',
        ];
    }
}
