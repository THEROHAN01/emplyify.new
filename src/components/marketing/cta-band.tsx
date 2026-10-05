import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas, site } from "@/content/site";

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
        <div className="rounded-[20px] bg-ink px-6 py-12 text-center text-bg sm:px-12 lg:py-16">
          <h2 id="final-cta" className="text-2xl font-extrabold sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-80">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" variant="secondary" className="border-transparent">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

export function CandidateBand() {
  return (
    <section aria-labelledby="candidate-band" className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 rounded-[20px] border border-line bg-surface p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">For engineers</p>
            <h2 id="candidate-band" className="text-2xl font-bold sm:text-3xl">
              Get matched, prepped and kept in the loop.
            </h2>
            <p className="mt-4 text-lg text-muted">Looking for your next role? We treat you as a peer, not a CV in a pile.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={ctas.joinNetwork.href}>{ctas.joinNetwork.label}</ButtonLink>
              <ButtonLink href={ctas.browseRoles.href} variant="secondary">
                {ctas.browseRoles.label}
              </ButtonLink>
            </div>
          </div>
          <ul className="space-y-4">
            {[
              ["Salary band on every role", "No guessing games before the first call."],
              ["No spam calls", "First contact is email or WhatsApp. Calls only in slots you book."],
              [`Status within ${site.promises.candidateUpdateBusinessDays} business days`, "At every stage — and a reason for every outcome."],
              ["Interview prep for the real role", "AI practice questions tied to the job you applied for."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-signal-bg text-sm text-signal">
                  ✓
                </span>
                <span>
                  <strong className="block">{t}</strong>
                  <span className="text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
