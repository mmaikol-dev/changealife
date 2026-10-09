<?php

namespace Database\Factories;

use App\Enums\Site\SupportCaseStatus;
use App\Models\SupportCase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<SupportCase>
 */
class SupportCaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1, 99999),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->city(),
            'county' => fake()->randomElement(SupportCase::counties()),
            'amount_needed' => fake()->randomElement([5000, 7000, 10000, 15000, 23000, 55500]),
            'amount_raised' => fake()->numberBetween(0, 10000),
            'status' => fake()->randomElement(SupportCaseStatus::cases()),
            'gender' => fake()->randomElement(['Male', 'Female', null]),
            'age_range' => fake()->randomElement(SupportCase::ageRanges()),
            'categories' => [fake()->randomElement(SupportCase::categories())],
            'tags' => fake()->randomElements(['Food', 'School Fees', 'Small Business Support'], 2),
            'image' => null,
            'featured' => fake()->boolean(30),
            'posted_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => SupportCaseStatus::Open->value,
        ]);
    }
}
