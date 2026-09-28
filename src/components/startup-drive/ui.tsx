"use client";

import { cn } from "@/lib/utils/cn";
import type { YesNo } from "@/lib/startup-drive/types";

export const LABEL_CLASS = "block font-sans text-[13px] font-semibold text-[var(--color-ink)]";
export const HINT_CLASS = "mt-1 font-sans text-xs text-[var(--color-ink-soft)]";
export const ERROR_CLASS = "mt-1.5 font-sans text-xs font-medium text-[var(--color-alarm)]";
export const INPUT_CLASS =
  "mt-2 w-full rounded-md border border-[var(--color-line)] bg-white px-3.5 py-2.5 font-sans text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)]";

interface FieldWrapProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FieldWrap({ label, htmlFor, required, error, hint, children }: FieldWrapProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className={LABEL_CLASS}>
        {label}
        {required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
      {hint && !error && <p className={HINT_CLASS}>{hint}</p>}
      {error && (
        <p className={ERROR_CLASS} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  autoComplete?: string;
}

export function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  hint,
  autoComplete,
}: TextFieldProps) {
  return (
    <FieldWrap label={label} htmlFor={name} required={required} error={error} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(INPUT_CLASS, error && "border-[var(--color-alarm)] focus:ring-[var(--color-alarm-soft)]")}
      />
    </FieldWrap>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  rows?: number;
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <FieldWrap label={label} htmlFor={name} required={required} error={error} hint={hint}>
      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
        className={cn(INPUT_CLASS, "resize-none", error && "border-[var(--color-alarm)] focus:ring-[var(--color-alarm-soft)]")}
      />
    </FieldWrap>
  );
}

interface YesNoFieldProps {
  label: string;
  name: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
  required?: boolean;
  error?: string;
}

export function YesNoField({ label, value, onChange, required, error }: YesNoFieldProps) {
  return (
    <FieldWrap label={label} required={required} error={error}>
      <div role="radiogroup" aria-label={label} className="mt-2 flex gap-2.5">
        {(["yes", "no"] as const).map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              className={cn(
                "min-h-[42px] flex-1 rounded-md border px-4 py-2 font-sans text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:flex-none sm:min-w-[96px]",
                active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                error && !active && "border-[var(--color-alarm)]/40"
              )}
            >
              {option === "yes" ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </FieldWrap>
  );
}

interface RadioOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface RadioCardGroupProps<T extends string> {
  label: string;
  name: string;
  value: T | "";
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  required?: boolean;
  error?: string;
}

export function RadioCardGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  required,
  error,
}: RadioCardGroupProps<T>) {
  return (
    <FieldWrap label={label} required={required} error={error}>
      <div role="radiogroup" aria-label={label} className="mt-2 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-md border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                  : "border-[var(--color-line)] bg-white hover:border-[var(--color-accent)]/50"
              )}
            >
              <span
                className={cn(
                  "font-sans text-sm font-semibold",
                  active ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]"
                )}
              >
                {option.label}
              </span>
              {option.description && (
                <span className="mt-0.5 block font-sans text-xs text-[var(--color-ink-soft)]">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </FieldWrap>
  );
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  required?: boolean;
  error?: string;
}

export function CheckboxGroup({
  label,
  name,
  options,
  selected,
  onChange,
  otherValue,
  onOtherChange,
  required,
  error,
}: CheckboxGroupProps) {
  const showOther = selected.includes("Other") && onOtherChange;

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <FieldWrap label={label} required={required} error={error}>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-2.5 font-sans text-sm transition-colors",
                checked
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-semibold"
                  : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]/50"
              )}
            >
              <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={() => toggle(option)}
                className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
              />
              {option}
            </label>
          );
        })}
      </div>
      {showOther && (
        <input
          type="text"
          value={otherValue}
          placeholder="Please specify"
          onChange={(e) => onOtherChange?.(e.target.value)}
          className={cn(INPUT_CLASS, "mt-2.5")}
        />
      )}
    </FieldWrap>
  );
}

export function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-white p-5 sm:p-7">{children}</div>
  );
}

export function ConditionalReveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <div className="mt-3 border-l-2 border-[var(--color-accent)]/30 pl-3.5">{children}</div>;
}
