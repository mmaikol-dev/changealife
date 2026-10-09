import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { legalDocuments } from '@/site/legal-content';
import { SectionReveal } from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';

interface LegalProps extends PageProps {
    document: 'terms' | 'privacy';
}

export default function Legal({ document }: LegalProps) {
    const data = legalDocuments[document] ?? legalDocuments.terms;

    return (
        <>
            <Head title={data.title} />

            <PageHeader
                title={data.title}
                description={data.updatedLabel}
                descriptionClassName="mt-4 text-sm font-medium text-brand-300"
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
                <div className="space-y-10">
                    {data.sections.map((section, index) => (
                        <SectionReveal
                            key={section.heading}
                            delay={Math.min(index * 0.03, 0.15)}
                        >
                            <h2 className="text-lg font-semibold text-heading">
                                {section.heading}
                            </h2>
                            <div className="mt-2 space-y-3">
                                {section.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 24)}
                                        className="text-sm leading-relaxed text-brand-700/90"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                                {section.bullets ? (
                                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-brand-700/90">
                                        {section.bullets.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </section>
        </>
    );
}
