<?php

namespace App\Http\Requests\Site;

use App\Enums\Site\SupportType;
use App\Models\SupportCase;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreCaseSubmissionRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'nominee_name' => ['required', 'string', 'max:255'],
            'age_range' => ['required', 'in:'.implode(',', SupportCase::ageRanges())],
            'gender' => ['required', 'in:Female,Male,Prefer not to say'],
            'location' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'challenge' => ['required', 'string', 'max:5000'],
            'category' => ['required', 'in:'.implode(',', SupportCase::categories())],
            'tag' => ['nullable', 'in:'.implode(',', SupportCase::tags())],
            'support_type' => ['required', new Enum(SupportType::class)],
            'amount_needed' => ['nullable', 'numeric', 'min:1', 'max:100000000'],
            'nominator_name' => ['required', 'string', 'max:255'],
            'relationship' => ['required', 'string', 'max:255'],
            'nominator_phone' => ['nullable', 'string', 'max:255'],
            'nominator_email' => ['required', 'email', 'max:255'],
            'consent_accuracy' => ['required', 'accepted'],
            'consent_nominee' => ['required', 'accepted'],
            'consent_story' => ['required', 'accepted'],
            'images' => ['nullable', 'array', 'max:3'],
            'images.*' => ['image', 'mimes:jpeg,png,webp', 'max:5120'],
            'video_url' => ['nullable', 'url', 'max:255'],
        ];
    }
}
