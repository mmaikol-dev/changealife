import type { ProgrammeStory } from '@/types/site';

interface ImageStoryListProps {
    stories: ProgrammeStory[];
}

/**
 * Vertical list of programme stories, each with an always-visible photo
 * alongside the title and caption. Images no longer wait for hover.
 */
export function ImageStoryList({ stories }: ImageStoryListProps) {
    return (
        <ul className="divide-y divide-brand-100 border-b border-brand-100">
            {stories.map((story) => (
                <li
                    key={story.title}
                    className="group grid gap-5 py-8 sm:grid-cols-[15rem_1fr] sm:items-center sm:gap-8"
                >
                    <div className="relative h-44 overflow-hidden rounded-2xl sm:h-44">
                        <img
                            src={story.image}
                            alt={story.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-xl leading-snug font-semibold tracking-tight text-heading transition-colors duration-300 group-hover:text-brand-600 sm:text-2xl">
                            {story.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-brand-700/80">
                            {story.caption}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}