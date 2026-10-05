import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas, site } from "@/content/site";

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
  title = "Have a role open? Get a shortlist this week.",
  body = `Pay only when you hire. ${site.promises.replacementDays}-day free replacement. Published pricing.`,
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
    <section aria-labelledby="final-cta" className="py-16 lg:py-24">
      <Container>
        <div className="bg-navy rounded-3xl px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h2 id="final-cta" className="text-3xl font-bold sm:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/75">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink
                  href={secondary.href}
                  size="lg"
                  variant="secondary"
                  className="border-white/25 bg-transparent text-white hover:border-white"
                >
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

const candidatePromises = [
  ["Salary band on every role", "Decide before the first conversation."],
  ["No spam calls", "First contact is email or WhatsApp. Calls only in slots you book."],
  [
    `An update within ${site.promises.candidateUpdateBusinessDays} business days`,
    "At every stage, with a reason for every outcome.",
  ],
  ["Prep for the real interview", "Practice questions tied to the role you applied for."],
];

export function CandidateBand() {
  return (
    <section aria-labelledby="candidate-band" className="py-16 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-accent mb-4 text-sm font-semibold">For engineers</p>
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
            {candidatePromises.map(([t, d]) => (
              <li key={t}>
                <CheckIcon className="text-signal" />
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
