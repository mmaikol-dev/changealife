import { useEffect, useRef, useState } from 'react';
import type { ProgrammeStory } from '@/types/site';
import { prefersReducedMotion } from '@/site/motion';

interface CursorFollowProps {
    activeSrc: string | null;
}

function CursorFollowImage({ activeSrc }: CursorFollowProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (event: MouseEvent): void => {
            target.current = { x: event.clientX, y: event.clientY };
        };

        window.addEventListener('mousemove', handleMove);

        let frame = 0;
        const tick = (): void => {
            current.current.x += (target.current.x - current.current.x) * 0.15;
            current.current.y += (target.current.y - current.current.y) * 0.15;
            if (imgRef.current) {
                imgRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
            }
            frame = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src={activeSrc ?? undefined}
            alt=""
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-40 hidden h-48 w-64 -translate-x-1/2 -translate-y-1/2 rounded-lg object-cover shadow-xl transition-opacity duration-300 md:block"
            style={{
                opacity: activeSrc ? 1 : 0,
                marginLeft: -128,
                marginTop: -96,
            }}
        />
    );
}

interface ImageStoryListProps {
    stories: ProgrammeStory[];
    centered?: boolean;
}

export function ImageStoryList({
    stories,
    centered = false,
}: ImageStoryListProps) {
    const [activeSrc, setActiveSrc] = useState<string | null>(null);
    const canFollow =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches &&
        !prefersReducedMotion();

    if (!canFollow) {
        return (
            <ul className="space-y-4">
                {stories.map((story) => (
                    <li
                        key={story.title}
                        className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft"
                    >
                        <img
                            src={story.image}
                            alt=""
                            className="h-44 w-full object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-brand-900">
                                {story.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-brand-700/80">
                                {story.caption}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <CursorFollowImage activeSrc={activeSrc} />
            <ul className={centered ? 'text-center' : ''}>
                {stories.map((story) => (
                    <li
                        key={story.title}
                        onMouseEnter={() => setActiveSrc(story.image)}
                        onMouseLeave={() => setActiveSrc(null)}
                        onFocus={() => setActiveSrc(story.image)}
                        onBlur={() => setActiveSrc(null)}
                        tabIndex={0}
                        className="group cursor-pointer border-b border-brand-100 py-6 outline-none"
                    >
                        <h3 className="text-xl font-semibold text-brand-900 transition-colors duration-200 group-hover:text-brand-600 group-focus-visible:text-brand-600">
                            <span className="mr-3 inline-block text-sun-500">
                                ⌁
                            </span>
                            {story.title}
                        </h3>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-brand-700/80">
                            {story.caption}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}
