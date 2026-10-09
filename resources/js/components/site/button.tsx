import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    [
        'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-[transform,background-color,box-shadow] duration-150 ease-out',
        'focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-60',
        'active:translate-y-0 active:scale-[0.98]',
    ],
    {
        variants: {
            variant: {
                primary: [
                    'relative overflow-hidden bg-sun-500 text-brand-950 shadow-md shadow-sun-500/30 hover:-translate-y-px hover:bg-sun-400',
                    'focus-visible:ring-sun-600',
                ],
                brand: [
                    'relative overflow-hidden bg-brand-700 text-brand-50 hover:-translate-y-px hover:bg-brand-800',
                    'focus-visible:ring-brand-600',
                ],
                outline: [
                    'border border-brand-300 bg-transparent text-brand-800 hover:-translate-y-px hover:bg-brand-50',
                    'focus-visible:ring-brand-600',
                ],
                ghost: [
                    'bg-transparent text-brand-700 hover:bg-brand-50',
                    'focus-visible:ring-brand-600',
                ],
            },
            size: {
                md: 'h-10 px-5 text-sm',
                lg: 'h-12 px-7 text-base',
                sm: 'h-9 px-4 text-xs',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

export interface SiteButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export function SiteButton({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: SiteButtonProps) {
    const Comp = asChild ? Slot : 'button';
    const hasSheen = variant === 'primary' || variant === 'brand';

    return (
        <Comp
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {hasSheen ? (
                <span aria-hidden="true" className="site-sheen" />
            ) : null}
            {props.children}
        </Comp>
    );
}

export interface SiteLinkProps
    extends
        Omit<React.ComponentProps<typeof Link>, 'as' | 'size'>,
        VariantProps<typeof buttonVariants> {}

export function SiteLink({
    className,
    variant,
    size,
    ...props
}: SiteLinkProps) {
    const hasSheen = variant === 'primary' || variant === 'brand';

    return (
        <Link
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {hasSheen ? (
                <span aria-hidden="true" className="site-sheen" />
            ) : null}
            {props.children}
        </Link>
    );
}

export { buttonVariants };
