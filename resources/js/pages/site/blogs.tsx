import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import type { BlogPost } from '@/types/site';
import { PageHeader } from '@/components/site/page-header';
import { StaggerGroup, StaggerItem } from '@/components/site/section';
import { BlogCard } from '@/components/site/blog-card';

interface BlogsProps extends PageProps {
    posts: BlogPost[];
}

export default function Blogs({ posts }: BlogsProps) {
    return (
        <>
            <Head title="Blog" />

            <PageHeader
                eyebrow="Stories & insights"
                title="Blog"
                description="Notes from the field, programme updates, and ideas for lasting change in Kenya."
            >
                <div className="text-right">
                    <p className="font-display text-5xl font-medium text-sun-300 tabular-nums">
                        {posts.length}
                    </p>
                    <p className="mt-1 text-sm text-brand-200">
                        {posts.length === 1
                            ? 'story published'
                            : 'stories published'}
                    </p>
                </div>
            </PageHeader>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
                {posts.length > 0 ? (
                    <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <StaggerItem key={post.id} className="h-full">
                                <BlogCard post={post} />
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                ) : (
                    <p className="text-brand-600">
                        No stories published yet — check back soon.
                    </p>
                )}
            </section>
        </>
    );
}
