import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { donations } from '@/routes';
import { orgName, orgTagline, heroStats } from '@/site/content';
import { siteEase, prefersReducedMotion, useMotionSafe } from '@/site/motion';
import { SiteButton, SiteLink } from '@/components/site/button';
import { Magnetic } from '@/components/site/magnetic';
import { StatCounter } from '@/components/site/counter';
import { WaveText, waveStagger } from '@/components/site/wave-text';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statIntervalMs = 4200;

function RotatingStats() {
    const { reduced } = useMotionSafe();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (reduced || paused) {
            return;
        }

        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % heroStats.length);
        }, statIntervalMs);

        return () => clearInterval(timer);
    }, [reduced, paused]);

    if (reduced) {
        return (
            <p className="text-sm font-medium text-brand-50/90">
                <span className="font-semibold text-sun-300">
                    {heroStats[0].value}
                </span>{' '}
                {heroStats[0].label}
            </p>
        );
    }

    const active = heroStats[index];

    return (
        <div
            className="min-h-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: siteEase }}
                    className="text-sm font-medium text-brand-50/90"
                    aria-live="polite"
                >
                    <span className="font-semibold text-sun-300">
                        <StatCounter text={active.value} />
                    </span>{' '}
                    {active.label}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

export function SiteHero() {
    const { reduced } = useMotionSafe();
    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion() || !imageRef.current) {
                return;
            }

            const tween = gsap.to(imageRef.current, {
                yPercent: 18,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6,
                },
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        },
        { scope: heroRef },
    );

    const scrollToProgrammes = (): void => {
        document
            .getElementById('programmes')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={heroRef}
            className="relative flex min-h-[88dvh] flex-col justify-end overflow-hidden bg-brand-950 lg:min-h-[92dvh]"
        >
            <div
                ref={imageRef}
                className="absolute inset-0 -bottom-24 bg-cover bg-center will-change-transform"
                style={{ backgroundImage: "url('/images/cali/hero.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/60 to-brand-950/90" />

            {reduced ? null : (
                <>
                    <div className="site-aurora absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-sun-500/25 blur-[110px]" />
                    <div className="site-aurora site-aurora-delay absolute right-[-10%] bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-brand-400/30 blur-[120px]" />
                </>
            )}

            <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:pb-24">
                <motion.p
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: siteEase }}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-50/20 bg-brand-50/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-sun-300 uppercase backdrop-blur"
                >
                    Kenyan non-profit since 2019
                </motion.p>

                <motion.h1
                    initial={reduced ? false : { opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: siteEase, delay: 0.1 }}
                    className="max-w-4xl font-brush text-5xl leading-[1.15] font-medium tracking-tight text-brand-50 sm:text-6xl lg:text-7xl"
                >
                    <WaveText
                        text={orgName.replace(/ Initiative$/, '')}
                        delay={0.1}
                    />
                    <span className="block text-sun-300">
                        <WaveText
                            text="Initiative."
                            delay={
                                0.1 +
                                orgName.replace(/ Initiative$/, '').length *
                                    waveStagger
                            }
                        />
                    </span>
                </motion.h1>

                <motion.p
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: siteEase, delay: 0.2 }}
                    className="max-w-xl text-lg leading-relaxed text-brand-100 sm:text-xl"
                >
                    {orgTagline.split(', ')[0]},{' '}
                    <em className="font-medium text-sun-200 italic">
                        {orgTagline.split(', ')[1]}
                    </em>
                </motion.p>

                <motion.div
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: siteEase, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-4"
                >
                    <Magnetic strength={0.3}>
                        <SiteLink
                            href={donations.url()}
                            variant="primary"
                            size="lg"
                            data-cursor="donate"
                        >
                            Donate Now
                        </SiteLink>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                        <SiteButton
                            type="button"
                            onClick={scrollToProgrammes}
                            variant="ghost"
                            size="lg"
                            className="text-brand-50 hover:bg-brand-50/10"
                            data-cursor="explore"
                        >
                            Explore our programmes
                        </SiteButton>
                    </Magnetic>
                </motion.div>

                <motion.div
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: siteEase, delay: 0.45 }}
                    className="mt-2"
                >
                    <RotatingStats />
                </motion.div>
            </div>
        </section>
    );
}
