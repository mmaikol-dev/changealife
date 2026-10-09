import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionSafe } from '@/site/motion';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    /** How strongly the image drifts against scroll. 0.1 is barely-there. */
    speed?: number;
    children?: React.ReactNode;
}

/**
 * A background image that drifts vertically against scroll for a subtle,
 * premium depth effect. The image is oversized (120%) so it never exposes
 * edges, and it collapses to a static render under reduced motion.
 */
export function ParallaxImage({
    src,
    alt,
    className,
    imgClassName,
    speed = 0.1,
    children,
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { reduced } = useMotionSafe();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const drift = speed * 120;
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${drift}%`, `${drift}%`],
    );

    return (
        <div ref={ref} className={cn('relative overflow-hidden', className)}>
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                draggable={false}
                style={reduced ? undefined : { y }}
                className={cn(
                    'absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover will-change-transform',
                    imgClassName,
                )}
            />
            {children}
        </div>
    );
}
