import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/site';

function formatDate(iso: string | null): string {
    if (!iso) {
        return '';
    }

    return new Date(iso).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
            data-cursor="read"
        >
            <div className="h-44 overflow-hidden">
                <img
                    src={post.coverImage ?? '/images/cali/who-we-are.jpg'}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium tracking-wide text-sun-600 uppercase">
                    {post.category} · {formatDate(post.publishedAt)}
                </p>
                <h3 className="mt-2 line-clamp-2 text-lg leading-snug font-semibold text-brand-900 group-hover:text-brand-700">
                    {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-700/80">
                    {post.excerpt}
                </p>
                <span className="mt-4 text-sm font-semibold text-brand-700">
                    Read story{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                        →
                    </span>
                </span>
            </div>
        </Link>
    );
}

/**
 * Editorial list-row variant used on the home page. Reads like a magazine
 * index rather than a card grid, so it stays visually distinct from the
 * programme and case grids.
 */
export function BlogRow({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="group grid gap-5 border-b border-brand-100 py-6 transition-[border-color,box-shadow] duration-300 hover:border-brand-200 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-8 sm:py-7"
            data-cursor="read"
        >
            <div className="relative h-44 overflow-hidden rounded-2xl sm:h-40">
                <img
                    src={post.coverImage ?? '/images/cali/who-we-are.jpg'}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>
            <div className="flex min-w-0 flex-col justify-center self-center">
                <p className="text-xs font-medium tracking-[0.16em] text-sun-600 uppercase">
                    {post.category}
                </p>
                <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight text-brand-900 transition-colors duration-300 group-hover:text-brand-600 sm:text-2xl">
                    {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-700/80">
                    {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read story
                    <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    />
                </span>
            </div>
        </Link>
    );
}
