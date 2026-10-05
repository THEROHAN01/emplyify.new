import { cn } from "@/lib/utils/cn";

export interface PipelineStep {
  label: string;
  /** SLA or timestamp shown under the label, e.g. "Within 4 business hours". */
  detail?: string;
  /** Optional longer description (plan mode). */
  body?: string;
}

/**
 * Status tracker: done → current → upcoming. Horizontal from md up, vertical on
 * phones. State is conveyed by icon + text (not colour alone) and announced via
 * aria-current="step".
 */
export function PipelineTracker({
  steps,
  current = -1,
  label,
  className,
  mode = "status",
  orientation = "responsive",
}: {
  steps: PipelineStep[];
  /** Index of the active step; -1 shows every step as upcoming. Ignored in "plan" mode. */
  current?: number;
  label: string;
  className?: string;
  /** "status": done/current/upcoming. "plan": a neutral numbered timeline (no progress implied). */
  mode?: "status" | "plan";
  /** "responsive": vertical on phones, horizontal from md. "vertical": always stacked (narrow containers). */
  orientation?: "responsive" | "vertical";
}) {
  const h = orientation === "responsive";
  return (
    <ol
      aria-label={label}
      className={cn("grid gap-0", h && "md:auto-cols-fr md:grid-flow-col", className)}
    >
      {steps.map((s, i) => {
        const state =
          mode === "plan" ? "plan" : i < current ? "done" : i === current ? "current" : "upcoming";
        const last = i === steps.length - 1;
        return (
          <li
            key={s.label}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "relative flex gap-4 pb-8 last:pb-0",
              h && "md:flex-col md:gap-3 md:pr-4 md:pb-0",
            )}
          >
            {/* connector */}
            {!last && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-8 bottom-0 left-[15px] w-0.5",
                  h && "md:top-[15px] md:right-0 md:bottom-auto md:left-8 md:h-0.5 md:w-auto",
                  mode === "status" && i < current ? "bg-ink" : "bg-line",
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                state === "done" && "bg-ink text-white",
                state === "current" && "bg-accent ring-accent-soft text-white ring-4",
                state === "upcoming" && "border-line bg-surface text-muted border-2",
                state === "plan" && "bg-ink text-white",
              )}
            >
              {state === "done" ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="m3 7.3 2.6 2.6L11 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <div className={cn("min-w-0 pt-1", h && "md:pt-0")}>
              <p className={cn("font-semibold", state === "upcoming" && "text-muted")}>
                {s.label}
                <span className="sr-only">
                  {state === "done"
                    ? " (done)"
                    : state === "current"
                      ? " (current step)"
                      : " (upcoming)"}
                </span>
              </p>
              {s.detail && (
                <p
                  className={cn(
                    "mt-0.5 text-sm",
                    state === "plan" ? "text-accent font-semibold" : "text-muted",
                  )}
                >
                  {s.detail}
                </p>
              )}
              {s.body && <p className="text-muted mt-2 text-[15px]">{s.body}</p>}
              {state === "current" && (
                <p className="text-accent mt-1 text-sm font-semibold">In progress</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
