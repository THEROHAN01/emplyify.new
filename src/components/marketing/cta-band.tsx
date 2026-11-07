import Link from "next/link";
import type { ReactNode } from "react";
import { PeopleRing } from "@/components/visuals/people-ring";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas, site } from "@/content/site";
import { IconTile, type IconName } from "@/components/ui/icons";

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className={`shrink-0 ${className}`}>
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M6 10.3 8.7 13 14 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FinalCta({
  title = "Share a role. Get a shortlist.",
  body = `Screened candidates in 72 hours. Pay only when the hire joins, with a ${site.promises.replacementDays}-day free replacement.`,
  primary = ctas.submitRole,
  secondary = ctas.bookCall,
  children,
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="final-cta"
      className="bg-navy relative isolate overflow-hidden px-5 pt-20 pb-32 text-white md:px-10 md:py-28 lg:py-40"
    >
      <PeopleRing
        mono="rgba(255,255,255,0.18)"
        size={720}
        className="pointer-events-none absolute -bottom-96 -left-72 -z-10"
      />
      <div className="mx-auto max-w-4xl text-center">
        <p className="label text-white/80">{site.tagline}</p>
        <h2 id="final-cta" className="mt-6 text-[2.75rem] sm:text-6xl lg:text-[5.5rem]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">{body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primary.href} size="lg">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink
              href={secondary.href}
              size="lg"
              variant="secondary"
              className="border-white/40 text-white hover:border-white"
            >
              {secondary.label}
            </ButtonLink>
          )}
        </div>
        <p className="mt-10">
          <Link
            href={ctas.joinNetwork.href}
            className="label text-white/80 underline underline-offset-4 hover:text-white"
          >
            Looking for work? {ctas.joinNetwork.label}
          </Link>
        </p>
        {children}
      </div>
    </section>
  );
}

const candidatePromises: [IconName, string, string][] = [
  ["rupee", "Salary band on every role", "Decide before the first conversation."],
  ["noCall", "No spam calls", "First contact is email or WhatsApp. Calls only in slots you book."],
  [
    "clock",
    `An update within ${site.promises.candidateUpdateBusinessDays} business days`,
    "At every stage, with a reason for every outcome.",
  ],
  ["target", "Prep for the real interview", "Practice questions tied to the role you applied for."],
];

export function CandidateBand() {
  return (
    <section aria-labelledby="candidate-band" className="py-16 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-accent mb-4 text-sm font-semibold">For job seekers</p>
            <h2 id="candidate-band" className="text-3xl font-bold sm:text-[2.5rem]">
              Get matched, prepped and kept in the loop.
            </h2>
            <p className="text-muted mt-5 max-w-lg text-lg">
              Looking for your next role? We treat you as a peer, not a CV in a pile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={ctas.joinNetwork.href}>{ctas.joinNetwork.label}</ButtonLink>
              <ButtonLink href={ctas.browseRoles.href} variant="secondary">
                {ctas.browseRoles.label}
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {candidatePromises.map(([icon, t, d]) => (
              <li key={t}>
                <IconTile name={icon} tone="ink" />
                <p className="mt-3 font-semibold">{t}</p>
                <p className="text-muted mt-1">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
