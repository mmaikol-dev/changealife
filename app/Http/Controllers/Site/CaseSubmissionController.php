<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreCaseSubmissionRequest;
use App\Models\CaseSubmission;
use App\Models\SupportCase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CaseSubmissionController extends Controller
{
    /**
     * The multi-step "post your case" form.
     */
    public function index(): Response
    {
        return Inertia::render('site/post-your-case', [
            'categories' => SupportCase::categories(),
            'ageRanges' => SupportCase::ageRanges(),
            'counties' => SupportCase::counties(),
            'tags' => SupportCase::tags(),
        ]);
    }

    /**
     * Store a case nomination.
     */
    public function store(StoreCaseSubmissionRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $images = [];
        foreach ($data['images'] ?? [] as $image) {
            $images[] = Storage::disk('public')->putFile('case-submissions', $image);
        }

        CaseSubmission::create([
            ...$data,
            'images' => $images,
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Thank you for submitting a case. Our team will review it and get back to you.'),
        ]);

        return back();
    }
}
