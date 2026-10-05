"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ShortlistPreview } from "@/components/marketing/shortlist-card";
import type { SampleShortlist } from "@/content/sample-shortlists";
import { cn } from "@/lib/utils/cn";

/**
 * Hero visual: pick a role family, see the matching sample shortlist.
 * WAI-ARIA tabs pattern (roving tabindex, arrow keys, Home/End).
 */
export function HeroShortlist({
  shortlists,
  families,
}: {
  shortlists: SampleShortlist[];
  families: { slug: string; name: string }[];
}) {
  const tabs = families.filter((f) => shortlists.some((s) => s.family === f.slug));
  const [active, setActive] = useState(tabs[0]?.slug);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const current = shortlists.find((s) => s.family === active) ?? shortlists[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowLeft"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].slug);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sample shortlist by role family"
        className="mb-4 flex flex-wrap gap-1.5"
      >
        {tabs.map((t, i) => {
          const selected = t.slug === current.family;
          return (
            <button
              key={t.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${id}-tab-${t.slug}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.slug)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "min-h-9 rounded-full px-3.5 text-[13px] font-medium transition-colors",
                selected
                  ? "bg-ink text-white"
                  : "bg-surface text-muted hover:text-ink border-line border",
              )}
            >
              {t.name}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${current.family}`}>
        <div key={current.family} className="animate-[fade-in_250ms_ease-out]">
          <ShortlistPreview shortlist={current} />
        </div>
        <p className="text-muted mt-4 text-center text-sm">
          <Link
            href={`/sample-shortlist?family=${current.family}`}
            className="hover:text-ink underline underline-offset-4"
          >
            Open the full {tabs.find((t) => t.slug === current.family)?.name} sample dossier
          </Link>
        </p>
      </div>
    </div>
  );
}
