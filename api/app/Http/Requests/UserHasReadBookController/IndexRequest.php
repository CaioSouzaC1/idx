<?php

namespace App\Http\Requests\UserHasReadBookController;

use App\Helpers\Requests\Common\UserIdRuleHelper;
use App\Helpers\Requests\Search\PageRuleHelper;
use App\Helpers\Requests\Search\PerPageRuleHelper;
use App\Helpers\Requests\Search\SearchRuleHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

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
            ...UserIdRuleHelper::rule(),
        ];
    }

    public function prepareForValidation()
    {
        info(Auth::id());
        $this->merge([
            'user_id' => Auth::id(),
            "search" => $this->query("search", ''),
            'page' => $this->query('page', 1),
            'per_page' => $this->query('per_page', 10),
        ]);
    }
}
