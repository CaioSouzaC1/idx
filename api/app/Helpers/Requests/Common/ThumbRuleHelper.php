<?php

namespace App\Helpers\Requests\Common;

class ThumbRuleHelper
{

    public static function rule($optional = false): array
    {
        return [
            'thumb' => [
                'image',
                !$optional ? 'required' : 'sometimes'
            ],
        ];
    }

    /**
     * @return array<string,string>
     */
    public static function attribute(): array
    {
        return [
            'thumb' => 'Thumbnail',
        ];
    }
}
