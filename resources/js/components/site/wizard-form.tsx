import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react';
import { store as caseSubmissionStore } from '@/actions/App/Http/Controllers/Site/CaseSubmissionController';
import { caseFieldOptions } from '@/site/content';
import { siteEase, useMotionSafe } from '@/site/motion';
import { SiteButton } from '@/components/site/button';
import {
    SiteCheckbox,
    SiteInput,
    SiteSelect,
    SiteTextarea,
} from '@/components/site/form-controls';

interface WizardFormProps {
    categories: string[];
    ageRanges: string[];
    tags: string[];
}

type CaseSubmissionData = {
    title: string;
    nominee_name: string;
    age_range: string;
    gender: string;
    location: string;
    phone: string;
    challenge: string;
    category: string;
    tag: string;
    support_type: string;
    amount_needed: string;
    nominator_name: string;
    relationship: string;
    nominator_phone: string;
    nominator_email: string;
    consent_accuracy: boolean;
    consent_nominee: boolean;
    consent_story: boolean;
    video_url: string;
    images: File[];
};

const steps = [
    { name: 'General information', step: 1 },
    { name: 'About the nominee', step: 2 },
    { name: 'Nature of support', step: 3 },
    { name: 'About the nominator', step: 4 },
    { name: 'Consent', step: 5 },
    { name: 'Images & video', step: 6 },
    { name: 'Review & submit', step: 7 },
];

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxImages = 3;
const maxImageSize = 5 * 1024 * 1024;

export function CaseSubmissionWizard({
    categories,
    ageRanges,
    tags,
}: WizardFormProps) {
    const { reduced } = useMotionSafe();
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [stepErrors, setStepErrors] = useState<Record<number, string[]>>({});

    const { data, setData, post, errors, processing } =
        useForm<CaseSubmissionData>({
            title: '',
            nominee_name: '',
            age_range: '',
            gender: '',
            location: '',
            phone: '',
            challenge: '',
            category: '',
            tag: '',
            support_type: 'one_time',
            amount_needed: '',
            nominator_name: '',
            relationship: '',
            nominator_phone: '',
            nominator_email: '',
            consent_accuracy: false,
            consent_nominee: false,
            consent_story: false,
            video_url: '',
            images: [],
        });

    const stepFieldMap: Record<number, (keyof CaseSubmissionData)[]> = {
        0: ['title'],
        1: ['nominee_name', 'age_range', 'gender', 'location', 'phone'],
        2: ['challenge', 'category', 'support_type'],
        3: ['nominator_name', 'relationship', 'nominator_email'],
        4: ['consent_accuracy', 'consent_nominee', 'consent_story'],
        5: [],
        6: [],
    };

    const validateStep = (index: number): boolean => {
        const fieldNames = stepFieldMap[index];
        const missing: string[] = [];

        for (const field of fieldNames) {
            const value = data[field];
            const empty =
                typeof value === 'string'
                    ? value.trim() === ''
                    : value === false;

            if (empty) {
                missing.push(String(field));
            }
        }

        setStepErrors((previous) => ({ ...previous, [index]: missing }));

        return missing.length === 0;
    };

    const goTo = (next: number): void => {
        if (next > step && !validateStep(step)) {
            return;
        }

        if (next < 0 || next >= steps.length) {
            return;
        }

        setDirection(next > step ? 1 : -1);
        setStep(next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const addFiles = (files: FileList | null): void => {
        if (!files) {
            return;
        }

        const invalid: string[] = [];

        const accepted: File[] = [];
        for (const file of Array.from(files)) {
            if (!imageMimeTypes.includes(file.type)) {
                invalid.push(`${file.name}: only JPG, PNG or WebP allowed`);
                continue;
            }
            if (file.size > maxImageSize) {
                invalid.push(`${file.name}: must be 5 MB or smaller`);
                continue;
            }
            accepted.push(file);
        }

        if (accepted.length + data.images.length > maxImages) {
            invalid.push(`You can attach at most ${maxImages} images`);
        }

        setStepErrors((previous) => ({ ...previous, 5: invalid }));

        if (invalid.length === 0 && accepted.length > 0) {
            setData(
                'images',
                [...data.images, ...accepted].slice(0, maxImages),
            );
        }
    };

    const removeImage = (index: number): void => {
        setData(
            'images',
            data.images.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();

        if (!validateStep(step)) {
            return;
        }

        post(caseSubmissionStore.form().action, {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const slideVariants = {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
    };

    return (
        <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
            <ol
                className="flex items-center gap-1 sm:gap-2"
                aria-label="Form progress"
            >
                {steps.map((item, index) => {
                    const complete = index < step;

                    return (
                        <li key={item.step} className="flex-1">
                            <div className="flex items-center gap-1 sm:gap-2">
                                {index > 0 ? (
                                    <motion.div
                                        className="h-0.5 flex-1 rounded-full bg-brand-100"
                                        initial={false}
                                        animate={{
                                            backgroundColor: complete
                                                ? 'var(--color-sun-500)'
                                                : undefined,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-current={
                                        index === step ? 'step' : undefined
                                    }
                                    aria-label={`${item.name}${complete ? ' (complete)' : ''}`}
                                    className={[
                                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-200',
                                        index === step
                                            ? 'bg-brand-700 text-brand-50'
                                            : complete
                                              ? 'bg-sun-500 text-brand-950'
                                              : 'bg-brand-100 text-brand-500 hover:bg-brand-200',
                                    ].join(' ')}
                                >
                                    {complete ? (
                                        <Check
                                            aria-hidden="true"
                                            className="h-3.5 w-3.5"
                                        />
                                    ) : (
                                        item.step
                                    )}
                                </button>
                            </div>
                            <span className="mt-1.5 hidden text-[10px] font-medium text-brand-500 sm:block">
                                {item.name}
                            </span>
                        </li>
                    );
                })}
            </ol>

            <form onSubmit={submit} className="mt-6">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial={reduced ? false : 'enter'}
                        animate="center"
                        exit={reduced ? undefined : 'exit'}
                        transition={{ duration: 0.3, ease: siteEase }}
                        aria-live="polite"
                    >
                        {step === 0 ? (
                            <div className="space-y-4">
                                <p className="text-sm text-brand-600">
                                    Start by giving the case a clear,
                                    descriptive title.
                                </p>
                                <SiteInput
                                    name="title"
                                    label="Case title"
                                    placeholder="e.g. School fees support for a secondary school student"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData('title', event.target.value)
                                    }
                                    error={
                                        errors.title ??
                                        (stepErrors[0]?.length
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                            </div>
                        ) : null}

                        {step === 1 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <SiteInput
                                    name="nominee_name"
                                    label="Nominee name"
                                    value={data.nominee_name}
                                    onChange={(event) =>
                                        setData(
                                            'nominee_name',
                                            event.target.value,
                                        )
                                    }
                                    error={
                                        errors.nominee_name ??
                                        (stepErrors[1]?.includes('nominee_name')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteSelect
                                    name="age_range"
                                    label="Age range"
                                    options={ageRanges}
                                    placeholder="Select an age range"
                                    value={data.age_range}
                                    onChange={(event) =>
                                        setData('age_range', event.target.value)
                                    }
                                    error={
                                        errors.age_range ??
                                        (stepErrors[1]?.includes('age_range')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteSelect
                                    name="gender"
                                    label="Gender"
                                    options={caseFieldOptions.genders}
                                    placeholder="Select gender"
                                    value={data.gender}
                                    onChange={(event) =>
                                        setData('gender', event.target.value)
                                    }
                                    error={
                                        errors.gender ??
                                        (stepErrors[1]?.includes('gender')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteInput
                                    name="location"
                                    label="Location"
                                    placeholder="e.g. Mukuyu, Kakamega"
                                    value={data.location}
                                    onChange={(event) =>
                                        setData('location', event.target.value)
                                    }
                                    error={
                                        errors.location ??
                                        (stepErrors[1]?.includes('location')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteInput
                                    name="phone"
                                    label="Phone number"
                                    placeholder="+254 7?? ??? ???"
                                    value={data.phone}
                                    onChange={(event) =>
                                        setData('phone', event.target.value)
                                    }
                                    error={
                                        errors.phone ??
                                        (stepErrors[1]?.includes('phone')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                            </div>
                        ) : null}

                        {step === 2 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <SiteTextarea
                                        name="challenge"
                                        label="Describe the challenge"
                                        rows={5}
                                        placeholder="Explain the situation and why support is needed…"
                                        value={data.challenge}
                                        onChange={(event) =>
                                            setData(
                                                'challenge',
                                                event.target.value,
                                            )
                                        }
                                        error={
                                            errors.challenge ??
                                            (stepErrors[2]?.includes(
                                                'challenge',
                                            )
                                                ? 'This field is required.'
                                                : undefined)
                                        }
                                        required
                                    />
                                </div>
                                <SiteSelect
                                    name="category"
                                    label="Category"
                                    options={categories}
                                    placeholder="Select a category"
                                    value={data.category}
                                    onChange={(event) =>
                                        setData('category', event.target.value)
                                    }
                                    error={
                                        errors.category ??
                                        (stepErrors[2]?.includes('category')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteSelect
                                    name="tag"
                                    label="Tag (optional)"
                                    options={tags}
                                    placeholder="No tag"
                                    value={data.tag}
                                    onChange={(event) =>
                                        setData('tag', event.target.value)
                                    }
                                    error={errors.tag}
                                />
                                <SiteSelect
                                    name="support_type"
                                    label="Type of support"
                                    options={caseFieldOptions.supportTypes.map(
                                        (option) => option.label,
                                    )}
                                    value={
                                        caseFieldOptions.supportTypes.find(
                                            (option) =>
                                                option.value ===
                                                data.support_type,
                                        )?.label ?? ''
                                    }
                                    onChange={(event) => {
                                        const match =
                                            caseFieldOptions.supportTypes.find(
                                                (option) =>
                                                    option.label ===
                                                    event.target.value,
                                            );
                                        if (match) {
                                            setData(
                                                'support_type',
                                                match.value,
                                            );
                                        }
                                    }}
                                    error={
                                        errors.support_type ??
                                        (stepErrors[2]?.includes('support_type')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteInput
                                    name="amount_needed"
                                    label="Amount needed (KES)"
                                    type="number"
                                    min={1}
                                    inputMode="numeric"
                                    placeholder="e.g. 15000"
                                    value={data.amount_needed}
                                    onChange={(event) =>
                                        setData(
                                            'amount_needed',
                                            event.target.value,
                                        )
                                    }
                                    error={errors.amount_needed}
                                />
                            </div>
                        ) : null}

                        {step === 3 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <SiteInput
                                    name="nominator_name"
                                    label="Your name"
                                    value={data.nominator_name}
                                    onChange={(event) =>
                                        setData(
                                            'nominator_name',
                                            event.target.value,
                                        )
                                    }
                                    error={
                                        errors.nominator_name ??
                                        (stepErrors[3]?.includes(
                                            'nominator_name',
                                        )
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteSelect
                                    name="relationship"
                                    label="Relationship to nominee"
                                    options={caseFieldOptions.relationships}
                                    placeholder="Select relationship"
                                    value={data.relationship}
                                    onChange={(event) =>
                                        setData(
                                            'relationship',
                                            event.target.value,
                                        )
                                    }
                                    error={
                                        errors.relationship ??
                                        (stepErrors[3]?.includes('relationship')
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteInput
                                    name="nominator_phone"
                                    label="Your phone (optional)"
                                    value={data.nominator_phone}
                                    onChange={(event) =>
                                        setData(
                                            'nominator_phone',
                                            event.target.value,
                                        )
                                    }
                                    error={errors.nominator_phone}
                                />
                                <SiteInput
                                    name="nominator_email"
                                    label="Your email"
                                    type="email"
                                    value={data.nominator_email}
                                    onChange={(event) =>
                                        setData(
                                            'nominator_email',
                                            event.target.value,
                                        )
                                    }
                                    error={
                                        errors.nominator_email ??
                                        (stepErrors[3]?.includes(
                                            'nominator_email',
                                        )
                                            ? 'This field is required.'
                                            : undefined)
                                    }
                                    required
                                />
                            </div>
                        ) : null}

                        {step === 4 ? (
                            <div className="space-y-4">
                                <p className="text-sm text-brand-600">
                                    Please confirm the following before we
                                    receive your case.
                                </p>
                                <SiteCheckbox
                                    name="consent_accuracy"
                                    label="I confirm the information provided is accurate to the best of my knowledge."
                                    checked={data.consent_accuracy}
                                    onChange={(event) =>
                                        setData(
                                            'consent_accuracy',
                                            event.target.checked,
                                        )
                                    }
                                    error={
                                        errors.consent_accuracy ??
                                        (stepErrors[4]?.includes(
                                            'consent_accuracy',
                                        )
                                            ? 'This confirmation is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteCheckbox
                                    name="consent_nominee"
                                    label="The nominee is aware that this case is being submitted on their behalf."
                                    checked={data.consent_nominee}
                                    onChange={(event) =>
                                        setData(
                                            'consent_nominee',
                                            event.target.checked,
                                        )
                                    }
                                    error={
                                        errors.consent_nominee ??
                                        (stepErrors[4]?.includes(
                                            'consent_nominee',
                                        )
                                            ? 'This confirmation is required.'
                                            : undefined)
                                    }
                                    required
                                />
                                <SiteCheckbox
                                    name="consent_story"
                                    label="I understand that if this case is published, the story may be shared publicly to raise support."
                                    checked={data.consent_story}
                                    onChange={(event) =>
                                        setData(
                                            'consent_story',
                                            event.target.checked,
                                        )
                                    }
                                    error={
                                        errors.consent_story ??
                                        (stepErrors[4]?.includes(
                                            'consent_story',
                                        )
                                            ? 'This confirmation is required.'
                                            : undefined)
                                    }
                                    required
                                />
                            </div>
                        ) : null}

                        {step === 5 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <span className="mb-1.5 block text-sm font-medium text-brand-800">
                                        Photos (optional)
                                    </span>
                                    <label
                                        htmlFor="case-images"
                                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-200 bg-cream px-4 py-8 text-center transition-colors duration-150 hover:border-sun-400"
                                    >
                                        <ImagePlus
                                            aria-hidden="true"
                                            className="h-8 w-8 text-brand-400"
                                        />
                                        <span className="mt-2 text-sm font-medium text-brand-700">
                                            Click to add up to {maxImages}{' '}
                                            photos
                                        </span>
                                        <span className="text-xs text-brand-500">
                                            JPG, PNG or WebP · 5 MB each
                                        </span>
                                    </label>
                                    <input
                                        id="case-images"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        multiple
                                        className="sr-only"
                                        onChange={(event) => {
                                            addFiles(event.target.files);
                                            event.target.value = '';
                                        }}
                                    />

                                    <div aria-live="polite">
                                        {stepErrors[5] &&
                                        stepErrors[5].length > 0 ? (
                                            <ul className="mt-2 space-y-0.5 text-xs font-medium text-red-700">
                                                {stepErrors[5].map(
                                                    (message) => (
                                                        <li key={message}>
                                                            {message}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : null}
                                    </div>

                                    {data.images.length > 0 ? (
                                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {data.images.map((file, index) => (
                                                <div
                                                    key={`${file.name}-${index}`}
                                                    className="relative"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file,
                                                        )}
                                                        alt={`Preview ${index + 1}`}
                                                        className="h-28 w-full rounded-xl object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeImage(index)
                                                        }
                                                        aria-label={`Remove image ${index + 1}`}
                                                        className="absolute top-1.5 right-1.5 rounded-full bg-brand-950/70 p-1 text-brand-50 hover:bg-brand-950"
                                                    >
                                                        <X
                                                            aria-hidden="true"
                                                            className="h-3.5 w-3.5"
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="sm:col-span-2">
                                    <SiteInput
                                        name="video_url"
                                        label="Video link (optional)"
                                        placeholder="https://…"
                                        value={data.video_url}
                                        onChange={(event) =>
                                            setData(
                                                'video_url',
                                                event.target.value,
                                            )
                                        }
                                        error={errors.video_url}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {step === 6 ? (
                            <div className="space-y-4">
                                <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                                    <FieldRow
                                        label="Title"
                                        value={data.title}
                                    />
                                    <FieldRow
                                        label="Nominee"
                                        value={data.nominee_name}
                                    />
                                    <FieldRow
                                        label="Location"
                                        value={`${data.location} · ${data.age_range} · ${data.gender}`}
                                    />
                                    <FieldRow
                                        label="Support"
                                        value={data.category}
                                    />
                                    <FieldRow
                                        label="Nominator"
                                        value={`${data.nominator_name} (${data.relationship})`}
                                    />
                                    <FieldRow
                                        label="Contact"
                                        value={data.nominator_email}
                                    />
                                </dl>
                                <p className="rounded-xl bg-cream p-4 text-sm leading-relaxed text-brand-700">
                                    {data.challenge}
                                </p>
                                <p className="text-sm text-brand-600">
                                    Our team will review the case and verify
                                    before deciding whether to publish it. There
                                    is no guarantee of assistance.
                                </p>
                            </div>
                        ) : null}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex items-center justify-between border-t border-brand-100 pt-5">
                    <SiteButton
                        type="button"
                        variant="outline"
                        disabled={step === 0}
                        onClick={() => goTo(step - 1)}
                    >
                        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                        Back
                    </SiteButton>

                    {step < steps.length - 1 ? (
                        <SiteButton
                            type="button"
                            variant="brand"
                            onClick={() => goTo(step + 1)}
                            aria-label={`Continue to ${steps[step + 1].name}`}
                        >
                            Continue
                            <ChevronRight
                                aria-hidden="true"
                                className="h-4 w-4"
                            />
                        </SiteButton>
                    ) : (
                        <SiteButton type="submit" disabled={processing}>
                            {processing ? 'Submitting…' : 'Submit case'}
                        </SiteButton>
                    )}
                </div>
            </form>
        </div>
    );
}

function FieldRow({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-xs font-semibold tracking-wide text-brand-400 uppercase">
                {label}
            </dt>
            <dd className="mt-0.5 font-medium text-brand-900">
                {value || '—'}
            </dd>
        </div>
    );
}
