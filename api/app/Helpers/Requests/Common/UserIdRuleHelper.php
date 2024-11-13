<?php

namespace App\Helpers\Requests\Common;

class UserIdRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule(): array
    {
        return [
            'user_id' => [
                'required',
                'string',
                'exists:users,id',
            ],
        ];
    }

    /**
     * @return array<string,string>
     */
    public static function attribute(): array
    {
        return [
            'user_id' => 'Id do usuário',
        ];
    }
}
