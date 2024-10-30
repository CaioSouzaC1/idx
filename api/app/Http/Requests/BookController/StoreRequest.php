<?php

namespace App\Http\Requests\BookController;


use App\Helpers\Requests\Book\BookSynopsisRuleHelper;
use App\Helpers\Requests\Book\BookTitleRuleHelper;
use App\Helpers\Requests\Category\CategoryIdRuleHelper;
use App\Helpers\Requests\Common\PdfRuleHelper;
use App\Helpers\Requests\Common\RedirectUrlRuleHelper;
use App\Helpers\Requests\Common\ThumbRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...BookTitleRuleHelper::rule(),
            ...BookSynopsisRuleHelper::rule(),
            ...CategoryIdRuleHelper::rule('category_id'),
            ...PdfRuleHelper::rule(),
            ...ThumbRuleHelper::rule(),
            ...RedirectUrlRuleHelper::rule(),
        ];
    }
}
