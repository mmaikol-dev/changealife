import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import type { ProgrammeKey } from '@/types/site';
import { programmes, heroStats } from '@/site/content';
import { SectionHeading, SectionReveal } from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';
import { ImageStoryList } from '@/components/site/cursor-follow-image';
import { DonateForm } from '@/components/site/donate-form';
import { Check } from 'lucide-react';
import { StatCounter } from '@/components/site/counter';

interface ProgrammeProps extends PageProps {
    programme: ProgrammeKey;
}

export default function Programme({ programme }: ProgrammeProps) {
    const data =
        programmes.find((item) => item.key === programme) ?? programmes[0];

    return (
        <>
            <Head title={data.name} />

            <PageHeader
                title={data.name}
                description={data.tagline}
                image={data.image}
            />

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
                    <div>
                        <SectionReveal>
                            <SectionHeading title="What we do" />
                        </SectionReveal>
                        <div className="mt-6 max-w-2xl space-y-4">
                            {data.description.map((paragraph) => (
                                <p
                                    key={paragraph.slice(0, 24)}
                                    className="text-base leading-relaxed text-brand-700/90"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <SectionReveal delay={0.1} className="mt-10">
                            <h2 className="text-xl font-semibold text-heading">
                                Support includes
                            </h2>
                            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                {data.bullets.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-sm text-brand-800"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sun-500/20 text-sun-700">
                                            <Check
                                                aria-hidden="true"
                                                className="h-3 w-3"
                                                strokeWidth={3}
                                            />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SectionReveal>

                        <SectionReveal
                            delay={0.15}
                            className="mt-10 rounded-2xl border-l-4 border-sun-500 bg-brand-50 p-6"
                        >
                            <h2 className="text-sm font-semibold tracking-wide text-brand-500 uppercase">
                                Our goal
                            </h2>
                            <p className="mt-2 text-base leading-relaxed font-medium text-heading">
                                {data.goal}
                            </p>
                        </SectionReveal>

                        {data.stories?.length ? (
                            <SectionReveal delay={0.1} className="mt-14">
                                <SectionHeading title="Our stories" />
                                <div className="mt-6 max-w-2xl">
                                    <ImageStoryList stories={data.stories} />
                                </div>
                            </SectionReveal>
                        ) : null}
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <DonateForm programme={data.name} compact />
                    </aside>
                </div>
            </section>

            <section className="bg-brand-950 py-16 lg:py-20">
                <div className="mx-auto max-w-8xl px-4 sm:px-6">
                    <SectionReveal>
                        <SectionHeading
                            eyebrow="Across the organisation"
                            title="Impact in numbers"
                            description="Facts from our work since 2019 — reaching families, children, and communities across Kenya."
                            align="center"
                            className="text-brand-50"
                            eyebrowClassName="text-sun-300"
                            titleClassName="text-brand-50"
                            descriptionClassName="text-brand-200"
                        />
                    </SectionReveal>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {heroStats.map((stat) => (
                            <SectionReveal key={stat.label}>
                                <div className="rounded-2xl border border-brand-800 bg-brand-900/60 p-6 text-center transition-colors duration-200 hover:border-brand-700 hover:bg-brand-900">
                                    <p className="text-3xl font-semibold tracking-tight text-sun-300 sm:text-4xl">
                                        <StatCounter text={stat.value} />
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-brand-200">
                                        {stat.label}
                                    </p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
