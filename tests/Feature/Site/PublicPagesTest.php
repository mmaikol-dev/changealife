<?php

use App\Enums\Site\SupportCaseStatus;
use App\Models\BlogPost;
use App\Models\SupportCase;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the homepage with public cases and blog posts', function () {
    SupportCase::factory()->open()->count(3)->create();
    BlogPost::factory()->count(2)->create();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/home')
            ->has('cases', 3)
            ->has('blogPosts', 2)
        );
});

it('only shows open or ongoing cases on the homepage', function () {
    SupportCase::factory()->open()->count(2)->create();
    SupportCase::factory()->count(2)->create(['status' => SupportCaseStatus::Closed]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->has('cases', 2));
});

it('renders each programme page', function (string $path, string $key) {
    $this->get($path)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/programme')
            ->where('programme', $key)
        );
})->with([
    'empower her wellness' => ['/empower-her-wellness', 'empower-her-wellness'],
    'disability inclusion' => ['/disability-inclusion', 'disability-inclusion'],
    'digital literacy' => ['/digital-literacy', 'digital-literacy'],
    'special projects' => ['/special-projects', 'special-projects'],
]);

it('aborts for unknown programme keys', function () {
    $this->get('/empower-her-wellnesses')->assertNotFound();
});

it('renders the technical assistance page', function () {
    $this->get(route('technical-assistance'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('site/technical-assistance'));
});

it('lists public cases on the direct support page', function () {
    $case = SupportCase::factory()->open()->create();

    $this->get(route('direct-support'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/direct-support')
            ->has('cases', 1)
            ->where('cases.0.slug', $case->slug)
            ->has('categories')
            ->has('counties')
            ->has('ageRanges')
            ->has('tags')
        );
});

it('filters the direct support directory', function () {
    SupportCase::factory()->open()->create([
        'county' => 'Nairobi',
        'categories' => ['Medical Assistance'],
    ]);
    SupportCase::factory()->open()->count(3)->create();

    $this->get(route('direct-support', ['county' => 'Nairobi', 'category' => 'Medical Assistance']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/direct-support')
            ->has('cases', 1)
            ->where('filters.county', 'Nairobi')
            ->where('filters.category', 'Medical Assistance')
        );
});

it('searches the direct support directory', function () {
    SupportCase::factory()->open()->create(['title' => 'School fees for a bright student']);
    SupportCase::factory()->open()->count(2)->create();

    $this->get(route('direct-support', ['q' => 'School fees']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->has('cases', 1));
});

it('renders the post your case page with case options', function () {
    $this->get(route('post-your-case'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/post-your-case')
            ->has('categories')
            ->has('ageRanges')
            ->has('counties')
            ->has('tags')
        );
});

it('renders the donations page', function () {
    $this->get(route('donations'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('site/donations'));
});

it('lists published blog posts', function () {
    $post = BlogPost::factory()->create(['title' => 'A very public update']);
    BlogPost::factory()->create(['published_at' => null]);

    $this->get(route('blogs.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/blogs')
            ->has('posts', 1)
            ->where('posts.0.slug', $post->slug)
        );
});

it('shows a published blog post', function () {
    $post = BlogPost::factory()->create();

    $this->get(route('blogs.show', $post))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/blog-post')
            ->where('post.slug', $post->slug)
        );
});

it('aborts when a blog post is not published yet', function () {
    $post = BlogPost::factory()->create(['published_at' => null]);

    $this->get(route('blogs.show', $post))->assertNotFound();
});

it('renders the contact page', function () {
    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('site/contact'));
});

it('renders the legal pages', function (string $path, string $document) {
    $this->get($path)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/legal')
            ->where('document', $document)
        );
})->with([
    'terms' => ['/terms-and-conditions', 'terms'],
    'privacy' => ['/privacy-policy', 'privacy'],
]);
