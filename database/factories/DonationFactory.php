<?php

namespace Database\Factories;

use App\Enums\Site\RecurringFrequency;
use App\Models\Donation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Donation>
 */
class DonationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('+254 7## ### ###'),
            'amount' => fake()->randomElement([50, 100, 500, 1000, 2000, 5000, 10000]),
            'recurring' => fake()->randomElement(RecurringFrequency::cases()),
            'programme' => fake()->randomElement([null, 'Empower Her Wellness', 'Disability Inclusion', 'Digital Literacy', 'Special Projects']),
            'terms_accepted' => true,
        ];
    }
}
