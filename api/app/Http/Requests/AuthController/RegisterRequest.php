<?php

namespace App\Http\Requests\AuthController;

use Illuminate\Foundation\Http\FormRequest;


class RegisterRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            "name" => [
                "string",
                "required",
                "min:6"
            ],
            "email" => [
                "email",
                "required",
                "unique:users,email"
            ],
            "password" => [
                "string",
                "required",
                "min:6"
            ]

        ];
    }

    public function attributes(): array
    {
        return [
            "name" => "nome",
            "email" => "e-mail",
            "password" => "senha"
        ];
    }
}
