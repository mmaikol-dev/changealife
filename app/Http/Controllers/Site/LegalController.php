<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    /**
     * The terms and conditions page.
     */
    public function terms(): Response
    {
        return Inertia::render('site/legal', [
            'document' => 'terms',
        ]);
    }

    /**
     * The privacy policy page.
     */
    public function privacy(): Response
    {
        return Inertia::render('site/legal', [
            'document' => 'privacy',
        ]);
    }
}
