import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Small square with a north-east arrow, used beside uppercase links. */
export function ArrowBox({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center",
        inverted ? "bg-white text-accent" : "bg-accent text-white",
        className,
      )}
    >
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("border-line bg-surface rounded-2xl border p-6", className)}>{children}</div>
  );
}

/** Whole-card link with a single accessible name (the title). */
export function LinkCard({
  href,
  title,
  children,
  meta,
  icon,
  className,
}: {
  href: string;
  title: string;
  children?: ReactNode;
  meta?: ReactNode;
  /** Optional visual anchor (e.g. <IconTile />) shown above the title. */
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group border-line bg-surface hover:border-ink/20 relative flex h-full flex-col rounded-2xl border p-6 transition-[border-color,box-shadow] duration-200 hover:shadow-[0_12px_32px_-16px_rgba(11,27,51,0.25)]",
        className,
      )}
    >
      {icon && <div className="mb-5">{icon}</div>}
      {meta && <div className="mb-3">{meta}</div>}
      <h3 className="text-2xl">
        <Link
          href={href}
          className="group-focus-within:underline after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {title}
        </Link>
      </h3>
      {children && <div className="text-muted mt-2 flex-1">{children}</div>}
      <span aria-hidden className="label text-accent mt-6 flex items-center gap-2">
        Learn more <ArrowBox />
      </span>
    </div>
  );
}
