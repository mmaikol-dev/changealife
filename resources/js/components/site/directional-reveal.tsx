import { useRef, useState } from 'react';
import {
    motion,
    useInView,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion';
import { siteEase, useMotionSafe } from '@/site/motion';

interface DirectionalRevealProps {
    children: React.ReactNode;
    className?: string;
    /** Vertical travel, in pixels, of the slide. */
    distance?: number;
    /** Fraction of the element that must be visible to reveal. */
    amount?: number;
}

/**
 * Reveals its children as they enter the viewport, sliding in from the
 * direction you are scrolling: scrolling down drops the content in from
 * above (top to its place), scrolling up lifts it in from below. Fades out
 * on exit. Static under reduced motion.
 */
export function DirectionalReveal({
    children,
    className,
    distance = 90,
    amount = 0.35,
}: DirectionalRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { reduced } = useMotionSafe();
    const inView = useInView(ref, { amount, margin: '-8% 0px -8% 0px' });

    const { scrollY } = useScroll();
    const directionRef = useRef<1 | -1>(1);
    const [direction, setDirection] = useState<1 | -1>(1);

    useMotionValueEvent(scrollY, 'change', (value) => {
        const previous = scrollY.getPrevious() ?? value;
        const next: 1 | -1 = value >= previous ? 1 : -1;

        if (next !== directionRef.current) {
            directionRef.current = next;
            setDirection(next);
        }
    });

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    const hiddenY = direction > 0 ? -distance : distance;

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: hiddenY }}
            transition={{ duration: 0.65, ease: siteEase }}
        >
            {children}
        </motion.div>
    );
}
