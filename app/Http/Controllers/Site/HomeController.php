<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\SupportCase;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * The public home page.
     */
    public function index(): Response
    {
        $cases = SupportCase::publicScope()
            ->limit(3)
            ->get()
            ->map(fn (SupportCase $case) => $case->toPublicArray())
            ->values();

        $posts = BlogPost::query()
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(fn (BlogPost $post) => $post->toPublicArray())
            ->values();

        return Inertia::render('site/home', [
            'cases' => $cases,
            'blogPosts' => $posts,
        ]);
    }
}
