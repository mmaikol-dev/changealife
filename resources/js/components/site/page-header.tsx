import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { siteEase, useMotionSafe } from '@/site/motion';
import { RevealHeading } from '@/components/site/reveal-heading';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    image?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

/**
 * Shared dark lede header for interior pages. Uses the editorial display
 * face (Fraunces), a soft aurora wash, and reduced-motion-safe entrances.
 * Pass `children` for a right-aligned accent (e.g. a live stat).
 */
export function PageHeader({
    eyebrow,
    title,
    description,
    children,
    image,
    titleClassName,
    descriptionClassName,
}: PageHeaderProps) {
    const { reduced } = useMotionSafe();

    const rise = (delay: number) => ({
        initial: reduced ? false : { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: siteEase, delay },
    });

    return (
        <section className="relative overflow-hidden bg-brand-950">
            {image ? (
                <>
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')` }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/85 to-brand-950/70"
                    />
                </>
            ) : reduced ? null : (
                <>
                    <div
                        aria-hidden="true"
                        className="site-aurora absolute -top-32 right-1/4 h-[26rem] w-[26rem] rounded-full bg-sun-500/15 blur-[120px]"
                    />
                    <div
                        aria-hidden="true"
                        className="site-aurora site-aurora-delay absolute -bottom-40 -left-24 h-[24rem] w-[24rem] rounded-full bg-brand-400/20 blur-[120px]"
                    />
                </>
            )}

            <div className="relative mx-auto max-w-8xl px-4 py-20 sm:px-6 lg:py-28">
                <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
                    <div className="max-w-2xl">
                        {eyebrow ? (
                            <motion.p
                                className="text-xs font-semibold tracking-[0.2em] text-sun-300 uppercase"
                                {...rise(0)}
                            >
                                {eyebrow}
                            </motion.p>
                        ) : null}
                        {typeof title === 'string' ? (
                            <RevealHeading
                                text={title}
                                tag="h1"
                                delay={30}
                                duration={0.8}
                                className={cn(
                                    'mt-3 font-display text-4xl leading-[1.12] font-medium tracking-tight text-brand-50 sm:text-5xl',
                                    titleClassName,
                                )}
                            />
                        ) : (
                            <motion.h1
                                className={cn(
                                    'mt-3 font-display text-4xl leading-[1.12] font-medium tracking-tight text-brand-50 sm:text-5xl',
                                    titleClassName,
                                )}
                                {...rise(eyebrow ? 0.08 : 0)}
                            >
                                {title}
                            </motion.h1>
                        )}
                        {description ? (
                            <motion.p
                                className={cn(
                                    'mt-5 max-w-xl text-lg leading-relaxed text-brand-100',
                                    descriptionClassName,
                                )}
                                {...rise(eyebrow ? 0.16 : 0.08)}
                            >
                                {description}
                            </motion.p>
                        ) : null}
                    </div>
                    {children ? (
                        <motion.div
                            className="shrink-0"
                            {...rise(eyebrow ? 0.24 : 0.16)}
                        >
                            {children}
                        </motion.div>
                    ) : null}
                </div>
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-sun-500/30 via-sun-500/5 to-transparent"
            />
        </section>
    );
}
