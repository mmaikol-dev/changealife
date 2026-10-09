<?php

namespace App\Models;

use App\Enums\Site\SupportCaseStatus;
use Database\Factories\SupportCaseFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportCase extends Model
{
    /** @use HasFactory<SupportCaseFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'location',
        'county',
        'amount_needed',
        'amount_raised',
        'status',
        'gender',
        'age_range',
        'categories',
        'tags',
        'image',
        'featured',
        'posted_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount_needed' => 'decimal:2',
            'amount_raised' => 'decimal:2',
            'status' => SupportCaseStatus::class,
            'categories' => 'array',
            'tags' => 'array',
            'featured' => 'boolean',
            'posted_at' => 'datetime',
        ];
    }

    /**
     * The eligible categories a case can belong to.
     *
     * @return array<int, string>
     */
    public static function categories(): array
    {
        return [
            'Child Welfare',
            'Community Development',
            'Disability Support',
            'Education Support',
            'Elderly Care',
            'Emergency Relief',
            'Food',
            'Livelihood Support',
            'Medical Assistance',
            'Shelter & Housing',
        ];
    }

    /**
     * The available age range buckets.
     *
     * @return array<int, string>
     */
    public static function ageRanges(): array
    {
        return ['Under 18', '18-25', '26-40', '41-60', '60+'];
    }

    /**
     * The forty-seven counties of Kenya.
     *
     * @return array<int, string>
     */
    public static function counties(): array
    {
        return [
            'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu',
            'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho',
            'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui',
            'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
            'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang’a', 'Nairobi',
            'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
            'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Tharaka Nithi',
            'Trans-Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot',
        ];
    }

    /**
     * The tags a case can carry.
     *
     * @return array<int, string>
     */
    public static function tags(): array
    {
        return ['Food', 'School Fees', 'Small Business Support'];
    }

    public function isFullyFunded(): bool
    {
        return $this->amount_raised >= $this->amount_needed;
    }

    /**
     * The public shape exposed to the marketing site.
     *
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        $needed = (float) $this->amount_needed;
        $raised = (float) $this->amount_raised;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'location' => $this->location,
            'county' => $this->county,
            'amountNeeded' => $needed,
            'amountRaised' => $raised,
            'status' => $this->status->value,
            'gender' => $this->gender,
            'ageRange' => $this->age_range,
            'categories' => $this->categories,
            'tags' => $this->tags,
            'image' => $this->image,
            'featured' => $this->featured,
            'postedAt' => $this->posted_at?->toISOString(),
            'progress' => $this->isFullyFunded() ? 100 : min(100, (int) round(($raised / $needed) * 100)),
        ];
    }

    /**
     * The cases eligible for public display.
     */
    public static function publicScope(): Builder
    {
        return self::query()
            ->whereIn('status', [SupportCaseStatus::Open, SupportCaseStatus::Ongoing])
            ->orderByDesc('featured')
            ->orderByDesc('posted_at');
    }
}
