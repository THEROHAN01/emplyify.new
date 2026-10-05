import Link from "next/link";
import { CandidateBand, CheckIcon, FinalCta } from "@/components/marketing/cta-band";
import { ProofBar } from "@/components/marketing/proof-bar";
import { HeroShortlist } from "@/components/visuals/hero-shortlist";
import { ProcessShowcase } from "@/components/visuals/process-showcase";
import { Badge } from "@/components/ui/badge";
import { IconTile, type IconName } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { Card, LinkCard } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { REPLACEMENT_DAYS, podFromMonthlyInr } from "@/content/pricing";
import { sampleShortlists } from "@/content/sample-shortlists";
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
    fix: "Search starts the hour you brief us",
    detail:
      "AI agents search our network and public profiles against your must-haves, then recruiters screen the best matches.",
  },
  {
    problem: "Agencies send CV dumps",
    fix: "Three to five people, each with a dossier",
    detail:
      "Evidence for every must-have, notice period and CTC, honest risks and a recruiter's sign-off.",
  },
  {
    problem: "No idea where things stand",
    fix: "Written SLAs at every step",
    detail:
      "A reply within 4 business hours, a shortlist within 72, and feedback chased within 48 hours of each interview.",
  },
];

const heroPoints = ["Shortlist in 72 hours", "Pay only on hire", "90-day free replacement"];

export default function HomePage() {
  const caseStudy = getCaseStudies()[0];
  const talentIndex = getInsights().find((i) => i.kind === "Talent Index");
  const families = getRoleFamilies();

  return (
    <>
      {/* 1 · Hero */}
      <section
        aria-labelledby="hero-title"
        className="overflow-hidden pt-14 pb-16 lg:pt-24 lg:pb-24"
      >
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-muted text-sm font-medium">
              Hiring partner for tech and GCC teams in India
            </p>
            <h1
              id="hero-title"
              className="mt-5 text-[2.75rem] font-bold sm:text-6xl lg:text-[4.25rem]"
            >
              Vetted tech talent, shortlisted in 72&nbsp;hours.
            </h1>
            <p className="text-muted mt-6 max-w-xl text-lg sm:text-xl">
              AI does the searching. Senior recruiters vouch for every shortlist. You see the price
              before you talk to us.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={ctas.submitRole.href} size="lg">
                {ctas.submitRole.label}
              </ButtonLink>
              <ButtonLink href={ctas.bookCall.href} size="lg" variant="secondary">
                {ctas.bookCall.label}
              </ButtonLink>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
              {heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckIcon className="text-signal" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-muted mt-8 text-[15px]">
              Looking for a job?{" "}
              <Link
                href="/candidates"
                className="text-ink hover:text-accent font-semibold underline underline-offset-4"
              >
                See how we work with engineers
              </Link>
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="bg-bg absolute -inset-x-4 -inset-y-6 -z-10 rounded-[32px] sm:-inset-x-8 sm:-inset-y-10"
            />
            <HeroShortlist
              shortlists={sampleShortlists}
              families={families.map(({ slug, name }) => ({ slug, name }))}
            />
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
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((p) => (
            <Card key={p.problem}>
              <p className="text-muted text-sm">Instead of: {p.problem.toLowerCase()}</p>
              <h3 className="mt-4 text-xl font-bold">{p.fix}</h3>
              <p className="text-muted mt-2">{p.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4 · How it works */}
      <Section labelledBy="how" className="border-line border-t">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="how"
            eyebrow="How it works"
            title="Four steps, each with a written SLA."
            intro="AI handles the search. A senior recruiter signs off every candidate you see."
            className="mb-0"
          />
          <ButtonLink href="/how-it-works" variant="secondary" className="self-start lg:self-auto">
            See how it works
          </ButtonLink>
        </div>
        <ProcessShowcase />
      </Section>

      {/* 5 · Services */}
      <Section labelledBy="services">
        <SectionHeading id="services" eyebrow="Services" title="One role or a whole GCC." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getServices().map((s) => (
            <LinkCard
              key={s.slug}
              href={`/services/${s.slug}`}
              title={s.name}
              icon={<IconTile name={s.slug as IconName} />}
            >
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
          intro="Organised by role family and city, never generic “IT staffing”."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((f) => {
            const role = getRoleByFamily(f.slug)!;
            return (
              <LinkCard
                key={f.slug}
                href={`/hire/${role.slug}`}
                title={f.name}
                icon={<IconTile name={f.slug} tone="ink" />}
              >
                {f.blurb}
              </LinkCard>
            );
          })}
        </div>
      </Section>

      {/* 7 · Pricing preview */}
      <Section labelledBy="pricing-preview">
        <SectionHeading
          id="pricing-preview"
          eyebrow="Published pricing"
          title="You see the price before the first call."
          intro="Almost no recruitment firm publishes its fees. We do, because surprises cost trust."
        />
        <div className="border-line grid overflow-hidden rounded-2xl border sm:grid-cols-3">
          {[
            {
              value: "8.33–16.67%",
              label: "Per hire",
              note: "of annual fixed CTC, by seniority. Paid when the hire joins.",
            },
            {
              value: podFromMonthlyInr ? `from ${formatInr(podFromMonthlyInr)}/mo` : "Monthly fee",
              label: "Talent Pod",
              note: "An embedded recruiter for 5+ roles a quarter, plus a reduced per-hire fee.",
            },
            {
              value: `${REPLACEMENT_DAYS} days`,
              label: "Free replacement",
              note: "If a hire leaves early, we search again at no fee.",
            },
          ].map((x, i) => (
            <div
              key={x.label}
              className={i > 0 ? "border-line border-t p-8 sm:border-t-0 sm:border-l" : "p-8"}
            >
              <p className="text-muted text-sm font-medium">{x.label}</p>
              <p className="tabular mt-2 text-[2rem] leading-tight font-bold tracking-tight whitespace-nowrap">
                {x.value}
              </p>
              <p className="text-muted mt-3">{x.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/pricing" variant="secondary">
            See pricing and the fee calculator
          </ButtonLink>
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
                <blockquote className="border-ink border-l-2 pl-5 text-lg">
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
                  <p className="tabular text-3xl font-bold">{r.value}</p>
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
