import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const control =
  "mt-1.5 block w-full min-h-11 rounded-lg border bg-surface px-3 py-2.5 text-base text-ink placeholder:text-muted/80 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  warning?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

/** Label + control + hint/error wiring with aria-describedby. */
export function FieldShell({ id, label, hint, error, warning, optional, children, className }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-semibold">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {warning && !error && (
        <p id={`${id}-warning`} className="mt-1 text-sm text-warn">
          {warning}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, opts: { hint?: unknown; error?: unknown; warning?: unknown }) {
  return (
    [opts.error ? `${id}-error` : null, !opts.error && opts.hint ? `${id}-hint` : null, !opts.error && opts.warning ? `${id}-warning` : null]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

type InputProps = Omit<FieldShellProps, "children"> & ComponentProps<"input">;

export function TextField({ id, label, hint, error, warning, optional, className, ...input }: InputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} warning={warning} optional={optional} className={className}>
      <input
        id={id}
        name={input.name ?? id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error, warning })}
        required={!optional}
        className={cn(control, error ? "border-red-600" : "border-line")}
        {...input}
      />
    </FieldShell>
  );
}

type SelectProps = Omit<FieldShellProps, "children"> &
  ComponentProps<"select"> & { options: readonly (string | { value: string; label: string })[]; placeholder?: string };

export function SelectField({ id, label, hint, error, optional, className, options, placeholder = "Choose…", ...select }: SelectProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <select
        id={id}
        name={select.name ?? id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        required={!optional}
        className={cn(control, error ? "border-red-600" : "border-line")}
        {...select}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </FieldShell>
  );
}

type TextareaProps = Omit<FieldShellProps, "children"> & ComponentProps<"textarea">;

export function TextareaField({ id, label, hint, error, optional, className, ...textarea }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea
        id={id}
        name={textarea.name ?? id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        required={!optional}
        className={cn(control, "min-h-32", error ? "border-red-600" : "border-line")}
        {...textarea}
      />
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  className,
  ...input
}: { id: string; label: ReactNode; error?: string; className?: string } & Omit<ComponentProps<"input">, "type">) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={input.name ?? id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-5 shrink-0 accent-[var(--accent)]"
          {...input}
        />
        <label htmlFor={id} className="text-sm leading-relaxed">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen honeypot. Bots fill it; humans and screen readers skip it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function FormAlert({ tone = "error", children }: { tone?: "error" | "info"; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        tone === "error" ? "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200" : "border-line bg-accent-soft text-ink",
      )}
    >
      {children}
    </div>
  );
}
