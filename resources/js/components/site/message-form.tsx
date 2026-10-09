import { useForm } from '@inertiajs/react';
import { SiteButton } from '@/components/site/button';
import { SiteInput, SiteTextarea } from '@/components/site/form-controls';

interface MessageFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface MessageFormProps {
    action: string;
    title: string;
    description?: string;
    requireSubject?: boolean;
    submitLabel?: string;
}

export function MessageForm({
    action,
    title,
    description,
    requireSubject = false,
    submitLabel = 'Send Message',
}: MessageFormProps) {
    const { data, setData, post, errors, processing } =
        useForm<MessageFormData>({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        });

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();
        post(action, { preserveScroll: true });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-2xl border border-hairline bg-white p-6 shadow-soft"
        >
            <h3 className="text-lg font-semibold text-heading">{title}</h3>
            {description ? (
                <p className="mt-1 text-sm text-brand-600">{description}</p>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <SiteInput
                    name="name"
                    label="Your name"
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    error={errors.name}
                    required
                />
                <SiteInput
                    name="email"
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    error={errors.email}
                    required
                />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <SiteInput
                    name="phone"
                    label="Phone"
                    value={data.phone}
                    onChange={(event) => setData('phone', event.target.value)}
                    error={errors.phone}
                />
                <SiteInput
                    name="subject"
                    label="Subject"
                    value={data.subject}
                    onChange={(event) => setData('subject', event.target.value)}
                    error={errors.subject}
                    required={requireSubject}
                />
            </div>

            <div className="mt-3">
                <SiteTextarea
                    name="message"
                    label="Message"
                    rows={5}
                    value={data.message}
                    onChange={(event) => setData('message', event.target.value)}
                    error={errors.message}
                    required
                />
            </div>

            <div className="mt-5">
                <SiteButton type="submit" size="lg" disabled={processing}>
                    {processing ? 'Sending…' : submitLabel}
                </SiteButton>
            </div>
        </form>
    );
}
