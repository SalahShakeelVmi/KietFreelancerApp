<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

     protected function prepareForValidation()
     {
         $this->merge([
             'customerid' => auth()->id(), // Set customerid to the authenticated user's ID
         ]);
     }

    public function rules(): array
    {
        return [
           
            'projectcategoryid' => ['required'],
            'price' => ['required', 'numeric', 'gt:0', 'lt:99999'],
            'project_title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'delivery_datetime' => ['required'],
            'customerid' =>['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'projectcategoryid.required' => 'Please select project category.',
        ];
    }
}
