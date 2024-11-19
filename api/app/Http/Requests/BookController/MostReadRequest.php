<?php

namespace App\Http\Requests\BookController;

use App\Helpers\Requests\Common\DayQuantityRuleHelper;
use App\Helpers\Requests\Search\PageRuleHelper;
use App\Helpers\Requests\Search\PerPageRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class MostReadRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...DayQuantityRuleHelper::rule(),
            ...PageRuleHelper::rule(),
            ...PerPageRuleHelper::rule(),
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'day_quantity' => $this->query('day_quantity', 7),
            'page' => $this->query('page', 1),
            'per_page' => $this->query('per_page', 10),
        ]);
    }
}
