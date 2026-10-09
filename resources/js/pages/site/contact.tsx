import { Head } from '@inertiajs/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import type { PageProps } from '@/types';
import { orgContact } from '@/site/content';
import { store as contactStore } from '@/actions/App/Http/Controllers/Site/ContactController';
import { SectionHeading, SectionReveal } from '@/components/site/section';
import { PageHeader } from '@/components/site/page-header';
import { MessageForm } from '@/components/site/message-form';

interface ContactProps extends PageProps {}

export default function Contact(_props: ContactProps) {
    return (
        <>
            <Head title="Contact Us" />

            <PageHeader
                title="Contact Us"
                description="Questions about a programme, a case, or working together — we would love to hear from you."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
                    <div>
                        <SectionReveal>
                            <SectionHeading title="Our details" />
                            <ul className="mt-8 divide-y divide-brand-100 border-y border-brand-100">
                                <li className="group flex gap-4 py-6">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-sun-300">
                                        <MapPin
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-brand-900">
                                            Address
                                        </h3>
                                        <address className="mt-0.5 text-sm leading-relaxed text-brand-600 not-italic">
                                            {orgContact.addressLines.map(
                                                (line) => (
                                                    <span
                                                        key={line}
                                                        className="block"
                                                    >
                                                        {line}
                                                    </span>
                                                ),
                                            )}
                                        </address>
                                    </div>
                                </li>
                                <li className="group flex gap-4 py-6">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-sun-300">
                                        <Phone
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-brand-900">
                                            Phone
                                        </h3>
                                        <a
                                            href={orgContact.phoneHref}
                                            className="mt-0.5 block text-sm text-brand-600 underline-offset-4 transition-colors hover:text-brand-900 hover:underline"
                                        >
                                            {orgContact.phone}
                                        </a>
                                    </div>
                                </li>
                                <li className="group flex gap-4 py-6">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-sun-300">
                                        <Mail
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-brand-900">
                                            Email
                                        </h3>
                                        <a
                                            href={orgContact.emailHref}
                                            className="mt-0.5 block text-sm text-brand-600 underline-offset-4 transition-colors hover:text-brand-900 hover:underline"
                                        >
                                            {orgContact.email}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </SectionReveal>
                    </div>

                    <SectionReveal delay={0.05}>
                        <MessageForm
                            action={contactStore.form().action}
                            title="Send a message"
                            description="We reply within two working days."
                            submitLabel="Send Message"
                        />
                    </SectionReveal>
                </div>
            </section>
        </>
    );
}
