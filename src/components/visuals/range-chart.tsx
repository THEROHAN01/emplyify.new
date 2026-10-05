"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface RangeRow {
  label: string;
  sub?: string;
  min: number;
  max: number;
}

export interface RangeGroup {
  id: string;
  label: string;
  rows: RangeRow[];
}

const niceMax = (v: number) => {
  const step = v > 60 ? 20 : 10;
  return Math.ceil(v / step) * step;
};

/**
 * Horizontal range bars on one shared axis (e.g. salary bands in ₹ LPA).
 * Single hue; a segmented control switches groups (cities) instead of
 * overlaying colours. Each bar is focusable and shows a tooltip; the full
 * data is always available as a table.
 */
export function RangeChart({
  groups,
  unit = "LPA",
  title,
  caption,
  toggleLabel = "Choose a city",
}: {
  groups: RangeGroup[];
  unit?: string;
  title: string;
  caption?: string;
  toggleLabel?: string;
}) {
  const [active, setActive] = useState(groups[0]?.id);
  const [hover, setHover] = useState<number | null>(null);
  const id = useId();
  const group = groups.find((g) => g.id === active) ?? groups[0];
  // Axis is shared across groups so switching cities doesn't rescale the bars.
  const max = niceMax(Math.max(...groups.flatMap((g) => g.rows.map((r) => r.max))));
  const step = max > 60 ? 20 : 10;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const pct = (v: number) => `${(v / max) * 100}%`;
  const fmt = (r: RangeRow) => `₹${r.min}–${r.max} ${unit}`;

  return (
    <figure
      className="border-line bg-surface rounded-2xl border p-6 sm:p-8"
      aria-labelledby={`${id}-title`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <figcaption id={`${id}-title`} className="text-lg font-bold">
          {title}
          {groups.length === 1 && <span className="text-muted font-normal"> · {group.label}</span>}
        </figcaption>
        {groups.length > 1 && (
          <div
            role="group"
            aria-label={toggleLabel}
            className="bg-bg inline-flex self-start rounded-full p-1"
          >
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={g.id === group.id}
                onClick={() => setActive(g.id)}
                className={cn(
                  "min-h-9 rounded-full px-4 text-sm font-medium transition-colors",
                  g.id === group.id ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        {group.rows.map((r, i) => (
          <div
            key={r.label}
            className="grid grid-cols-[7.5rem_1fr] items-center gap-4 py-3 sm:grid-cols-[10rem_1fr]"
          >
            <div>
              <p className="text-sm font-semibold">{r.label}</p>
              {r.sub && <p className="text-muted text-xs">{r.sub}</p>}
            </div>
            <div className="relative h-8">
              {/* recessive gridlines */}
              {ticks.map((t) => (
                <span
                  key={t}
                  aria-hidden
                  className="bg-line absolute inset-y-0 w-px"
                  style={{ left: pct(t) }}
                />
              ))}
              <button
                type="button"
                className="bg-accent hover:bg-accent-hover focus-visible:ring-accent/40 absolute top-1/2 h-3 -translate-y-1/2 rounded-[4px] transition-[left,width,background-color] duration-300 ease-out focus-visible:ring-4 focus-visible:outline-none"
                style={{ left: pct(r.min), width: `calc(${pct(r.max - r.min)} - 0px)` }}
                aria-label={`${r.label}${r.sub ? `, ${r.sub}` : ""}: ${fmt(r)} in ${group.label}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
              >
                {/* enlarged hit target */}
                <span aria-hidden className="absolute inset-x-0 -inset-y-3" />
              </button>
              {/* direct label at bar end (text colour, not series colour) */}
              <span
                aria-hidden
                className="tabular text-ink pointer-events-none absolute top-1/2 -translate-y-1/2 text-xs font-semibold whitespace-nowrap transition-[left] duration-300"
                style={
                  // Near the right edge, put the label before the bar instead of after it.
                  r.max / max > 0.8
                    ? { right: `calc(${pct(max - r.min)} + 0.5rem)` }
                    : { left: `calc(${pct(r.max)} + 0.5rem)` }
                }
              >
                {r.min}–{r.max}
              </span>
              {hover === i && (
                <div
                  role="tooltip"
                  className="bg-navy pointer-events-none absolute bottom-full z-10 mb-2 -translate-x-1/2 rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg"
                  style={{ left: pct((r.min + r.max) / 2) }}
                >
                  <p className="font-semibold">{fmt(r)}</p>
                  <p className="text-white/70">
                    {r.label}
                    {r.sub ? ` · ${r.sub}` : ""} · {group.label} · midpoint ₹
                    {Math.round((r.min + r.max) / 2)} {unit}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* axis */}
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 sm:grid-cols-[10rem_1fr]" aria-hidden>
          <span />
          <div className="text-muted relative h-5 text-xs">
            {ticks.map((t) => (
              <span key={t} className="tabular absolute -translate-x-1/2" style={{ left: pct(t) }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-muted mt-1 text-right text-xs" aria-hidden>
          ₹ {unit}, fixed annual CTC
        </p>
      </div>

      <details className="border-line mt-6 border-t pt-4">
        <summary className="text-accent cursor-pointer text-sm font-semibold">
          Show as table
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-line border-b">
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Level
                </th>
                {groups.map((g) => (
                  <th key={g.id} scope="col" className="py-2 pr-4 font-semibold">
                    {g.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.rows.map((r, i) => (
                <tr key={r.label} className="border-line border-b last:border-0">
                  <th scope="row" className="py-2 pr-4 font-medium">
                    {r.label} {r.sub && <span className="text-muted font-normal">({r.sub})</span>}
                  </th>
                  {groups.map((g) => (
                    <td key={g.id} className="tabular py-2 pr-4">
                      {fmt(g.rows[i])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      {caption && <p className="text-muted mt-4 text-xs">{caption}</p>}
    </figure>
  );
}
