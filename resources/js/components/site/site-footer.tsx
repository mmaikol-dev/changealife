import { Link } from '@inertiajs/react';
import {
    home,
    directSupport,
    postYourCase,
    contact,
    terms,
    privacy,
} from '@/routes';
import { empowerHerWellness } from '@/routes/programme';
import { orgName, orgContact, orgTagline } from '@/site/content';
import { NewsletterForm } from '@/components/site/newsletter-form';

const usefulLinks = [
    { label: 'Empower Her Wellness', href: empowerHerWellness.url() },
    { label: 'Direct Support', href: directSupport.url() },
    { label: 'Post Your Case', href: postYourCase.url() },
    { label: 'Contact Us', href: contact.url() },
    { label: 'Blog', href: '/blogs' },
];

const legalLinks = [
    { label: 'Terms and Conditions', href: terms.url() },
    { label: 'Privacy Policy', href: privacy.url() },
];

const year = new Date().getFullYear();

export function SiteFooter() {
    return (
        <footer className="bg-brand-950 text-brand-200">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
                <div>
                    <Link
                        href={home.url()}
                        className="flex items-center gap-2.5"
                        aria-label={`${orgName} — home`}
                    >
                        <img
                            src="/LOGO12-removebg-preview.png"
                            alt=""
                            className="h-9 w-9 rounded-full object-contain"
                            width={36}
                            height={36}
                        />
                        <span className="text-base font-semibold tracking-tight text-brand-50">
                            Change A Life
                        </span>
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed text-brand-300">
                        {orgTagline}.
                    </p>
                    <address className="mt-4 text-sm leading-relaxed text-brand-300 not-italic">
                        {orgContact.addressLines.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </address>
                    <p className="mt-2 text-sm text-brand-300">
                        <a
                            href={orgContact.phoneHref}
                            className="hover:text-brand-100"
                        >
                            {orgContact.phone}
                        </a>
                    </p>
                    <p className="mt-1 text-sm">
                        <a
                            href={orgContact.emailHref}
                            className="text-brand-200 hover:text-brand-100"
                        >
                            {orgContact.email}
                        </a>
                    </p>
                </div>

                <nav aria-label="Useful links">
                    <h3 className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Explore
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                        {usefulLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-brand-200 transition-colors duration-150 hover:text-brand-50"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-label="Legal pages">
                    <h3 className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Legal
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                        {legalLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-brand-200 transition-colors duration-150 hover:text-brand-50"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h3 className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Subscribe & update
                    </h3>
                    <p className="mt-4 text-sm text-brand-300">
                        Join our mailing list for programme news and stories of
                        lives changed.
                    </p>
                    <div className="mt-4">
                        <NewsletterForm compact />
                    </div>
                </div>
            </div>

            <div className="border-t border-brand-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-brand-400 sm:flex-row sm:px-6">
                    <p>
                        © {year}. All Rights Reserved. {orgName}.
                    </p>
                    <p>
                        Change A Life Initiative is a Kenyan non-profit
                        organisation running programmes since 2019.
                    </p>
                </div>
            </div>
        </footer>
    );
}
