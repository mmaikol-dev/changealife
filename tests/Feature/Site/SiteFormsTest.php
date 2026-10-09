<?php

use App\Enums\Site\MessageType;
use App\Models\CaseSubmission;
use App\Models\Message;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('stores a newsletter subscription', function () {
    $this->post(route('newsletter'), ['email' => 'reader@example.com'])
        ->assertRedirect();

    $this->assertDatabaseHas('messages', [
        'type' => MessageType::Newsletter->value,
        'email' => 'reader@example.com',
    ]);
});

it('rejects a duplicate newsletter subscription for the same list', function () {
    Message::create([
        'type' => MessageType::Newsletter,
        'name' => '',
        'email' => 'reader@example.com',
        'message' => 'Newsletter subscription',
    ]);

    $this->from('/')
        ->post(route('newsletter'), ['email' => 'reader@example.com'])
        ->assertSessionHasErrors('email');

    $this->assertDatabaseCount('messages', 1);
});

it('rejects an invalid newsletter email', function () {
    $this->from('/')
        ->post(route('newsletter'), ['email' => 'not-an-email'])
        ->assertSessionHasErrors('email');

    $this->assertDatabaseCount('messages', 0);
});

it('stores a donation pledge', function () {
    $this->post(route('donations.store'), [
        'name' => 'Grace Wanjiru',
        'email' => 'grace@example.com',
        'amount' => 5000,
        'recurring' => 'Monthly',
        'terms_accepted' => true,
    ])->assertRedirect();

    $this->assertDatabaseHas('donations', [
        'email' => 'grace@example.com',
        'amount' => 5000,
        'recurring' => 'Monthly',
        'terms_accepted' => true,
    ]);
});

it('requires terms acceptance for donations', function () {
    $this->from('/donations')
        ->post(route('donations.store'), [
            'name' => 'Grace Wanjiru',
            'email' => 'grace@example.com',
            'amount' => 5000,
            'recurring' => 'Monthly',
        ])
        ->assertSessionHasErrors('terms_accepted');

    $this->assertDatabaseCount('donations', 0);
});

it('stores a contact message', function () {
    $this->post(route('contact.store'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'message' => 'I would like more information about volunteering.',
    ])->assertRedirect();

    expect(Message::query()->where('type', MessageType::Contact->value)->count())->toBe(1);
});

it('stores a technical assistance enquiry', function () {
    $this->post(route('technical-assistance.store'), [
        'name' => 'Kensington Partners',
        'email' => 'hello@kensington.example',
        'subject' => 'Organisation readiness assessment',
        'message' => 'We would like to assess our readiness before engaging.',
    ])->assertRedirect();

    expect(Message::query()->where('type', MessageType::TechnicalAssistance->value)->count())->toBe(1);
});

it('stores a case submission with uploaded images', function () {
    Storage::fake('public');

    $payload = [
        'title' => 'School fees for triplets in Kibera',
        'nominee_name' => 'Ndirangu Family',
        'age_range' => 'Under 18',
        'gender' => 'Female',
        'location' => 'Kibera, Nairobi',
        'phone' => '+254 700 000 000',
        'challenge' => 'The family struggles to pay school fees for the three children.',
        'category' => 'Education Support',
        'tag' => 'School Fees',
        'support_type' => 'one_time',
        'amount_needed' => 45000,
        'nominator_name' => 'Mary Wambui',
        'relationship' => 'Teacher',
        'nominator_phone' => '+254 711 111 111',
        'nominator_email' => 'mary@example.com',
        'consent_accuracy' => true,
        'consent_nominee' => true,
        'consent_story' => true,
        'video_url' => 'https://example.com/story',
    ];

    $this->post(route('post-your-case.store'), [
        ...$payload,
        'images' => [
            UploadedFile::fake()->image('home.jpg'),
            UploadedFile::fake()->image('community.jpg'),
        ],
    ])->assertRedirect();

    $submission = CaseSubmission::first();

    expect($submission)->not->toBeNull()
        ->and($submission->tag)->toBe('School Fees')
        ->and($submission->images)->toHaveCount(2);

    Storage::disk('public')->assertExists($submission->images[0]);
    Storage::disk('public')->assertExists($submission->images[1]);
});

it('rejects a case submission without consent', function () {
    $this->from('/post-your-case')
        ->post(route('post-your-case.store'), [
            'title' => 'School fees for triplets in Kibera',
            'nominee_name' => 'Ndirangu Family',
            'age_range' => 'Under 18',
            'gender' => 'Female',
            'location' => 'Kibera, Nairobi',
            'phone' => '+254 700 000 000',
            'challenge' => 'The family struggles to pay school fees for the three children.',
            'category' => 'Education Support',
            'support_type' => 'one_time',
            'nominator_name' => 'Mary Wambui',
            'relationship' => 'Teacher',
            'nominator_email' => 'mary@example.com',
            'consent_accuracy' => false,
            'consent_nominee' => true,
            'consent_story' => true,
        ])
        ->assertSessionHasErrors('consent_accuracy');

    expect(CaseSubmission::count())->toBe(0);
});

it('rejects a case submission with too many images', function () {
    $this->from('/post-your-case')
        ->post(route('post-your-case.store'), [
            'title' => 'School fees for triplets in Kibera',
            'nominee_name' => 'Ndirangu Family',
            'age_range' => 'Under 18',
            'gender' => 'Female',
            'location' => 'Kibera, Nairobi',
            'phone' => '+254 700 000 000',
            'challenge' => 'The family struggles to pay school fees for the three children.',
            'category' => 'Education Support',
            'support_type' => 'one_time',
            'nominator_name' => 'Mary Wambui',
            'relationship' => 'Teacher',
            'nominator_email' => 'mary@example.com',
            'consent_accuracy' => true,
            'consent_nominee' => true,
            'consent_story' => true,
            'images' => array_fill(0, 4, UploadedFile::fake()->image('photo.jpg')),
        ])
        ->assertSessionHasErrors('images');

    expect(CaseSubmission::count())->toBe(0);
});
