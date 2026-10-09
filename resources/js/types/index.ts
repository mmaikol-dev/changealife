export type * from './auth';
export type * from './navigation';
export type * from './teams';
export type * from './ui';

/** Base props shared with every Inertia page component. */
export interface PageProps {
    [key: string]: unknown;
}
