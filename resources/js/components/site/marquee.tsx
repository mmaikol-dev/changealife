import { cn } from '@/lib/utils';

interface MarqueeStripProps {
    items: readonly string[];
    dark?: boolean;
    className?: string;
    duration?: number;
    accent?: 'sun' | 'brand';
}

/**
 * An infinite, pause-on-hover marquee strip of words — a premium
 * editorial touch used between branded sections.
 */
export function MarqueeStrip({
    items,
    dark = false,
    className,
    duration = 38,
    accent = 'sun',
}: MarqueeStripProps) {
    if (items.length === 0) {
        return null;
    }

    const track = [...items, ...items];

    return (
        <div
            className={cn(
                'site-marquee-group relative overflow-hidden py-5',
                dark
                    ? 'bg-brand-950 text-brand-50'
                    : 'border-y border-brand-100 bg-sun-50 text-heading',
                className,
            )}
            aria-hidden="true"
        >
            <div
                className="site-marquee"
                style={
                    {
                        '--marquee-duration': `${duration}s`,
                    } as React.CSSProperties
                }
            >
                {track.map((word, index) => (
                    <span
                        key={`${word}-${index}`}
                        className="flex shrink-0 items-center gap-8 pr-8 font-display text-lg font-medium tracking-tight opacity-80"
                    >
                        {word}
                        <span
                            aria-hidden="true"
                            className={cn(
                                'inline-block h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]',
                                accent === 'sun'
                                    ? 'bg-sun-500'
                                    : dark
                                      ? 'bg-sun-300'
                                      : 'bg-brand-300',
                            )}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}
