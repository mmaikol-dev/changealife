import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { SectionHeading, SectionReveal } from '@/components/site/section';
import { cn } from '@/lib/utils';

export interface CarouselItem {
    key: string;
    name: string;
    short: string;
    image: string;
    href: string;
    accent?: 'plum' | 'sun';
}

interface ProgrammesCarouselProps {
    programmes: CarouselItem[];
    id?: string;
}

/**
 * Manual horizontal carousel. Cards sit in a native scroll-snap track, so it
 * moves with touch/trackpad swipe on every device, with optional arrow buttons
 * for pointer users. No scroll-jacking, no pinning.
 */
export function ProgrammesCarousel({
    programmes,
    id = 'programmes',
}: ProgrammesCarouselProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollByCards = (direction: -1 | 1): void => {
        const scroller = scrollerRef.current;

        if (!scroller) {
            return;
        }

        scroller.scrollBy({
            left: direction * scroller.clientWidth * 0.8,
            behavior: 'smooth',
        });
    };

    return (
        <section id={id} className="bg-white py-16 lg:py-28">
            <div className="mx-auto max-w-8xl px-4 sm:px-6">
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
                    <SectionReveal>
                        <SectionHeading
                            eyebrow="What we do"
                            title="Our Programmes"
                            description="Five ways we support vulnerable communities — four direct development programmes, plus a Technical Assistance practice that helps the NGOs serving them."
                        />
                    </SectionReveal>

                    <div className="hidden shrink-0 gap-2 sm:flex">
                        <CarouselButton
                            label="Previous programmes"
                            onClick={() => scrollByCards(-1)}
                        >
                            <ChevronLeft
                                aria-hidden="true"
                                className="h-5 w-5"
                            />
                        </CarouselButton>
                        <CarouselButton
                            label="Next programmes"
                            onClick={() => scrollByCards(1)}
                        >
                            <ChevronRight
                                aria-hidden="true"
                                className="h-5 w-5"
                            />
                        </CarouselButton>
                    </div>
                </div>
            </div>

            <div
                ref={scrollerRef}
                className="mt-10 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto px-4 pb-4 sm:px-6 [&::-webkit-scrollbar]:hidden"
            >
                {programmes.map((programme, index) => (
                    <ProgrammeSlide
                        key={programme.key}
                        programme={programme}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}

interface CarouselButtonProps {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
}

function CarouselButton({ label, onClick, children }: CarouselButtonProps) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white text-brand-800 shadow-soft transition-colors duration-200 hover:border-sun-400 hover:bg-sun-500 hover:text-brand-950 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
        >
            {children}
        </button>
    );
}

interface ProgrammeSlideProps {
    programme: CarouselItem;
    index: number;
}

function ProgrammeSlide({ programme, index }: ProgrammeSlideProps) {
    const accentSun = programme.accent === 'sun';

    return (
        <article className="group relative w-[80vw] shrink-0 snap-center sm:w-[24rem] lg:w-[30rem]">
            <Link
                href={programme.href}
                data-cursor="explore"
                className="block h-full overflow-hidden rounded-3xl border border-hairline bg-white shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-hairline-strong hover:shadow-lift focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
            >
                <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                        src={programme.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent"
                    />
                    <span className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-950/60 font-display text-sm font-semibold text-sun-300 backdrop-blur">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-semibold text-heading transition-colors duration-300 group-hover:text-sun-600">
                        {programme.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-700/80">
                        {programme.short}
                    </p>
                    <span
                        className={cn(
                            'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1',
                            accentSun ? 'text-sun-600' : 'text-brand-700',
                        )}
                    >
                        Learn more
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                </div>
            </Link>
        </article>
    );
}
