import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/**
 * Brand lock-up: the round mark plus the EMPLYIFY wordmark cut from the
 * brand-kit logo (never retyped, so the gradient first Y stays intact).
 * `tone="light"` is for dark backgrounds. On the home hero the header swaps
 * to the light wordmark through the .logo-dark / .logo-light classes.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex min-h-11 items-center gap-2.5", className)}
      aria-label="Emplyify home"
    >
      <Image src="/brand/logo-mark.png" alt="" width={35} height={32} />
      <Image
        src="/brand/wordmark.png"
        alt=""
        width={128}
        height={19}
        className={cn("logo-dark h-[19px] w-auto", tone === "light" && "hidden")}
      />
      <Image
        src="/brand/wordmark-white.png"
        alt=""
        width={128}
        height={19}
        className={cn("logo-light h-[19px] w-auto", tone === "dark" && "hidden")}
      />
    </Link>
  );
}
