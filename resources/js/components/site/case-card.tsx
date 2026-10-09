import { motion } from 'framer-motion';
import type { SupportCase } from '@/types/site';
import { siteEase, siteViewport } from '@/site/motion';
import { donations } from '@/routes';
import { SiteLink } from '@/components/site/button';
import { useTilt } from '@/components/site/tilt-card';

const categoryImages: Record<string, string> = {
    'Education Support': '/images/cali/digital-literacy.jpg',
    Food: '/images/cali/how-you-can-help.jpg',
    'Medical Assistance': '/images/cali/hero.jpg',
    'Disability Support': '/images/cali/disability-inclusion.jpg',
    'Livelihood Support': '/images/cali/special-projects.jpg',
};

export function caseImage(caseData: SupportCase): string {
    if (caseData.image) {
        return caseData.image;
    }

    for (const category of caseData.categories) {
        const match = categoryImages[category];
        if (match) {
            return match;
        }
    }

    return '/images/cali/who-we-are.jpg';
}

export function formatKSh(amount: number): string {
    return `KSh ${amount.toLocaleString('en-KE')}`;
}

export function CaseCard({ caseData }: { caseData: SupportCase }) {
    const { ref, mounted, style, onMouseMove, onMouseLeave, disabled } =
        useTilt<HTMLElement>(5);

    const className =
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft transition-[box-shadow] duration-200 ease-out focus-within:ring-2 focus-within:ring-brand-600 hover:shadow-lift';

    const cardBody = (
        <>
            <div className="relative h-48 overflow-hidden">
                <img
                    src={caseImage(caseData)}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 capitalize backdrop-blur">
                    {caseData.status}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-1.5">
                    {caseData.categories.map((category) => (
                        <span
                            key={category}
                            className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                <h3 className="mt-3 text-lg leading-snug font-semibold text-heading">
                    {caseData.title}
                </h3>
                <p className="mt-1 text-sm text-brand-600">
                    {caseData.location}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-brand-700/80">
                    {caseData.description}
                </p>

                <div className="mt-4">
                    <div className="flex items-baseline justify-between text-sm">
                        <span className="font-medium text-brand-800">
                            {formatKSh(caseData.amountRaised)} raised
                        </span>
                        <span className="text-xs font-semibold text-sun-600 tabular-nums">
                            {caseData.progress}% funded
                        </span>
                    </div>
                    <div
                        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-100/70"
                        role="progressbar"
                        aria-valuenow={caseData.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${caseData.progress}% funded`}
                    >
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-sun-500 to-brand-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${caseData.progress}%` }}
                            viewport={siteViewport}
                            transition={{ duration: 0.8, ease: siteEase }}
                        />
                    </div>
                </div>

                <div className="mt-auto pt-5">
                    <SiteLink
                        href={donations.url()}
                        variant="outline"
                        size="sm"
                        className="w-full"
                        data-cursor="donate"
                    >
                        Support this case
                    </SiteLink>
                </div>
            </div>
        </>
    );

    if (!mounted) {
        return <article className={className}>{cardBody}</article>;
    }

    return (
        <motion.article
            ref={ref}
            style={disabled ? undefined : style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={className}
        >
            {cardBody}
        </motion.article>
    );
}
