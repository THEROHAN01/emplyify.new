import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "verified" | "sla" | "ai" | "new" | "pending" | "neutral" | "draft";

const tones: Record<Tone, string> = {
  verified: "bg-signal-bg text-signal",
  sla: "bg-accent-soft text-accent",
  ai: "bg-accent-soft text-accent",
  new: "bg-accent text-accent-ink",
  pending: "bg-warn-bg text-warn",
  draft: "bg-warn-bg text-warn",
  neutral: "bg-bg text-ink",
};

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="shrink-0">
      <path
        d="M2.5 6.2 5 8.5l4.5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-medium",
        tones[tone],
        className,
      )}
    >
      {tone === "verified" && <Check />}
      {children}
    </span>
  );
}
