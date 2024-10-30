<?php

namespace App\Http\Requests\BookController;

use App\Helpers\Requests\Book\BookIdRuleHelper;
use App\Helpers\Requests\Book\BookSynopsisRuleHelper;
use App\Helpers\Requests\Book\BookTitleRuleHelper;
use App\Helpers\Requests\Category\CategoryIdRuleHelper;
use App\Helpers\Requests\Common\PdfRuleHelper;
use App\Helpers\Requests\Common\RedirectUrlRuleHelper;
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
            ...BookIdRuleHelper::rule(),
            ...BookTitleRuleHelper::rule(),
            ...BookSynopsisRuleHelper::rule(),
            ...CategoryIdRuleHelper::rule('category_id'),
            ...PdfRuleHelper::rule(true),
            ...ThumbRuleHelper::rule(true),
            ...RedirectUrlRuleHelper::rule(),
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }
}
