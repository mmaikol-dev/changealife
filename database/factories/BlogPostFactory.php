<?php

namespace Database\Factories;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(5);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'body' => fake()->paragraphs(6, true),
            'author' => 'Namu',
            'category' => fake()->randomElement([
                'Community Impact',
                'Digital Literacy',
                'Disability Inclusion',
                'Empower Her Wellness',
            ]),
            'tag' => fake()->randomElement([
                'Disability Inclusion',
                'Education',
                'Women Empowerment',
                null,
            ]),
            'cover_image' => null,
            'published_at' => fake()->dateTimeBetween('-2 years', 'now'),
        ];
    }
}
