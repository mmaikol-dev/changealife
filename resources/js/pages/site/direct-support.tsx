import { AnimatePresence, motion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { SearchX } from 'lucide-react';
import type { PageProps } from '@/types';
import type { DirectSupportFilters, SupportCase } from '@/types/site';
import { siteEase, useMotionSafe } from '@/site/motion';
import {
    SectionReveal,
    StaggerGroup,
    StaggerItem,
} from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';
import { CaseFilters } from '@/components/site/case-filters';
import { CaseCard } from '@/components/site/case-card';

interface DirectSupportProps extends PageProps {
    cases: SupportCase[];
    filters: DirectSupportFilters;
    categories: string[];
    counties: string[];
    ageRanges: string[];
    tags: string[];
    genders: string[];
}

export default function DirectSupport({
    cases,
    filters,
    categories,
    counties,
    ageRanges,
    tags,
    genders,
}: DirectSupportProps) {
    const { reduced } = useMotionSafe();
    const filterKey = JSON.stringify(filters);

    return (
        <>
            <Head title="Direct Support" />

            <PageHeader
                eyebrow="The case directory"
                title="Direct Support"
                description="Choose a verified case and fund someone's need directly — anonymously and transparently."
            />

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
                <SectionReveal>
                    <CaseFilters
                        filters={filters}
                        categories={categories}
                        counties={counties}
                        ageRanges={ageRanges}
                        tags={tags}
                        genders={genders}
                    />
                </SectionReveal>

                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <p
                            className="text-sm font-medium text-brand-600"
                            aria-live="polite"
                        >
                            {cases.length}{' '}
                            {cases.length === 1 ? 'case' : 'cases'} found
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filterKey}
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduced ? undefined : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: siteEase }}
                            className="mt-6"
                        >
                            {cases.length > 0 ? (
                                <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {cases.map((caseData) => (
                                        <StaggerItem
                                            key={caseData.id}
                                            className="h-full"
                                        >
                                            <CaseCard caseData={caseData} />
                                        </StaggerItem>
                                    ))}
                                </StaggerGroup>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 bg-cream px-6 py-20 text-center">
                                    <SearchX
                                        aria-hidden="true"
                                        className="h-12 w-12 text-brand-300"
                                    />
                                    <h2 className="mt-4 text-lg font-semibold text-brand-800">
                                        No cases match your filters
                                    </h2>
                                    <p className="mt-1 max-w-sm text-sm text-brand-600">
                                        Try removing a filter or two, or check
                                        back soon — new cases are added
                                        regularly.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}
