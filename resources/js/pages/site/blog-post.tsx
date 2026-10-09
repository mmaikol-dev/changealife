import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { PageProps } from '@/types';
import type { BlogPost } from '@/types/site';
import { index as blogIndex } from '@/routes/blogs';
import { orgName } from '@/site/content';
import { ReadingProgress } from '@/components/site/reading-progress';
import { StaggerGroup, StaggerItem } from '@/components/site/section';
import { ParallaxImage } from '@/components/site/parallax-image';

interface BlogPostProps extends PageProps {
    post: BlogPost;
}

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

export default function BlogPostPage({ post }: BlogPostProps) {
    const paragraphs = post.body
        .split(/\n\s*\n/)
        .filter((paragraph) => paragraph.trim().length > 0);

    return (
        <>
            <Head title={post.title} />

            <ReadingProgress />

            <article>
                <div className="relative h-64 overflow-hidden bg-brand-950 sm:h-80 lg:h-96">
                    <ParallaxImage
                        src={post.coverImage ?? '/images/cali/who-we-are.jpg'}
                        alt=""
                        speed={0.06}
                        className="h-full"
                        imgClassName="h-64 sm:h-80 lg:h-96"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
                </div>

                <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                    <Link
                        href={blogIndex.url()}
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 underline-offset-4 transition-colors hover:text-brand-900"
                    >
                        <ArrowLeft
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
                        />
                        All stories
                    </Link>

                    <p className="mt-6 text-xs font-medium tracking-wide text-sun-600 uppercase">
                        {post.category} · {formatDate(post.publishedAt)}
                    </p>
                    <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-brand-900 sm:text-4xl">
                        {post.title}
                    </h1>
                    <p className="mt-3 text-sm font-medium text-brand-500">
                        By {post.author || orgName}
                    </p>

                    <div className="mt-8 space-y-5">
                        <StaggerGroup amount={0.05}>
                            {paragraphs.map((paragraph) => (
                                <StaggerItem
                                    key={paragraph.slice(0, 24)}
                                    as="p"
                                    className="text-base leading-relaxed text-brand-800"
                                >
                                    {paragraph}
                                </StaggerItem>
                            ))}
                        </StaggerGroup>
                    </div>
                </div>
            </article>
        </>
    );
}
