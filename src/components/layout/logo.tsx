import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2 font-display text-xl font-extrabold tracking-tight" aria-label="Emplyify home">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <rect width="32" height="32" rx="8" fill="var(--accent)" />
        <path d="M10 9h12v3.2h-8.4v2.4h7.4v3.1h-7.4v2.5H22V23H10z" fill="var(--accent-ink)" />
      </svg>
      <span>Emplyify</span>
    </Link>
  );
}
