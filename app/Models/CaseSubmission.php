<?php

namespace App\Models;

use App\Enums\Site\SupportType;
use Database\Factories\CaseSubmissionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseSubmission extends Model
{
    /** @use HasFactory<CaseSubmissionFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'nominee_name',
        'age_range',
        'gender',
        'location',
        'phone',
        'challenge',
        'category',
        'tag',
        'support_type',
        'amount_needed',
        'nominator_name',
        'relationship',
        'nominator_phone',
        'nominator_email',
        'consent_accuracy',
        'consent_nominee',
        'consent_story',
        'images',
        'video_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'support_type' => SupportType::class,
            'amount_needed' => 'decimal:2',
            'consent_accuracy' => 'boolean',
            'consent_nominee' => 'boolean',
            'consent_story' => 'boolean',
            'images' => 'array',
        ];
    }
}
