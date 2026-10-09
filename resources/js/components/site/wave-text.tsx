import { motion } from 'framer-motion';
import { useMotionSafe } from '@/site/motion';

/** Seconds between each letter starting its wave. */
export const waveStagger = 0.045;

interface WaveTextProps {
    text: string;
    className?: string;
    delay?: number;
}

/**
 * Renders text one letter at a time, each lifting in a staggered "wave"
 * on mount before settling back to the baseline.
 */
export function WaveText({ text, className, delay = 0 }: WaveTextProps) {
    const { reduced } = useMotionSafe();

    if (reduced) {
        return <span className={className}>{text}</span>;
    }

    const letters = Array.from(text);

    return (
        <span className={className} aria-label={text}>
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    aria-hidden="true"
                    className="inline-block"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                        y: [0, -16, 0],
                        scaleY: [1, 1.18, 1],
                    }}
                    transition={{
                        duration: 1,
                        times: [0, 0.5, 1],
                        ease: 'easeInOut',
                        delay: delay + index * waveStagger,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
}
