<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'invoice_id' => $this->generateRandomCode(),
        ]);
    }

    protected function generateRandomCode()
    {
    
        $uuid = Str::uuid()->toString();
        $shortUuid = substr($uuid, 0, 4);

        $dateComponent = now()->format('ymd');
        $uniqueCode = "INV-" . $dateComponent ."-". $shortUuid;

        return $uniqueCode;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invoice_id' => 'required',
        ];
    }
}
