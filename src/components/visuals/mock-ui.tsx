import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Shared building blocks for the product-style illustrations (decorative, aria-hidden by callers). */
export function Window({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border-line bg-surface w-full overflow-hidden rounded-2xl border shadow-[0_24px_48px_-28px_rgba(11,27,51,0.35)]">
      <div className="border-line flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-line size-2.5 rounded-full" />
          <span className="bg-line size-2.5 rounded-full" />
          <span className="bg-line size-2.5 rounded-full" />
          <span className="ml-2 text-xs font-semibold">{title}</span>
        </div>
        {badge}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export const Pill = ({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "signal" | "warn";
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
      tone === "neutral" && "bg-bg text-ink",
      tone === "accent" && "bg-accent-soft text-accent",
      tone === "signal" && "bg-signal-bg text-signal",
      tone === "warn" && "bg-warn-bg text-warn",
    )}
  >
    {children}
  </span>
);

export const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-signal shrink-0">
    <path
      d="m3 7.3 2.6 2.6L11 4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
