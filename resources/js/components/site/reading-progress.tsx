import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ReadingProgressProps {
    target?: React.RefObject<HTMLElement | null>;
}

/**
 * A thin gold progress bar that tracks how far the visitor has read
 * a long-form page (blog posts).
 */
export function ReadingProgress({ target }: ReadingProgressProps) {
    const localRef = useRef<HTMLDivElement>(null);
    const resolved = target ?? localRef;
    const { scrollYProgress } = useScroll(
        target
            ? { target: resolved, offset: ['start start', 'end end'] }
            : { container: undefined },
    );
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 130,
        damping: 24,
        restDelta: 0.001,
    });

    return (
        <>
            <motion.div
                aria-hidden="true"
                style={{ scaleX }}
                className="pointer-events-none fixed top-0 right-0 left-0 z-[85] h-[3px] origin-left bg-gradient-to-r from-sun-600 via-sun-400 to-sun-500"
            />
            <div ref={localRef} className="sr-only" />
        </>
    );
}
