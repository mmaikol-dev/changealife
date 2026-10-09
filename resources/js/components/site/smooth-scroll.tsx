import { router } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { prefersReducedMotion } from '@/site/motion';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * The single smooth-scroll layer for the whole site. Lenis drives native
 * scroll, GSAP's ticker drives Lenis, and ScrollTrigger is kept in sync so
 * every scroll animation on every page reads from one clock.
 *
 * Mounted exactly once, at the application root.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        ScrollTrigger.config({ ignoreMobileResize: true });

        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        void document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    useEffect(() => {
        const lenis = lenisRef.current?.lenis;

        if (!lenis) {
            return;
        }

        lenis.on('scroll', ScrollTrigger.update);

        const removeNavigate = router.on('navigate', () => {
            lenis.scrollTo(0, { immediate: true });
        });
        const removeFinish = router.on('finish', () => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        return () => {
            lenis.off('scroll', ScrollTrigger.update);
            removeNavigate();
            removeFinish();
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                anchors: true,
                smoothWheel: !prefersReducedMotion(),
            }}
        >
            {children}
        </ReactLenis>
    );
}
