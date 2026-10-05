import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[12px] border border-line bg-surface p-6", className)}>{children}</div>;
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
        "group relative flex h-full flex-col rounded-[12px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-accent",
        className,
      )}
    >
      {meta && <div className="mb-3">{meta}</div>}
      <h3 className="text-lg font-bold">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-[12px] focus-visible:outline-none group-focus-within:underline">
          {title}
        </Link>
      </h3>
      {children && <div className="mt-2 flex-1 text-muted">{children}</div>}
      <span aria-hidden className="mt-4 text-sm font-semibold text-accent">
        Learn more →
      </span>
    </div>
  );
}
