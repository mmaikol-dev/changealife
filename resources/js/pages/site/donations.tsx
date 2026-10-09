import { Head, Link } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { terms } from '@/routes';
import { DonateForm } from '@/components/site/donate-form';
import { SectionHeading, SectionReveal } from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';

const giftUses = [
    [
        'Programmes',
        'Wellness, disability inclusion, digital literacy, and special projects on the ground.',
    ],
    [
        'Direct support',
        'Individual verified cases — your donation can fund a need in full, transparently.',
    ],
    [
        'Technical assistance',
        'Helping the NGOs and consortia we work with deliver what they promise.',
    ],
];

interface DonationsProps extends PageProps {}

export default function Donations(_props: DonationsProps) {
    return (
        <>
            <Head title="Donations" />

            <PageHeader
                title="Donate to Change A Life"
                description="Your gift supports our direct programmes and the verified cases in our directory. Every shilling is accounted for."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-2">
                    <SectionReveal>
                        <DonateForm />
                    </SectionReveal>

                    <div>
                        <SectionHeading
                            eyebrow="Where your money goes"
                            title="How gifts are used"
                        />
                        <ul className="mt-8 space-y-4">
                            {giftUses.map(([title, text], index) => (
                                <li
                                    key={title}
                                    className="group flex gap-4 rounded-2xl border border-hairline bg-white p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:shadow-lift"
                                >
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-500/10 text-sm font-semibold text-sun-700 tabular-nums transition-colors duration-300 group-hover:bg-sun-500/20">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-brand-900">
                                            {title}
                                        </h3>
                                        <p className="mt-1 text-sm leading-relaxed text-brand-700/85">
                                            {text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <SectionReveal delay={0.1} className="mt-10">
                            <p className="text-sm leading-relaxed text-brand-600">
                                Donations are voluntary and generally
                                non-refundable. If a case you supported becomes
                                fully funded, your gift may be redirected to a
                                similar programme. Please read our{' '}
                                <Link
                                    href={terms.url()}
                                    className="font-medium text-brand-700 underline underline-offset-4 hover:text-brand-900"
                                >
                                    Terms and Conditions
                                </Link>
                                .
                            </p>
                        </SectionReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
