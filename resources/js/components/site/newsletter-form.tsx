import { useForm } from '@inertiajs/react';
import { newsletter } from '@/routes';
import { SiteButton } from '@/components/site/button';
import { SiteInput } from '@/components/site/form-controls';

interface NewsletterFormData {
    email: string;
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
    const { data, setData, post, errors, processing } =
        useForm<NewsletterFormData>({ email: '' });

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();
        post(newsletter.url(), { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className="w-full" noValidate>
            <div className={compact ? 'flex gap-2' : ''}>
                <SiteInput
                    name="email"
                    label={compact ? undefined : 'Email address'}
                    type="email"
                    placeholder={
                        compact ? 'Enter your email' : 'you@example.com'
                    }
                    className={compact ? '' : ''}
                    {...(compact
                        ? {
                              'aria-label': 'Email address',
                              id: 'newsletter-email',
                          }
                        : {})}
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    error={errors.email}
                    required
                />
            </div>
            <div className="mt-3">
                <SiteButton
                    type="submit"
                    size={compact ? 'sm' : 'md'}
                    variant="brand"
                    disabled={processing}
                >
                    {processing ? 'Subscribing…' : 'Subscribe'}
                </SiteButton>
            </div>
        </form>
    );
}
