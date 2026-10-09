import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { CaseSubmissionWizard } from '@/components/site/wizard-form';
import { SectionReveal } from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';

interface PostYourCaseProps extends PageProps {
    categories: string[];
    ageRanges: string[];
    counties: string[];
    tags: string[];
}

export default function PostYourCase({
    categories,
    ageRanges,
    tags,
}: PostYourCaseProps) {
    return (
        <>
            <Head title="Post Your Case" />

            <PageHeader
                eyebrow="Nominate someone"
                title="Post Your Case"
                description="Nominate an individual, family, or school in need of support. Our team verifies each case before deciding whether to publish it."
            />

            <section className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
                    <SectionReveal>
                        <CaseSubmissionWizard
                            categories={categories}
                            ageRanges={ageRanges}
                            tags={tags}
                        />
                    </SectionReveal>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-2xl border border-hairline bg-white p-6 shadow-soft">
                            <h2 className="text-lg font-semibold text-brand-900">
                                What happens next
                            </h2>
                            <ol className="mt-4 space-y-4">
                                {[
                                    [
                                        'We review',
                                        'Our team reads every submission and checks the details provided.',
                                    ],
                                    [
                                        'We verify',
                                        'Where possible, we reach out to confirm the situation before publishing a case.',
                                    ],
                                    [
                                        'We publish',
                                        'Verified cases appear in the Direct Support directory for funding.',
                                    ],
                                    [
                                        'No guarantee',
                                        'Submitting a case does not guarantee assistance — final decisions rest with CALI.',
                                    ],
                                ].map(([title, text], index) => (
                                    <li key={title} className="flex gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-500/10 text-xs font-semibold text-sun-700 tabular-nums">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-sm font-semibold text-brand-900">
                                                {title}
                                            </h3>
                                            <p className="mt-0.5 text-sm leading-relaxed text-brand-600">
                                                {text}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </aside>
                </div>
            </section>
        </>
    );
}
