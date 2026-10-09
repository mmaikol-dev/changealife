import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import type { DirectSupportFilters } from '@/types/site';
import { directSupport } from '@/routes';
import { SiteInput, SiteSelect } from '@/components/site/form-controls';
import { SiteButton } from '@/components/site/button';

interface CaseFiltersProps {
    filters: DirectSupportFilters;
    categories: string[];
    counties: string[];
    ageRanges: string[];
    tags: string[];
    genders: string[];
}

export function CaseFilters({
    filters,
    categories,
    counties,
    ageRanges,
    tags,
    genders,
}: CaseFiltersProps) {
    const [query, setQuery] = useState(filters.q);

    const apply = (data: Partial<DirectSupportFilters>): void => {
        const cleaned: Record<string, string> = {};
        const merged: DirectSupportFilters = { ...filters, ...data };

        for (const [key, value] of Object.entries(merged)) {
            if (value) {
                cleaned[key] = value;
            }
        }

        router.get(directSupport.url(), cleaned, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const reset = (): void => {
        setQuery('');
        router.get(
            directSupport.url(),
            {},
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <form
            className="rounded-2xl border border-hairline bg-white p-5 shadow-soft"
            onSubmit={(event) => {
                event.preventDefault();
                apply({ q: query.trim() });
            }}
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-1">
                    <SiteInput
                        name="q"
                        label="Search"
                        placeholder="Case title, location…"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
                <SiteSelect
                    name="category"
                    label="Category"
                    options={categories}
                    placeholder="Any category"
                    value={filters.category}
                    onChange={(event) =>
                        apply({ category: event.target.value })
                    }
                />
                <SiteSelect
                    name="county"
                    label="County"
                    options={counties}
                    placeholder="Any county"
                    value={filters.county}
                    onChange={(event) => apply({ county: event.target.value })}
                />
                <SiteSelect
                    name="gender"
                    label="Gender"
                    options={genders}
                    placeholder="Any gender"
                    value={filters.gender}
                    onChange={(event) => apply({ gender: event.target.value })}
                />
                <SiteSelect
                    name="ageRange"
                    label="Age range"
                    options={ageRanges}
                    placeholder="Any age"
                    value={filters.ageRange}
                    onChange={(event) =>
                        apply({ ageRange: event.target.value })
                    }
                />
                <SiteSelect
                    name="tag"
                    label="Tag"
                    options={tags}
                    placeholder="Any tag"
                    value={filters.tag}
                    onChange={(event) => apply({ tag: event.target.value })}
                />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t border-brand-100 pt-4">
                <button
                    type="button"
                    onClick={reset}
                    className="text-sm font-medium text-brand-500 underline-offset-4 hover:text-brand-700 hover:underline"
                >
                    Clear filters
                </button>
                <SiteButton type="submit" variant="brand" size="md">
                    <Search aria-hidden="true" className="h-4 w-4" />
                    Search
                </SiteButton>
            </div>
        </form>
    );
}
