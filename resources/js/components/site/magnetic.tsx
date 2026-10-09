import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    type MotionValue,
} from 'framer-motion';
import { prefersReducedMotion, useMotionSafe } from '@/site/motion';

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

function useFinePointer(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches
    );
}

/**
 * Wrapper that gently pulls its children toward the pointer and
 * springs back on leave — a tactile "magnetic" CTA feel.
 */
export function Magnetic({
    children,
    strength = 0.32,
    className,
}: MagneticProps) {
    const { reduced } = useMotionSafe();
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX: MotionValue<number> = useSpring(x, {
        stiffness: 160,
        damping: 14,
        mass: 0.12,
    });
    const springY: MotionValue<number> = useSpring(y, {
        stiffness: 160,
        damping: 14,
        mass: 0.12,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || reduced || !useFinePointer()) {
        return <div className={className}>{children}</div>;
    }

    const handleMove = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (!ref.current) {
            return;
        }

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((event.clientX - centerX) * strength);
        y.set((event.clientY - centerY) * strength);
    };

    const handleLeave = (): void => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function prefersFinePointer(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches &&
        !prefersReducedMotion()
    );
}
