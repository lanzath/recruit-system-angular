<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|unique:candidates,email|string|email|min:3|max:255',
            'age' => 'required|integer',
            'linkedin_url' => 'required|unique:candidates,linkedin_url|string|min:3|max:255',
            'technologies' => 'required',
        ];
    }
}
