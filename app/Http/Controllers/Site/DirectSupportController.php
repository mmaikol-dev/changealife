<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\SupportCase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DirectSupportController extends Controller
{
    /**
     * The filterable directory of individual support cases.
     */
    public function index(Request $request): Response
    {
        $query = SupportCase::publicScope();

        $query->when($request->filled('category'), function ($q) use ($request) {
            $q->whereJsonContains('categories', $request->string('category')->toString());
        });

        $query->when($request->filled('county'), function ($q) use ($request) {
            $q->where('county', $request->string('county')->toString());
        });

        $query->when($request->filled('gender'), function ($q) use ($request) {
            $q->where('gender', $request->string('gender')->toString());
        });

        $query->when($request->filled('age_range'), function ($q) use ($request) {
            $q->where('age_range', $request->string('age_range')->toString());
        });

        $query->when($request->filled('tag'), function ($q) use ($request) {
            $q->whereJsonContains('tags', $request->string('tag')->toString());
        });

        $query->when($request->filled('q'), function ($q) use ($request) {
            $needle = $request->string('q')->toString();
            $q->where(function ($inner) use ($needle) {
                $inner->where('title', 'like', "%{$needle}%")
                    ->orWhere('description', 'like', "%{$needle}%")
                    ->orWhere('location', 'like', "%{$needle}%");
            });
        });

        $cases = $query
            ->get()
            ->map(fn (SupportCase $case) => $case->toPublicArray())
            ->values();

        return Inertia::render('site/direct-support', [
            'cases' => $cases,
            'filters' => [
                'q' => $request->string('q')->toString(),
                'category' => $request->string('category')->toString(),
                'county' => $request->string('county')->toString(),
                'gender' => $request->string('gender')->toString(),
                'ageRange' => $request->string('age_range')->toString(),
                'tag' => $request->string('tag')->toString(),
            ],
            'categories' => SupportCase::categories(),
            'counties' => SupportCase::counties(),
            'ageRanges' => SupportCase::ageRanges(),
            'tags' => SupportCase::tags(),
            'genders' => ['Female', 'Male', 'Prefer not to say'],
        ]);
    }
}
