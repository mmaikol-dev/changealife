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
    /**
     * Horizontal slide, in percent, driven by scroll position. As the image
     * passes through the viewport it glides from +slideX% to -slideX%. Leave
     * at 0 for the vertical-only parallax.
     */
    slideX?: number;
    children?: React.ReactNode;
}

/**
 * A background image that drifts vertically against scroll for a subtle,
 * premium depth effect. Pass `slideX` to add a horizontal slide in/out.
 * The image is oversized so it never exposes edges, and it collapses to a
 * static render under reduced motion.
 */
export function ParallaxImage({
    src,
    alt,
    className,
    imgClassName,
    speed = 0.1,
    slideX = 0,
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
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [`${slideX}%`, `-${slideX}%`],
    );

    const slides = slideX > 0;

    const style = reduced
        ? undefined
        : slides
          ? { y, x }
          : { y };

    return (
        <div ref={ref} className={cn('relative overflow-hidden', className)}>
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                draggable={false}
                style={style}
                className={cn(
                    'absolute object-cover will-change-transform',
                    slides
                        ? '-top-[10%] left-[-20%] h-[120%] w-[140%]'
                        : 'inset-x-0 -top-[10%] h-[120%] w-full',
                    imgClassName,
                )}
            />
            {children}
        </div>
    );
}
