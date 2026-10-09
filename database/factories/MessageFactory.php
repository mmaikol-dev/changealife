<?php

namespace Database\Factories;

use App\Enums\Site\MessageType;
use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(MessageType::cases()),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('+254 7## ### ###'),
            'subject' => fake()->sentence(4),
            'message' => fake()->paragraphs(2, true),
        ];
    }
}
