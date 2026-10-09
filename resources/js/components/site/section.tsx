import { motion, type Variants } from 'framer-motion';
import { siteEase, siteViewport, useMotionSafe } from '@/site/motion';
import { RevealHeading } from '@/components/site/reveal-heading';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

export function SectionReveal({
    children,
    className,
    delay = 0,
    y = 28,
}: SectionRevealProps) {
    const { reduced } = useMotionSafe();

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={siteViewport}
            transition={{ duration: 0.55, ease: siteEase, delay }}
        >
            {children}
        </motion.div>
    );
}

interface UnderlineProps {
    className?: string;
    pathLength?: number;
}

function Underline({ className, pathLength = 1 }: UnderlineProps) {
    const { reduced } = useMotionSafe();

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 120 8"
            fill="none"
            className={cn('h-2 w-28', className)}
            preserveAspectRatio="none"
        >
            <motion.path
                d="M3 5 C 30 1, 70 1, 117 5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength }}
                viewport={siteViewport}
                transition={{ duration: 0.8, ease: siteEase }}
                style={{ opacity: reduced ? 1 : undefined }}
            />
        </svg>
    );
}

interface SectionHeadingProps {
    eyebrow?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: 'left' | 'center';
    /** Show the brand underline. Defaults to true to preserve other pages. */
    underline?: boolean;
    className?: string;
    eyebrowClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
    underline = true,
    className,
    eyebrowClassName,
    titleClassName,
    descriptionClassName,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                'max-w-2xl',
                align === 'center' && 'mx-auto text-center',
                className,
            )}
        >
            {eyebrow ? (
                <p
                    className={cn(
                        'text-xs font-semibold tracking-[0.18em] text-sun-600 uppercase',
                        eyebrowClassName,
                    )}
                >
                    {eyebrow}
                </p>
            ) : null}
            <RevealHeading
                text={title}
                tag="h2"
                textAlign={align === 'center' ? 'center' : 'left'}
                className={cn(
                    'mt-2 text-3xl font-semibold tracking-tight text-brand-900 sm:text-4xl',
                    titleClassName,
                )}
            />
            {underline ? (
                <Underline
                    className={cn(
                        'mt-3 text-sun-500',
                        align === 'center' && 'mx-auto',
                    )}
                />
            ) : null}
            {description ? (
                <p
                    className={cn(
                        'mt-4 text-base leading-relaxed text-brand-700/80',
                        descriptionClassName,
                    )}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.55, ease: siteEase },
    },
};

const staggerComponents = {
    div: motion.div,
    li: motion.li,
    article: motion.article,
    section: motion.section,
    p: motion.p,
} as const;

interface StaggerGroupProps {
    children: React.ReactNode;
    className?: string;
    amount?: number;
}

export function StaggerGroup({
    children,
    className,
    amount = 0.15,
}: StaggerGroupProps) {
    const { reduced } = useMotionSafe();

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
    as?: 'div' | 'li' | 'article' | 'section' | 'p';
}

export function StaggerItem({
    children,
    className,
    as = 'div',
}: StaggerItemProps) {
    const { reduced } = useMotionSafe();

    if (reduced) {
        const Tag = as;

        return <Tag className={className}>{children}</Tag>;
    }

    const Comp = staggerComponents[as];

    return (
        <Comp className={className} variants={staggerItem}>
            {children}
        </Comp>
    );
}
