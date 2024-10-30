<?php

namespace App\Helpers\Requests\Common;

class PdfRuleHelper
{
    /**
     * @return array<string,array<int,string>>
     */
    public static function rule($optional = false): array
    {
        return [
            'pdf' => [
                'mimes:pdf',
                !$optional ? 'required' : 'sometimes',
            ],
        ];
    }
}
