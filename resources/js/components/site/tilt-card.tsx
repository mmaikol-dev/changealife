import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    type MotionValue,
} from 'framer-motion';
import { useMotionSafe } from '@/site/motion';

interface TiltStyle {
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    transformPerspective: number;
}

/**
 * A subtle 3D tilt that follows the pointer and settles back on leave.
 * Used to make cards feel physical and interactive.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(
    maxDegrees = 7,
): {
    ref: React.RefObject<T | null>;
    style: TiltStyle;
    onMouseMove: (event: React.MouseEvent<T>) => void;
    onMouseLeave: () => void;
    disabled: boolean;
    mounted: boolean;
} {
    const ref = useRef<T | null>(null);
    const { reduced } = useMotionSafe();
    const [mounted, setMounted] = useState(false);
    const finePointer =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches;

    useEffect(() => {
        setMounted(true);
    }, []);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springX: MotionValue<number> = useSpring(rotateX, {
        stiffness: 140,
        damping: 16,
    });
    const springY: MotionValue<number> = useSpring(rotateY, {
        stiffness: 140,
        damping: 16,
    });

    const styles = {
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
    };

    const disabled = reduced || !finePointer;

    const onMouseMove = (event: React.MouseEvent<T>): void => {
        if (disabled || !ref.current) {
            return;
        }

        const rect = ref.current.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        rotateY.set((px - 0.5) * -2 * maxDegrees);
        rotateX.set((py - 0.5) * 2 * maxDegrees);
    };

    const onMouseLeave = (): void => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return {
        ref,
        style: styles,
        onMouseMove,
        onMouseLeave,
        disabled,
        mounted,
    };
}

export function TiltCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { mounted, ref, style, onMouseMove, onMouseLeave, disabled } =
        useTilt();

    if (!mounted || disabled) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}
