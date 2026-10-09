import { motion } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { donationPresets, donationRecurringOptions } from '@/site/content';
import { store as donationsStore } from '@/actions/App/Http/Controllers/Site/DonationController';
import { SiteButton } from '@/components/site/button';
import {
    SiteCheckbox,
    SiteInput,
    SiteSelect,
} from '@/components/site/form-controls';
import { checkboxVariants, buttonTap } from '@/site/form-motion';

interface DonateFormProps {
    programme?: string;
    compact?: boolean;
}

interface DonationFormData {
    name: string;
    email: string;
    phone: string;
    amount: string;
    recurring: string;
    programme: string;
    terms_accepted: boolean;
}

export function DonateForm({
    programme = '',
    compact = false,
}: DonateFormProps) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<DonationFormData>({
            name: '',
            email: '',
            phone: '',
            amount: '',
            recurring: 'None',
            programme,
            terms_accepted: false,
        });

    const choosePreset = (amount: number): void => {
        setData('amount', String(amount));
    };

    const isPreset = (amount: number): boolean =>
        data.amount === String(amount);

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();
        post(donationsStore.form().action, { preserveScroll: true });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-2xl border border-hairline bg-white p-6 shadow-soft"
        >
            <h3 className="text-lg font-semibold text-brand-900">Donate</h3>
            <p className="mt-1 text-sm text-brand-600">
                {compact
                    ? 'Choose an amount to give.'
                    : 'Your gift reaches a programme or case directly.'}
            </p>

            <div className="mt-5">
                <span className="mb-2 block text-sm font-medium text-brand-800">
                    Amount (KES)
                </span>
                <div
                    className="grid grid-cols-4 gap-2"
                    role="group"
                    aria-label="Preset amounts"
                >
                    {donationPresets.map((preset) => (
                        <motion.button
                            key={preset.amount}
                            type="button"
                            onClick={() => choosePreset(preset.amount)}
                            aria-pressed={isPreset(preset.amount)}
                            variants={checkboxVariants}
                            whileTap={buttonTap}
                            className={[
                                'rounded-xl border px-2 py-2 text-xs font-semibold transition-colors duration-150',
                                isPreset(preset.amount)
                                    ? 'border-sun-500 bg-sun-500 text-brand-950'
                                    : 'border-brand-200 bg-cream text-brand-700 hover:border-sun-400',
                            ].join(' ')}
                        >
                            {preset.label}
                        </motion.button>
                    ))}
                </div>
                <div className="mt-3">
                    <SiteInput
                        name="amount"
                        label="Custom amount"
                        type="number"
                        min={20}
                        inputMode="numeric"
                        placeholder="e.g. 1500"
                        value={data.amount}
                        onChange={(event) =>
                            setData('amount', event.target.value)
                        }
                        error={errors.amount}
                    />
                    <p className="mt-1 text-xs text-brand-500">
                        Minimum payable amount is KES 20.
                    </p>
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SiteInput
                    name="name"
                    label="Full name"
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
                    label="Phone number"
                    value={data.phone}
                    onChange={(event) => setData('phone', event.target.value)}
                    error={errors.phone}
                />
                <SiteSelect
                    name="recurring"
                    label="Recurring payment"
                    options={donationRecurringOptions}
                    value={data.recurring}
                    onChange={(event) =>
                        setData('recurring', event.target.value)
                    }
                    error={errors.recurring}
                />
            </div>

            <div className="mt-4">
                <SiteCheckbox
                    name="terms_accepted"
                    label="I agree to the terms and conditions."
                    checked={data.terms_accepted}
                    onChange={(event) =>
                        setData('terms_accepted', event.target.checked)
                    }
                    error={errors.terms_accepted}
                    required
                />
            </div>

            <div className="mt-5 flex items-center gap-3">
                <SiteButton
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={processing}
                >
                    {processing ? 'Processing…' : 'Donate Now'}
                </SiteButton>
                {recentlySuccessful ? (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-brand-600"
                        title="Thank you"
                    >
                        <CheckCircle2 aria-hidden="true" className="h-6 w-6" />
                        <span className="sr-only">Thank you</span>
                    </motion.span>
                ) : null}
            </div>
        </form>
    );
}
