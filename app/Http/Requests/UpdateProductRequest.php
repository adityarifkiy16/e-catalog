<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                Rule::unique('t_products', 'code')
                    ->ignore($this->route('product')->id)
                    ->whereNull('deleted_at')
            ],
            'name' => 'nullable|string|max:255',
            'jenis_id' => 'required|exists:m_jenis,id',
            'type_id' => 'nullable|exists:m_types,id',
            'category_id' => 'required|exists:m_categories,id',
            'url_video' => 'nullable|url',
            'specifications' => 'nullable|array',
            'specifications.*.name' => 'nullable|string|max:255',
            'specifications.*.value' => 'nullable|string|max:255',
            'specifications.*.unit' => 'nullable|string|max:255',
            'version' => 'nullable|numeric|exists:m_versions,id',
        ];
    }
}
