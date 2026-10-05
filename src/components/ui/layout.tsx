import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Section rhythm: 64px mobile, 96px desktop vertical padding. */
export function Section({
  id,
  className,
  children,
  tone = "default",
  labelledBy,
  as: Tag = "section",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "default" | "surface" | "accent";
  labelledBy?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 lg:py-24",
        tone === "surface" && "border-y border-line bg-surface",
        tone === "accent" && "bg-accent-soft",
        className,
      )}
    >
      <Container>{children}</Container>
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mb-3 text-sm font-semibold uppercase tracking-wider text-accent", className)}>{children}</p>;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}
