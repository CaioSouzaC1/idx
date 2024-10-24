<?php

namespace App\Http\Requests\CategoryController;

use App\Helpers\Requests\Category\CategoryIdRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class ShowRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...CategoryIdRuleHelper::rule()
        ];
    }


    public function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }
}
