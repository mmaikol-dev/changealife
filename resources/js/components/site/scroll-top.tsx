import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { siteEase } from '@/site/motion';

/**
 * Floating "back to top" button that glides in once the user has
 * scrolled past the hero region.
 */
export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = (): void => {
            setVisible(window.scrollY > 720);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible ? (
                <motion.button
                    type="button"
                    onClick={scrollUp}
                    initial={{ opacity: 0, y: 16, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.8 }}
                    transition={{ duration: 0.35, ease: siteEase }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Back to top"
                    className="fixed right-5 bottom-5 z-[85] flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white/80 text-brand-800 shadow-lift backdrop-blur transition-colors duration-200 hover:bg-sun-500 hover:text-brand-950 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
                >
                    <ArrowUp aria-hidden="true" className="h-4.5 w-4.5" />
                </motion.button>
            ) : null}
        </AnimatePresence>
    );
}
