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
  neutral: "bg-bg text-muted border border-line",
};

const icons: Partial<Record<Tone, string>> = { verified: "✓", ai: "✦", sla: "⏱" };

export function Badge({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold", tones[tone], className)}>
      {icons[tone] && <span aria-hidden>{icons[tone]}</span>}
      {children}
    </span>
  );
}
