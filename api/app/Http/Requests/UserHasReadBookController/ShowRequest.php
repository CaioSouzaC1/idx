<?php

namespace App\Http\Requests\UserHasReadBookController;

use App\Helpers\Requests\Book\BookIdRuleHelper;
use App\Helpers\Requests\Common\UserIdRuleHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

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
            ...UserIdRuleHelper::rule(),
            ...BookIdRuleHelper::rule('book_id'),
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'user_id' => Auth::id()
        ]);
    }
}
