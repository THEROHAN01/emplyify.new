import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 min-h-11";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-line bg-surface text-ink hover:border-ink",
  ghost: "text-ink hover:bg-bg",
  link: "min-h-0 px-0 text-accent underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
