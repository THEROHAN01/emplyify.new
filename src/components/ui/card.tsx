import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("border-line bg-surface rounded-[12px] border p-6", className)}>
      {children}
    </div>
  );
}

/** Whole-card link with a single accessible name (the title). */
export function LinkCard({
  href,
  title,
  children,
  meta,
  className,
}: {
  href: string;
  title: string;
  children?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group border-line bg-surface hover:border-accent relative flex h-full flex-col rounded-[12px] border p-6 transition-colors duration-200",
        className,
      )}
    >
      {meta && <div className="mb-3">{meta}</div>}
      <h3 className="text-lg font-bold">
        <Link
          href={href}
          className="group-focus-within:underline after:absolute after:inset-0 after:rounded-[12px] focus-visible:outline-none"
        >
          {title}
        </Link>
      </h3>
      {children && <div className="text-muted mt-2 flex-1">{children}</div>}
      <span aria-hidden className="text-accent mt-4 text-sm font-semibold">
        Learn more →
      </span>
    </div>
  );
}
