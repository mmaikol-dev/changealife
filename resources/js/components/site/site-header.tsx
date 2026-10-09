import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
    home,
    directSupport,
    postYourCase,
    contact,
    donations,
} from '@/routes';
import {
    empowerHerWellness,
    disabilityInclusion,
    digitalLiteracy,
    specialProjects,
} from '@/routes/programme';
import { technicalAssistance } from '@/routes';
import { orgName } from '@/site/content';
import { useMotionSafe } from '@/site/motion';
import { SiteButton, SiteLink } from '@/components/site/button';
import { cn } from '@/lib/utils';

const navLinks = [
    { label: 'Home', href: home.url() },
    { label: 'Direct Support', href: directSupport.url() },
    { label: 'Post Your Case', href: postYourCase.url() },
    { label: 'Blog', href: '/blogs' },
    { label: 'Contact Us', href: contact.url() },
];

const programmeLinks = [
    { label: 'Empower Her Wellness', href: empowerHerWellness.url() },
    { label: 'Disability Inclusion', href: disabilityInclusion.url() },
    { label: 'Digital Literacy', href: digitalLiteracy.url() },
    { label: 'Special Projects', href: specialProjects.url() },
    { label: 'Technical Assistance', href: technicalAssistance.url() },
];

export function SiteHeader() {
    const { reduced } = useMotionSafe();
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = (): void => {
            setScrolled(window.scrollY > 80);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [url]);

    const isActive = (href: string): boolean =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b border-brand-100 bg-cream/90 backdrop-blur transition-[box-shadow,height,padding] duration-200 ease-out',
                scrolled &&
                    'border-transparent bg-cream/95 shadow-[0_14px_34px_-18px_rgba(58,35,71,0.3)]',
            )}
        >
            <div
                className={cn(
                    'mx-auto flex max-w-8xl items-center justify-between px-4 transition-[height] duration-200 sm:px-6',
                    scrolled ? 'h-14' : 'h-16',
                )}
            >
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
                    <span className="hidden text-base font-semibold tracking-tight text-brand-900 sm:block">
                        Change A Life
                    </span>
                </Link>

                <nav
                    className="hidden items-center gap-1 lg:flex"
                    aria-label="Main navigation"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'relative rounded-full px-3 py-2 text-sm font-medium text-brand-700 transition-colors duration-200 after:absolute after:right-3 after:bottom-0.5 after:left-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sun-500 after:transition-transform after:duration-200 hover:text-brand-900 hover:after:scale-x-100 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none',
                                isActive(link.href) &&
                                    'text-brand-900 after:scale-x-100',
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="group relative px-1">
                        <button
                            type="button"
                            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-brand-700 transition-colors duration-200 after:absolute after:right-3 after:bottom-0.5 after:left-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sun-500 after:transition-transform after:duration-200 hover:text-brand-900 hover:after:scale-x-100 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
                            aria-haspopup="true"
                        >
                            Our Work
                            <ChevronDown
                                aria-hidden="true"
                                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                            />
                        </button>
                        <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                            <div className="w-64 rounded-2xl border border-hairline bg-white p-2 shadow-lift">
                                {programmeLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'block rounded-xl px-3 py-2 text-sm font-medium text-brand-700 transition-colors duration-150 hover:bg-cream hover:text-brand-900 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none',
                                            isActive(link.href) &&
                                                'bg-cream text-brand-900',
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center gap-2">
                    <SiteLink
                        href={donations.url()}
                        variant="primary"
                        size="sm"
                        className="hidden sm:inline-flex"
                    >
                        Donate Now
                    </SiteLink>
                    <SiteButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-controls="site-mobile-menu"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {menuOpen ? (
                            <X aria-hidden="true" className="h-5 w-5" />
                        ) : (
                            <Menu aria-hidden="true" className="h-5 w-5" />
                        )}
                    </SiteButton>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen ? (
                    <motion.div
                        id="site-mobile-menu"
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden border-t border-brand-100 bg-white lg:hidden"
                    >
                        <nav
                            className="max-w-8xl space-y-1 px-4 py-4 sm:px-6"
                            aria-label="Mobile navigation"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-cream"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <p className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wider text-brand-400 uppercase">
                                Our Work
                            </p>
                            {programmeLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-cream"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-3">
                                <SiteLink
                                    href={donations.url()}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Donate Now
                                </SiteLink>
                            </div>
                        </nav>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </header>
    );
}
