import Link from "next/link";
import { CandidateBand, FinalCta } from "@/components/marketing/cta-band";
import { ProofBar } from "@/components/marketing/proof-bar";
import { ShortlistCard } from "@/components/marketing/shortlist-card";
import { HiringSteps } from "@/components/marketing/steps";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, LinkCard } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { REPLACEMENT_DAYS, podFromMonthlyInr } from "@/content/pricing";
import { getSampleShortlist } from "@/content/sample-shortlists";
import { ctas, site } from "@/content/site";
import {
  getCaseStudies,
  getInsights,
  getRoleFamilies,
  getRoleByFamily,
  getServices,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatInr } from "@/lib/utils/format";

export const metadata = buildMetadata({
  title: `${site.name} — Vetted tech talent, shortlisted in 72 hours`,
  description:
    "AI-native hiring partner for India's tech and GCC teams. AI does the searching; senior recruiters vouch for every shortlist. Published pricing, pay on hire, 90-day replacement.",
  path: "/",
  absoluteTitle: true,
});

const problems = [
  {
    problem: "Sourcing takes weeks",
    fix: "AI sourcing across our network and public profiles starts the hour you brief us.",
  },
  {
    problem: "Agencies send CV dumps",
    fix: "Three to five candidates, each with a dossier: evidence per must-have, risks and a recruiter's sign-off.",
  },
  {
    problem: "No idea where things stand",
    fix: "A live pipeline with written SLAs at every step, from brief to offer.",
  },
];

export default function HomePage() {
  const sample = getSampleShortlist("ai-ml");
  const caseStudy = getCaseStudies()[0];
  const talentIndex = getInsights().find((i) => i.kind === "Talent Index");

  return (
    <>
      {/* 1 · Hero */}
      <section
        aria-labelledby="hero-title"
        className="overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24"
      >
        <Container className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Badge tone="sla">For tech and GCC hiring teams in India</Badge>
            <h1 id="hero-title" className="mt-5 text-4xl font-extrabold sm:text-5xl lg:text-[4rem]">
              Vetted tech talent, shortlisted in <span className="text-accent">72&nbsp;hours</span>.
            </h1>
            <p className="text-muted mt-6 max-w-xl text-lg sm:text-xl">
              AI does the searching. Senior recruiters vouch for every shortlist. You see the price
              before you talk to us.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={ctas.submitRole.href} size="lg">
                {ctas.submitRole.label}
              </ButtonLink>
              <ButtonLink href={ctas.bookCall.href} size="lg" variant="secondary">
                {ctas.bookCall.label}
              </ButtonLink>
            </div>
            <p className="text-muted mt-6">
              Looking for a job?{" "}
              <Link
                href="/candidates"
                className="text-accent font-semibold underline-offset-4 hover:underline"
              >
                See how we work with engineers →
              </Link>
            </p>
          </div>
          <div className="relative">
            <div aria-hidden className="bg-accent-soft absolute -inset-6 -z-10 rounded-[28px]" />
            <ShortlistCard candidate={sample.candidates[0]} role={sample.role} headingLevel="h2" />
            <p className="text-muted mt-3 text-center text-sm">
              An anonymised sample.{" "}
              <Link href="/sample-shortlist" className="text-accent underline">
                See the full dossier
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* 2 · Proof bar */}
      <ProofBar />

      {/* 3 · Problem → fix */}
      <Section labelledBy="problems">
        <SectionHeading
          id="problems"
          eyebrow="Why teams switch"
          title="Hiring engineers shouldn't take a quarter."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <Card key={p.problem}>
              <p className="text-muted text-sm font-semibold line-through decoration-2">
                {p.problem}
              </p>
              <p className="mt-3 text-lg font-semibold">{p.fix}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/how-it-works" variant="link">
            See how it works →
          </ButtonLink>
        </div>
      </Section>

      {/* 4 · How it works */}
      <Section tone="surface" labelledBy="how">
        <SectionHeading
          id="how"
          eyebrow="How it works"
          title="Four steps, each with a written SLA."
          intro="AI handles the search. A senior recruiter signs off every candidate you see."
        />
        <HiringSteps />
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={ctas.submitRole.href}>{ctas.submitRole.label}</ButtonLink>
          <ButtonLink href="/sample-shortlist" variant="secondary">
            View a sample shortlist
          </ButtonLink>
        </div>
      </Section>

      {/* 5 · Services */}
      <Section labelledBy="services">
        <SectionHeading id="services" eyebrow="Services" title="One role or a whole GCC." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getServices().map((s) => (
            <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.name}>
              {s.outcome}
            </LinkCard>
          ))}
        </div>
      </Section>

      {/* 6 · Role families */}
      <Section tone="surface" labelledBy="roles">
        <SectionHeading
          id="roles"
          eyebrow="Specialisms"
          title="We only hire for roles we know deeply."
          intro="Organised by role family and city — never generic “IT staffing”."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getRoleFamilies().map((f) => {
            const role = getRoleByFamily(f.slug)!;
            return (
              <LinkCard key={f.slug} href={`/hire/${role.slug}`} title={f.name}>
                {f.blurb}
              </LinkCard>
            );
          })}
        </div>
      </Section>

      {/* 7 · Pricing preview */}
      <Section labelledBy="pricing-preview">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeading
            id="pricing-preview"
            eyebrow="Published pricing"
            title="You see the price before the first call."
            intro="Almost no recruitment firm publishes its fees. We do, because surprises cost trust."
            className="mb-0"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="tabular text-accent font-mono text-xl font-bold whitespace-nowrap">
                8.33–16.67%
              </p>
              <p className="mt-2 font-semibold">Per hire</p>
              <p className="text-muted text-sm">
                of annual fixed CTC, by seniority. Pay on joining.
              </p>
            </Card>
            <Card>
              <p className="tabular text-accent font-mono text-xl font-bold">
                {podFromMonthlyInr ? `from ${formatInr(podFromMonthlyInr)}/mo` : "Monthly"}
              </p>
              <p className="mt-2 font-semibold">Talent Pod</p>
              <p className="text-muted text-sm">
                Embedded recruiter for 5+ roles a quarter, plus a reduced per-hire fee.
              </p>
            </Card>
            <Card>
              <p className="tabular text-accent font-mono text-xl font-bold">
                {REPLACEMENT_DAYS} days
              </p>
              <p className="mt-2 font-semibold">Free replacement</p>
              <p className="text-muted text-sm">
                If a hire leaves early, we search again at no fee.
              </p>
            </Card>
            <div className="sm:col-span-3">
              <ButtonLink href="/pricing" variant="secondary">
                See pricing and the fee calculator
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 8 · Case study */}
      <Section tone="surface" labelledBy="case-study">
        {caseStudy ? (
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                id="case-study"
                eyebrow={`Case study · ${caseStudy.clientType}`}
                title={caseStudy.headline}
                className="mb-6"
              />
              {caseStudy.quote && (
                <blockquote className="border-accent border-l-4 pl-4 text-lg">
                  “{caseStudy.quote.text}”
                  <footer className="text-muted mt-2 text-sm">
                    {caseStudy.quote.name}, {caseStudy.quote.title}
                  </footer>
                </blockquote>
              )}
              <ButtonLink href={`/case-studies/${caseStudy.slug}`} variant="link" className="mt-6">
                Read case study →
              </ButtonLink>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.results.map((r) => (
                <Card key={r.label}>
                  <p className="tabular text-accent font-mono text-3xl font-bold">{r.value}</p>
                  <p className="text-muted mt-1">{r.label}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <SectionHeading
              id="case-study"
              eyebrow="Proof"
              title="Judge us on a real shortlist, not a testimonial."
              intro="Our first client case studies publish once clients approve them — we never use placeholder quotes. Until then, look at exactly what you'd receive."
              className="mb-0"
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/sample-shortlist">View a sample shortlist</ButtonLink>
              <ButtonLink href="/case-studies" variant="secondary">
                Case studies
              </ButtonLink>
            </div>
          </div>
        )}
      </Section>

      {/* 9 · Candidate band */}
      <CandidateBand />

      {/* 10 · Insights */}
      {talentIndex && (
        <Section tone="accent" labelledBy="insights">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                id="insights"
                eyebrow="Insights"
                title={talentIndex.title}
                intro={talentIndex.description}
                className="mb-6"
              />
              {talentIndex.releaseLabel && <Badge tone="pending">{talentIndex.releaseLabel}</Badge>}
            </div>
            <Card>
              <p className="font-semibold">Each edition covers</p>
              <ul className="text-muted mt-3 space-y-2">
                {talentIndex.takeaways.map((t) => (
                  <li key={t}>– {t}</li>
                ))}
              </ul>
              <ButtonLink href={`/insights/${talentIndex.slug}`} className="mt-6 w-full">
                {talentIndex.release === "available" ? "Download report" : "Get the first edition"}
              </ButtonLink>
            </Card>
          </div>
        </Section>
      )}

      {/* 11 · Responsible AI */}
      <Section labelledBy="responsible-ai">
        <SectionHeading
          id="responsible-ai"
          eyebrow="Responsible AI"
          title="AI assists. People decide."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="font-bold">Human review, always</h3>
            <p className="text-muted mt-2">
              A senior recruiter signs off every shortlist. AI never rejects a candidate on its own.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold">Bias testing every month</h3>
            <p className="text-muted mt-2">
              We test matching for skew on gender, college and location proxies, and fix what we
              find.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold">DPDP-aligned data handling</h3>
            <p className="text-muted mt-2">
              Explicit consent before any profile is shared, private CV storage and a published
              grievance officer.
            </p>
          </Card>
        </div>
        <ButtonLink href="/about/responsible-ai" variant="link" className="mt-8">
          Read our AI policy →
        </ButtonLink>
      </Section>

      {/* 12 · Final CTA */}
      <FinalCta />
    </>
  );
}
