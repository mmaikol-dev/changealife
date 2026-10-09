import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { technicalAssistance } from '@/site/content';
import { store as technicalAssistanceStore } from '@/actions/App/Http/Controllers/Site/TechnicalAssistanceController';
import { SectionHeading, SectionReveal } from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';
import { MessageForm } from '@/components/site/message-form';

interface TechnicalAssistanceProps extends PageProps {}

export default function TechnicalAssistance(_props: TechnicalAssistanceProps) {
    return (
        <>
            <Head title="Technical Assistance" />

            <PageHeader
                eyebrow="For NGOs, consortia, and fund managers"
                title={technicalAssistance.name}
                description={technicalAssistance.tagline}
            />

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
                    <div>
                        <SectionReveal>
                            <p className="max-w-2xl text-lg leading-relaxed text-brand-800">
                                {technicalAssistance.intro}
                            </p>
                        </SectionReveal>

                        <SectionReveal delay={0.05} className="mt-10">
                            <SectionHeading title="How we work" />
                            <div className="mt-6 max-w-2xl space-y-4">
                                {technicalAssistance.whatWeDo.map(
                                    (paragraph) => (
                                        <p
                                            key={paragraph.slice(0, 24)}
                                            className="text-base leading-relaxed text-brand-700/90"
                                        >
                                            {paragraph}
                                        </p>
                                    ),
                                )}
                            </div>
                        </SectionReveal>

                        <SectionReveal
                            delay={0.1}
                            className="mt-10 rounded-2xl border-l-4 border-sun-500 bg-brand-50 p-6"
                        >
                            <h2 className="text-sm font-semibold tracking-wide text-brand-500 uppercase">
                                Who we work with
                            </h2>
                            <p className="mt-2 text-base leading-relaxed font-medium text-brand-900">
                                {technicalAssistance.whoWeWorkWith}
                            </p>
                        </SectionReveal>

                        <SectionReveal delay={0.1} className="mt-14">
                            <SectionHeading title="Our services" />
                            <div className="mt-8 space-y-4">
                                {technicalAssistance.services.map(
                                    (service, index) => (
                                        <div
                                            key={service.name}
                                            className="group rounded-2xl border border-hairline bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:shadow-lift"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-sun-300 transition-colors duration-300 group-hover:bg-brand-600">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-lg font-semibold text-brand-900">
                                                    {service.name}
                                                </h3>
                                            </div>
                                            <p className="mt-3 text-sm leading-relaxed text-brand-700/85">
                                                {service.description}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </SectionReveal>

                        <SectionReveal delay={0.1} className="mt-14">
                            <SectionHeading title="Why CALI" />
                            <div className="mt-6 max-w-2xl space-y-4">
                                {technicalAssistance.whyCali.map(
                                    (paragraph) => (
                                        <p
                                            key={paragraph.slice(0, 24)}
                                            className="text-base leading-relaxed text-brand-700/90"
                                        >
                                            {paragraph}
                                        </p>
                                    ),
                                )}
                            </div>
                        </SectionReveal>
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <SectionReveal delay={0.05}>
                            <MessageForm
                                action={technicalAssistanceStore.form().action}
                                title="Start a conversation"
                                description="Tell us about your programme or consortium — we will respond within two working days."
                                requireSubject
                                submitLabel="Send enquiry"
                            />
                        </SectionReveal>
                    </aside>
                </div>
            </section>
        </>
    );
}
