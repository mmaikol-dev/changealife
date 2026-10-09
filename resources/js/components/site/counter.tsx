import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionSafe } from '@/site/motion';
import { cn } from '@/lib/utils';

function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountUpProps {
    value: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
}

/**
 * Animated count-up that starts when it scrolls into view.
 */
export function CountUp({
    value,
    duration = 1600,
    className,
    prefix = '',
    suffix = '',
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const { reduced } = useMotionSafe();
    const [count, setCount] = useState(reduced ? value : 0);

    useEffect(() => {
        if (reduced) {
            setCount(value);
            return;
        }

        if (!inView) {
            return;
        }

        let frame = 0;
        const start = performance.now();

        const tick = (now: number): void => {
            const progress = Math.min(1, (now - start) / duration);
            setCount(Math.round(easeOutExpo(progress) * value));

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [inView, value, duration, reduced]);

    return (
        <span ref={ref} className={cn('tabular-nums', className)}>
            {prefix}
            {count.toLocaleString('en-KE')}
            {suffix}
        </span>
    );
}

interface StatCounterProps {
    text: string;
    className?: string;
}

/**
 * Counts up a "150+" style label by animating the leading number.
 */
export function StatCounter({ text, className }: StatCounterProps) {
    const match = text.match(/^(\d+)(.*)$/);

    if (!match) {
        return <span className={className}>{text}</span>;
    }

    const value = Number(match[1]);

    return (
        <CountUp
            value={value}
            suffix={match[2]}
            className={className}
            duration={1800}
        />
    );
}
