import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteEase } from '@/site/motion';

const fieldClasses =
    'w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-400 shadow-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand-500 focus:ring-2 focus:ring-brand-600/25 disabled:opacity-60';

function FieldError({ message }: { message?: string }) {
    return (
        <div aria-live="polite">
            <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: siteEase }}
                className="mt-1 text-xs font-medium text-red-700"
            >
                {message}
            </motion.p>
        </div>
    );
}

interface FieldBaseProps {
    label?: string;
    error?: string;
    hint?: string;
    id?: string;
    required?: boolean;
}

interface SiteInputProps
    extends
        FieldBaseProps,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {}

export function SiteInput({
    label,
    error,
    hint,
    id,
    required,
    className,
    ...props
}: SiteInputProps) {
    const inputId = id ?? props.name;

    return (
        <div className="w-full">
            {label ? (
                <label
                    htmlFor={inputId}
                    className="mb-1.5 block text-sm font-medium text-brand-800"
                >
                    {label}
                    {required ? <span className="text-red-600"> *</span> : null}
                </label>
            ) : null}
            <input
                id={inputId}
                aria-invalid={error ? true : undefined}
                className={cn(
                    fieldClasses,
                    error && 'border-red-400',
                    className,
                )}
                {...props}
            />
            {hint && !error ? (
                <p className="mt-1 text-xs text-brand-500">{hint}</p>
            ) : null}
            <FieldError message={error} />
        </div>
    );
}

interface SiteTextareaProps
    extends
        FieldBaseProps,
        Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {}

export function SiteTextarea({
    label,
    error,
    hint,
    id,
    required,
    className,
    ...props
}: SiteTextareaProps) {
    const inputId = id ?? props.name;

    return (
        <div className="w-full">
            <label
                htmlFor={inputId}
                className="mb-1.5 block text-sm font-medium text-brand-800"
            >
                {label}
                {required ? <span className="text-red-600"> *</span> : null}
            </label>
            <textarea
                id={inputId}
                aria-invalid={error ? true : undefined}
                className={cn(
                    fieldClasses,
                    error && 'border-red-400',
                    className,
                )}
                {...props}
            />
            {hint && !error ? (
                <p className="mt-1 text-xs text-brand-500">{hint}</p>
            ) : null}
            <FieldError message={error} />
        </div>
    );
}

interface SiteSelectProps
    extends
        FieldBaseProps,
        Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
    options: readonly string[];
    placeholder?: string;
}

export function SiteSelect({
    label,
    error,
    hint,
    id,
    required,
    options,
    placeholder,
    className,
    ...props
}: SiteSelectProps) {
    const inputId = id ?? props.name;

    return (
        <div className="w-full">
            <label
                htmlFor={inputId}
                className="mb-1.5 block text-sm font-medium text-brand-800"
            >
                {label}
                {required ? <span className="text-red-600"> *</span> : null}
            </label>
            <select
                id={inputId}
                aria-invalid={error ? true : undefined}
                className={cn(
                    fieldClasses,
                    'appearance-none pr-9',
                    props.value === '' && 'text-brand-400',
                    error && 'border-red-400',
                    className,
                )}
                {...props}
            >
                {placeholder ? <option value="">{placeholder}</option> : null}
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                        className="text-brand-900"
                    >
                        {option}
                    </option>
                ))}
            </select>
            {hint && !error ? (
                <p className="mt-1 text-xs text-brand-500">{hint}</p>
            ) : null}
            <FieldError message={error} />
        </div>
    );
}

interface SiteCheckboxProps
    extends
        FieldBaseProps,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {}

export function SiteCheckbox({
    label,
    error,
    hint,
    id,
    required,
    className,
    ...props
}: SiteCheckboxProps) {
    const inputId = id ?? props.name;

    return (
        <div className="w-full">
            <label
                htmlFor={inputId}
                className="flex cursor-pointer items-start gap-3"
            >
                <input
                    id={inputId}
                    type="checkbox"
                    aria-invalid={error ? true : undefined}
                    className={cn(
                        'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-brand-300 text-brand-700 accent-brand-700 focus:ring-2 focus:ring-brand-600/25',
                        className,
                    )}
                    {...props}
                />
                <span className="text-sm leading-relaxed text-brand-800">
                    {label}
                    {required ? <span className="text-red-600"> *</span> : null}
                </span>
            </label>
            {hint && !error ? (
                <p className="mt-1 text-xs text-brand-500">{hint}</p>
            ) : null}
            <FieldError message={error} />
        </div>
    );
}
