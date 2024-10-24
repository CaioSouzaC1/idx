<?php

namespace App\Http\Requests\AuthController;

use Illuminate\Foundation\Http\FormRequest;


class LoginRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            "email" => [
                "email",
                "required",
            ],
            "password" => [
                "string",
                "required",
                "min:6"
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            "email" => "e-mail",
            "password" => "senha",
        ];
    }
}
