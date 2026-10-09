<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * The blog index.
     */
    public function index(): Response
    {
        $posts = BlogPost::query()
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->get()
            ->map(fn (BlogPost $post) => $post->toPublicArray())
            ->values();

        return Inertia::render('site/blogs', [
            'posts' => $posts,
        ]);
    }

    /**
     * A single blog post.
     */
    public function show(BlogPost $blog): Response
    {
        if ($blog->published_at === null) {
            abort(404);
        }

        return Inertia::render('site/blog-post', [
            'post' => $blog->toPublicArray(),
        ]);
    }
}
