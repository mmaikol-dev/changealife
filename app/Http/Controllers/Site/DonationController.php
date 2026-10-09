<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreDonationRequest;
use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DonationController extends Controller
{
    /**
     * The general donations page.
     */
    public function show(): Response
    {
        return Inertia::render('site/donations');
    }

    /**
     * Record a donation pledge.
     */
    public function store(StoreDonationRequest $request): RedirectResponse
    {
        Donation::create($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Thank you for your generosity! Our team will contact you to complete your donation.'),
        ]);

        return back();
    }
}
