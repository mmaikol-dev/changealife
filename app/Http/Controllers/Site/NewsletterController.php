<?php

namespace App\Http\Controllers\Site;

use App\Enums\Site\MessageType;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    /**
     * Subscribe an email address to the newsletter.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255', Rule::unique('messages', 'email')->where(fn ($q) => $q->where('type', MessageType::Newsletter->value))],
        ]);

        Message::create([
            'type' => MessageType::Newsletter,
            'name' => '',
            'email' => $data['email'],
            'message' => 'Newsletter subscription',
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('You are subscribed. Thank you for joining us!'),
        ]);

        return back();
    }
}
