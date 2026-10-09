<?php

namespace App\Http\Controllers\Site;

use App\Enums\Site\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreEnquiryRequest;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TechnicalAssistanceController extends Controller
{
    /**
     * The technical assistance (B2B) page.
     */
    public function show(): Response
    {
        return Inertia::render('site/technical-assistance');
    }

    /**
     * Store a technical assistance enquiry.
     */
    public function store(StoreEnquiryRequest $request): RedirectResponse
    {
        Message::create([
            'type' => MessageType::TechnicalAssistance,
            ...$request->validated(),
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Thank you — we received your enquiry and will be in touch shortly.'),
        ]);

        return back();
    }
}
