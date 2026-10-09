import { useReducedMotion } from 'framer-motion';

export const siteEase = [0.16, 1, 0.3, 1] as const;

export const siteViewport = { once: true, amount: 0.2 } as const;

export const siteDuration = { fast: 0.3, base: 0.6, slow: 0.9 } as const;

export const siteStagger = 0.08;

export const siteScrub = 0.6;

export const siteRevealDistance = 24;

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
