import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { Programme } from '@/types/site';
import {
    empowerHerWellness,
    disabilityInclusion,
    digitalLiteracy,
    specialProjects,
} from '@/routes/programme';
import { technicalAssistance } from '@/routes';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/site/tilt-card';

const programmeHrefs: Record<string, string> = {
    'empower-her-wellness': empowerHerWellness.url(),
    'disability-inclusion': disabilityInclusion.url(),
    'digital-literacy': digitalLiteracy.url(),
    'special-projects': specialProjects.url(),
};

interface ProgrammeCardProps {
    programme: Programme;
    accent?: 'plum' | 'sun';
    href?: string;
    /** Larger cell used in the asymmetric programme grid. */
    large?: boolean;
}

export function ProgrammeCard({
    programme,
    accent = 'plum',
    href,
    large = false,
}: ProgrammeCardProps) {
    const resolvedHref =
        href ?? programmeHrefs[programme.key] ?? technicalAssistance.url();

    return (
        <TiltCard className="h-full">
            <Link
                href={resolvedHref}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
                data-cursor="explore"
            >
                <div
                    className={cn(
                        'relative overflow-hidden',
                        large ? 'h-56' : 'h-44',
                    )}
                >
                    <img
                        src={programme.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
                </div>

                <div className={cn('flex flex-1 flex-col p-5', large && 'p-6')}>
                    <h3
                        className={cn(
                            'text-lg font-semibold text-brand-900',
                            large && 'text-xl',
                        )}
                    >
                        {programme.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-700/80">
                        {programme.short}
                    </p>
                    <span
                        className={cn(
                            'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1',
                            accent === 'sun'
                                ? 'text-sun-600'
                                : 'text-brand-700',
                        )}
                    >
                        Learn more
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                </div>
            </Link>
        </TiltCard>
    );
}
