<?php

namespace Database\Factories;

use App\Enums\Site\SupportType;
use App\Models\CaseSubmission;
use App\Models\SupportCase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CaseSubmission>
 */
class CaseSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'nominee_name' => fake()->name(),
            'age_range' => fake()->randomElement(SupportCase::ageRanges()),
            'gender' => fake()->randomElement(['Male', 'Female', 'Prefer not to say']),
            'location' => fake()->city(),
            'phone' => fake()->numerify('+254 7## ### ###'),
            'challenge' => fake()->paragraphs(3, true),
            'category' => fake()->randomElement(SupportCase::categories()),
            'tag' => fake()->randomElement(['Food', 'School Fees', 'Small Business Support', null]),
            'support_type' => fake()->randomElement(SupportType::cases()),
            'amount_needed' => fake()->numberBetween(5000, 60000),
            'nominator_name' => fake()->name(),
            'relationship' => fake()->randomElement(['Self', 'Family', 'Friend', 'Teacher', 'Community leader', 'Other']),
            'nominator_phone' => fake()->numerify('+254 7## ### ###'),
            'nominator_email' => fake()->unique()->safeEmail(),
            'consent_accuracy' => true,
            'consent_nominee' => true,
            'consent_story' => fake()->boolean(70),
        ];
    }
}
