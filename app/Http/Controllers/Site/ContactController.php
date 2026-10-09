<?php

namespace App\Http\Controllers\Site;

use App\Enums\Site\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactRequest;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * The contact page.
     */
    public function index(): Response
    {
        return Inertia::render('site/contact');
    }

    /**
     * Store a contact message.
     */
    public function store(StoreContactRequest $request): RedirectResponse
    {
        Message::create([
            'type' => MessageType::Contact,
            ...$request->validated(),
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Thank you for reaching out — we will reply shortly.'),
        ]);

        return back();
    }
}
