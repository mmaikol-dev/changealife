import { useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { ScrollToTop } from '@/components/site/scroll-top';
import { siteEase, useMotionSafe } from '@/site/motion';

const curtainEase = [0.87, 0, 0.13, 1] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();
    const { reduced } = useMotionSafe();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 30,
        mass: 0.2,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [url]);

    return (
        <div className="flex min-h-screen flex-col bg-cream">
            {reduced ? null : (
                <motion.div
                    aria-hidden="true"
                    className="fixed inset-x-0 top-0 z-[75] h-0.5 origin-left bg-gradient-to-r from-sun-500 via-sun-400 to-brand-500"
                    style={{ scaleX: progress }}
                />
            )}
            <SiteHeader />

            <AnimatePresence mode="wait" initial={false}>
                <motion.main key={url} className="relative flex-1">
                    {reduced ? null : (
                        <motion.div
                            aria-hidden="true"
                            className="site-curtain"
                            initial={{ scaleY: 1 }}
                            animate={{
                                scaleY: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: curtainEase,
                                    delay: 0.05,
                                },
                            }}
                            exit={{
                                scaleY: 1,
                                transition: {
                                    duration: 0.45,
                                    ease: curtainEase,
                                },
                            }}
                        />
                    )}

                    <motion.div
                        initial={
                            reduced
                                ? false
                                : { opacity: 0, y: 18, filter: 'blur(8px)' }
                        }
                        animate={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: {
                                duration: 0.5,
                                ease: siteEase,
                                delay: reduced ? 0 : 0.16,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            y: reduced ? 0 : -10,
                            filter: reduced ? 'none' : 'blur(6px)',
                            transition: {
                                duration: reduced ? 0.12 : 0.22,
                                ease: 'easeOut',
                            },
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.main>
            </AnimatePresence>

            <ScrollToTop />
            <SiteFooter />
        </div>
    );
}
