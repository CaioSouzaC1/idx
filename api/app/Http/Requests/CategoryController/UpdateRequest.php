<?php

namespace App\Http\Requests\CategoryController;

use App\Helpers\Requests\Category\CategoryIdRuleHelper;
use App\Helpers\Requests\Category\CategoryNameRuleHelper;
use App\Helpers\Requests\Common\DescriptionRuleHelper;
use App\Helpers\Requests\Common\ThumbRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...CategoryIdRuleHelper::rule(),
            ...CategoryNameRuleHelper::rule(),
            ...DescriptionRuleHelper::rule(),
            ...ThumbRuleHelper::rule(true)
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }
}
