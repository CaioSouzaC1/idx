<?php

namespace App\Http\Requests\BookController;

use App\Helpers\Requests\Category\CategoryIdRuleHelper;
use App\Helpers\Requests\Search\PageRuleHelper;
use App\Helpers\Requests\Search\PerPageRuleHelper;
use App\Helpers\Requests\Search\SearchRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...SearchRuleHelper::rule(),
            ...PageRuleHelper::rule(),
            ...PerPageRuleHelper::rule(),
            ...CategoryIdRuleHelper::rule('category_id', true)
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            "search" => $this->query("search", ''),
            'page' => $this->query('page', 1),
            'per_page' => $this->query('per_page', 10),
        ]);
    }
}
