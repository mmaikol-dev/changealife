import { useReducedMotion } from 'framer-motion';

export const siteEase = [0.16, 1, 0.3, 1] as const;

export const siteViewport = { once: true, amount: 0.2 } as const;

export function useMotionSafe(): { reduced: boolean } {
    const reduced = useReducedMotion();

    return { reduced: reduced === true };
}

export function prefersReducedMotion(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}
