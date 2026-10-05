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
        <div className="bg-ink text-bg rounded-[20px] px-6 py-12 text-center sm:px-12 lg:py-16">
          <h2 id="final-cta" className="text-2xl font-extrabold sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-80">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink
                href={secondary.href}
                size="lg"
                variant="secondary"
                className="border-transparent"
              >
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
        <div className="border-line bg-surface grid gap-10 rounded-[20px] border p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12">
          <div>
            <p className="text-accent mb-3 text-sm font-semibold tracking-wider uppercase">
              For engineers
            </p>
            <h2 id="candidate-band" className="text-2xl font-bold sm:text-3xl">
              Get matched, prepped and kept in the loop.
            </h2>
            <p className="text-muted mt-4 text-lg">
              Looking for your next role? We treat you as a peer, not a CV in a pile.
            </p>
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
              [
                "No spam calls",
                "First contact is email or WhatsApp. Calls only in slots you book.",
              ],
              [
                `Status within ${site.promises.candidateUpdateBusinessDays} business days`,
                "At every stage — and a reason for every outcome.",
              ],
              [
                "Interview prep for the real role",
                "AI practice questions tied to the job you applied for.",
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span
                  aria-hidden
                  className="bg-signal-bg text-signal mt-1 flex size-6 shrink-0 items-center justify-center rounded-full text-sm"
                >
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
