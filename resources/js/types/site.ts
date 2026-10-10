export interface SupportCase {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    county: string;
    amountNeeded: number;
    amountRaised: number;
    status: 'open' | 'ongoing' | 'closed';
    gender: string;
    ageRange: string;
    categories: string[];
    tags: string[];
    image: string | null;
    featured: boolean;
    postedAt: string | null;
    progress: number;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    author: string;
    category: string;
    tag: string;
    coverImage: string | null;
    publishedAt: string | null;
}

export type ProgrammeKey =
    | 'empower-her-wellness'
    | 'disability-inclusion'
    | 'digital-literacy'
    | 'special-projects';

export interface ProgrammeStory {
    title: string;
    caption: string;
    image: string;
}

export interface Programme {
    key: ProgrammeKey;
    name: string;
    short: string;
    tagline: string;
    description: string[];
    bullets: string[];
    goal: string;
    image: string;
    gallery?: string[];
    stories?: ProgrammeStory[];
}

export interface ProjectCase {
    title: string;
    description: string;
}

export interface DonationPreset {
    amount: number;
    label: string;
}

export interface DirectSupportFilters {
    q: string;
    category: string;
    county: string;
    gender: string;
    ageRange: string;
    tag: string;
}
