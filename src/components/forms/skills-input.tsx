"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils/cn";

/** Chip input for must-have skills. Enter or comma adds; Backspace on empty removes last. */
export function SkillsInput({
  id,
  label,
  value,
  onChange,
  suggestions = [],
  error,
  hint,
  max = 12,
}: {
  id: string;
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  suggestions?: string[];
  error?: string;
  hint?: string;
  max?: number;
}) {
  const [draft, setDraft] = useState("");
  const listId = useId();

  const add = (raw: string) => {
    const skill = raw.trim().replace(/,$/, "");
    if (!skill || value.length >= max) return;
    if (value.some((v) => v.toLowerCase() === skill.toLowerCase())) return;
    onChange([...value, skill]);
    setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const remaining = suggestions
    .filter((s) => !value.some((v) => v.toLowerCase() === s.toLowerCase()))
    .slice(0, 8);

  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <div
        className={cn(
          "bg-surface focus-within:border-accent focus-within:ring-accent/30 mt-1.5 flex min-h-11 flex-wrap items-center gap-2 rounded-lg border px-2 py-1.5 focus-within:ring-2",
          error ? "border-red-600" : "border-line",
        )}
      >
        <ul className="contents" aria-label="Selected skills">
          {value.map((s) => (
            <li
              key={s}
              className="bg-accent-soft text-accent flex items-center gap-1 rounded-full py-0.5 pr-1 pl-3 text-sm font-semibold"
            >
              {s}
              <button
                type="button"
                onClick={() => onChange(value.filter((v) => v !== s))}
                className="hover:bg-accent/15 flex size-7 items-center justify-center rounded-full"
                aria-label={`Remove ${s}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <input
          id={id}
          value={draft}
          onChange={(e) =>
            e.target.value.endsWith(",") ? add(e.target.value) : setDraft(e.target.value)
          }
          onKeyDown={onKeyDown}
          onBlur={() => draft && add(draft)}
          list={listId}
          placeholder={value.length ? "Add another" : "Type a skill and press Enter"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="placeholder:text-muted/80 min-w-40 flex-1 bg-transparent px-1 py-1 outline-none"
        />
        <datalist id={listId}>
          {remaining.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </div>
      {remaining.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2" aria-label="Suggested skills">
          {remaining.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="border-line text-muted hover:border-accent hover:text-accent min-h-9 rounded-full border border-dashed px-3 text-sm"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-muted mt-1 text-sm">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
