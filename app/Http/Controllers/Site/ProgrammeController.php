<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ProgrammeController extends Controller
{
    /**
     * The programme page keys this controller can render.
     *
     * @var array<string, string>
     */
    private const PROGRAMMES = [
        'empower-her-wellness' => 'Empower Her Wellness',
        'disability-inclusion' => 'Disability Inclusion',
        'digital-literacy' => 'Digital Literacy',
        'special-projects' => 'Special Projects',
    ];

    /**
     * Show a single programme page.
     */
    public function show(string $programme): Response
    {
        if (! array_key_exists($programme, self::PROGRAMMES)) {
            abort(404);
        }

        return Inertia::render('site/programme', [
            'programme' => $programme,
        ]);
    }
}
