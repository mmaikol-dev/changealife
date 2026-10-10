import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { PageProps } from '@/types';
import type { BlogPost, SupportCase } from '@/types/site';
import {
    whoWeAre,
    programmes,
    howYouCanHelp,
    technicalAssistance as technicalAssistanceData,
    impactWords,
} from '@/site/content';
import { index as blogIndex } from '@/routes/blogs';
import { technicalAssistance, directSupport } from '@/routes';
import { useMotionSafe } from '@/site/motion';
import { SiteHero } from '@/components/site/hero';
import {
    SectionHeading,
    SectionReveal,
    StaggerGroup,
    StaggerItem,
} from '@/components/site/section';
import { ProgrammesCarousel } from '@/components/site/programmes-carousel';
import type { CarouselItem } from '@/components/site/programmes-carousel';
import { DirectionalReveal } from '@/components/site/directional-reveal';
import { ScrollRevealText } from '@/components/site/scroll-reveal-text';
import { programmeHrefs } from '@/components/site/programme-card';
import { CaseCard } from '@/components/site/case-card';
import { BlogRow } from '@/components/site/blog-card';
import { SiteLink } from '@/components/site/button';
import { MarqueeStrip } from '@/components/site/marquee';
import { ParallaxImage } from '@/components/site/parallax-image';

interface HomeProps extends PageProps {
    cases: SupportCase[];
    blogPosts: BlogPost[];
}

export default function Home({ cases, blogPosts }: HomeProps) {
    const { reduced } = useMotionSafe();

    const programmeItems: CarouselItem[] = [
        ...programmes.map((programme) => ({
            key: programme.key,
            name: programme.name,
            short: programme.short,
            image: programme.image,
            href: programmeHrefs[programme.key] ?? technicalAssistance.url(),
        })),
        {
            key: 'technical-assistance',
            name: technicalAssistanceData.name,
            short: technicalAssistanceData.intro,
            image: technicalAssistanceData.image,
            href: technicalAssistance.url(),
            accent: 'sun',
        },
    ];

    return (
        <>
            <Head title="Home" />

            <SiteHero />

            <MarqueeStrip items={impactWords} duration={42} />

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <SectionReveal>
                        <SectionHeading
                            title={whoWeAre.heading}
                            underline={false}
                            titleClassName="text-4xl tracking-tight sm:text-5xl"
                        />
                    </SectionReveal>
                    <div>
                        {whoWeAre.paragraphs.map((paragraph) => (
                            <ScrollRevealText
                                key={paragraph.slice(0, 24)}
                                text={paragraph}
                                className="mt-3 text-base leading-relaxed text-brand-700/90 sm:text-lg"
                            />
                        ))}
                    </div>
                </div>
                <DirectionalReveal className="mt-14" distance={120}>
                    <ParallaxImage
                        src="/images/cali/who-we-are.jpg"
                        alt="Change A Life team engaging with children in the community"
                        speed={0.08}
                        className="aspect-[4/3] rounded-3xl sm:aspect-[16/7]"
                        imgClassName="rounded-3xl"
                    />
                </DirectionalReveal>
            </section>

            <ProgrammesCarousel programmes={programmeItems} />

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:py-28">
                <SectionReveal>
                    <SectionHeading
                        title="How Can You Help?"
                        description="However you give, your support lands directly in a programme or a verified case."
                        underline={false}
                    />
                </SectionReveal>
                <div className="mt-12 grid gap-6 lg:grid-cols-12">
                    <SectionReveal
                        className="lg:col-span-5"
                        y={36}
                        delay={0.05}
                    >
                        <ParallaxImage
                            src={howYouCanHelp[0].image}
                            alt="A Change A Life team member supporting a family"
                            speed={0.09}
                            className="h-full min-h-[22rem] rounded-3xl"
                            imgClassName="rounded-3xl"
                        >
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-brand-950/75 via-brand-950/25 to-transparent p-6 pt-20">
                                <div>
                                    <p className="text-sm font-semibold tracking-wide text-sun-300 uppercase">
                                        47 counties in reach
                                    </p>
                                    <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-brand-50/90">
                                        Support lands across Kenya's forty-seven
                                        counties.
                                    </p>
                                </div>
                            </div>
                        </ParallaxImage>
                    </SectionReveal>

                    <div className="lg:col-span-7">
                        <StaggerGroup
                            className="divide-y divide-brand-100 border-y border-brand-100"
                            amount={0.15}
                        >
                            {howYouCanHelp.map((block, index) => (
                                <StaggerItem
                                    key={block.title}
                                    className="group"
                                >
                                    <div
                                        className="flex items-center gap-5 py-6 sm:gap-7"
                                        data-cursor="explore"
                                    >
                                        <span className="hidden w-10 shrink-0 text-xl font-semibold text-sun-600/50 tabular-nums sm:block">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-20">
                                            <img
                                                src={block.image}
                                                alt=""
                                                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg font-semibold text-heading transition-colors duration-300 group-hover:text-sun-600">
                                                {block.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-brand-700/80">
                                                {block.description}
                                            </p>
                                        </div>
                                        <ArrowRight
                                            aria-hidden="true"
                                            className="h-5 w-5 shrink-0 -translate-x-2 text-brand-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-sun-600 group-hover:opacity-100"
                                        />
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerGroup>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 lg:py-28">
                <div className="mx-auto max-w-8xl px-4 sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <SectionReveal>
                            <SectionHeading
                                title="Featured Live Cases"
                                description="Fund a verified individual need directly — anonymously and transparently."
                                underline={false}
                            />
                        </SectionReveal>
                        <SectionReveal delay={0.1}>
                            <SiteLink
                                href={directSupport.url()}
                                variant="outline"
                            >
                                View all cases
                            </SiteLink>
                        </SectionReveal>
                    </div>
                    <StaggerGroup
                        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        amount={0.1}
                    >
                        {cases.map((caseData) => (
                            <StaggerItem key={caseData.id} className="h-full">
                                <CaseCard caseData={caseData} />
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </div>
            </section>

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:py-28">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionReveal>
                        <SectionHeading
                            title="Latest From Our Blog"
                            underline={false}
                        />
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <SiteLink href={blogIndex.url()} variant="outline">
                            All stories
                        </SiteLink>
                    </SectionReveal>
                </div>
                <StaggerGroup className="mt-6" amount={0.15}>
                    {blogPosts.map((post) => (
                        <StaggerItem key={post.id}>
                            <BlogRow post={post} />
                        </StaggerItem>
                    ))}
                </StaggerGroup>
            </section>

            <section className="relative overflow-hidden bg-brand-900 py-20 lg:py-28">
                {reduced ? null : (
                    <>
                        <div
                            aria-hidden="true"
                            className="site-aurora absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-sun-500/20 blur-[130px]"
                        />
                        <div
                            aria-hidden="true"
                            className="site-aurora site-aurora-delay absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-brand-500/30 blur-[130px]"
                        />
                    </>
                )}
                <div className="relative mx-auto flex max-w-8xl flex-col items-center gap-6 px-4 py-6 text-center sm:px-6">
                    <SectionReveal>
                        <h2 className="max-w-3xl font-display text-4xl font-medium tracking-tight text-brand-50 sm:text-5xl">
                            Every gift, however small,{' '}
                            <em className="font-display text-sun-300 italic">
                                changes a life.
                            </em>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.08}>
                        <p className="max-w-xl text-lg text-brand-200">
                            Become part of the Change A Life community today.
                        </p>
                    </SectionReveal>
                    <SectionReveal delay={0.16}>
                        <div className="flex flex-wrap justify-center gap-3">
                            <SiteLink
                                href="/donations"
                                variant="primary"
                                size="lg"
                                data-cursor="donate"
                            >
                                Donate Now
                            </SiteLink>
                            <SiteLink
                                href="/post-your-case"
                                variant="ghost"
                                size="lg"
                                className="border border-brand-50/30 text-brand-50"
                            >
                                Post a case
                            </SiteLink>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </>
    );
}
