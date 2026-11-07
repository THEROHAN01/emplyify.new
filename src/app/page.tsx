import Link from "next/link";
import { CandidateBand, CheckIcon, FinalCta } from "@/components/marketing/cta-band";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { ProofBar } from "@/components/marketing/proof-bar";
import { TeamStrip } from "@/components/marketing/team-grid";
import { HeroShortlist } from "@/components/visuals/hero-shortlist";
import { Badge } from "@/components/ui/badge";
import { IconTile, type IconName } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { Card, LinkCard } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { clientStages, industries, nonItFunctions, problems, processSteps } from "@/content/company";
import { REPLACEMENT_DAYS } from "@/content/pricing";
import { sampleShortlists } from "@/content/sample-shortlists";
import { ctas, site } from "@/content/site";
import { team } from "@/content/team";
import {
  getCaseStudies,
  getInsights,
  getRoleFamilies,
  getRoleByFamily,
  getServices,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: `${site.name}: pan-India recruitment and staffing for IT and Non-IT roles`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const heroPoints = [
  "Shortlist in 72 hours",
  "Reply in 4 business hours",
  "Pay only when the hire joins",
];

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
            <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
              Pan-India recruitment and staffing
            </p>
            <h1
              id="hero-title"
              className="mt-5 text-[2.5rem] font-bold sm:text-[3.25rem] lg:text-[3.75rem]"
            >
              The right people for IT and Non-IT roles, shortlisted in 72&nbsp;hours.
            </h1>
            <p className="text-muted mt-6 max-w-xl text-lg sm:text-xl">
              Permanent, contract, leadership and bulk hiring for startups to enterprises across
              India. Recruitment starts with understanding your business, not just filling a
              vacancy.
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
                See how we work with candidates
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

      {/* 2 · Proof bar: written promises and partner logos */}
      <ProofBar />

      {/* 3 · Problem → fix */}
      <Section labelledBy="problems">
        <SectionHeading
          id="problems"
          eyebrow="The problem we solve"
          title="Hiring well takes too long."
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

      {/* 4 · Services */}
      <Section tone="surface" labelledBy="services">
        <SectionHeading
          id="services"
          eyebrow="Services"
          title="Six ways to hire, from one role to fifty."
          intro="Delivered by recruiter desks for IT, Non-IT, leadership and bulk hiring."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* 5 · How we work */}
      <Section labelledBy="how">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="how"
            eyebrow="How we work"
            title="Six steps, from a confirmed brief to the first day."
            intro="Every role runs through the same process, with an initial shortlist in 72 hours."
            className="mb-0"
          />
          <ButtonLink href="/how-it-works" variant="secondary" className="self-start lg:self-auto">
            See how it works
          </ButtonLink>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((p, i) => (
            <li key={p.step} className="border-line bg-surface rounded-2xl border p-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-accent text-3xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-muted text-sm font-medium">{p.when}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{p.step}</h3>
              <p className="text-muted mt-2">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 · IT and Non-IT */}
      <Section tone="surface" labelledBy="roles">
        <SectionHeading
          id="roles"
          eyebrow="Who we hire"
          title="IT and Non-IT talent, across India."
          intro="From a single specialist to a full team, for on-site, hybrid and remote roles."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-line bg-surface rounded-2xl border p-8">
            <IconTile name="it-hiring" />
            <h3 className="mt-5 text-xl font-bold">IT and technical</h3>
            <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {families.map((f) => {
                const role = getRoleByFamily(f.slug)!;
                return (
                  <li key={f.slug}>
                    <Link
                      href={`/hire/${role.slug}`}
                      className="hover:text-accent font-medium underline underline-offset-4"
                    >
                      {f.name}
                    </Link>
                  </li>
                );
              })}
              <li className="font-medium">Cybersecurity</li>
              <li className="font-medium">IT infrastructure and support</li>
            </ul>
          </div>
          <div className="border-line bg-surface rounded-2xl border p-8">
            <IconTile name="non-it-recruitment" />
            <h3 className="mt-5 text-xl font-bold">Non-IT</h3>
            <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {nonItFunctions.map((f) => (
                <li key={f} className="font-medium">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-muted text-sm font-medium">Industries we hire for</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i} className="border-line bg-surface rounded-full border px-4 py-1.5 text-sm">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 7 · Who we serve */}
      <Section labelledBy="clients">
        <SectionHeading
          id="clients"
          eyebrow="Who we serve"
          title="Built for every stage of growth."
          intro="Support ranges from one specialised position to many vacancies, with the approach agreed to the hiring scope."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clientStages.map((c) => (
            <Card key={c.name}>
              <h3 className="text-lg font-bold">{c.name}</h3>
              <p className="text-muted mt-2">{c.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8 · Pricing preview */}
      <Section tone="surface" labelledBy="pricing-preview">
        <SectionHeading
          id="pricing-preview"
          eyebrow="Published pricing"
          title="You see the price before the first call."
          intro="Fees are published and agreed up front, so there are no surprises when the invoice arrives."
        />
        <div className="border-line bg-surface grid overflow-hidden rounded-2xl border sm:grid-cols-3">
          {[
            {
              value: "8.33–16.67%",
              label: "Permanent hire",
              note: "of annual fixed CTC, by seniority. Paid only when the hire joins.",
            },
            {
              value: "Per drive",
              label: "Bulk hiring",
              note: "Ten or more similar roles at a reduced per-hire fee or a fixed drive fee.",
            },
            {
              value: `${REPLACEMENT_DAYS} days`,
              label: "Free replacement",
              note: "If a permanent hire leaves early, we search again at no fee.",
            },
          ].map((x, i) => (
            <div
              key={x.label}
              className={i > 0 ? "border-line border-t p-8 sm:border-t-0 sm:border-l" : "p-8"}
            >
              <p className="text-muted text-sm font-medium">{x.label}</p>
              <p className="tabular font-display mt-2 text-[2rem] leading-tight font-bold whitespace-nowrap">
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

      {/* 9 · Why Emplyify */}
      <Section labelledBy="why">
        <SectionHeading
          id="why"
          eyebrow="Why Emplyify"
          title="Speed, clarity and accountability."
          intro="A screened shortlist in 72 hours, published fees and a written 90-day replacement. “Typical” columns describe common practice in India, not any named firm."
        />
        <ComparisonTable />
      </Section>

      {/* 10 · Team */}
      <Section tone="surface" labelledBy="team">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="team"
            eyebrow="The team"
            title="Experienced recruiters, focused on the right fit."
            intro="Sourcing, screening, client coordination and follow-up, led by founder Suraj Patil and co-founder Rohan Salunkhe."
            className="mb-0"
          />
          <ButtonLink href="/about#team" variant="secondary" className="self-start lg:self-auto">
            Meet the team
          </ButtonLink>
        </div>
        <TeamStrip team={team} />
      </Section>

      {/* 11 · Case study, or a sample shortlist until one is approved */}
      <Section labelledBy="case-study">
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
              intro="Client case studies publish once clients approve them; we never use placeholder quotes. Until then, see exactly what you would receive."
              className="mb-0"
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/sample-shortlist">View a sample shortlist</ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
          </div>
        )}
      </Section>

      {/* 12 · Candidate band */}
      <CandidateBand />

      {/* 13 · Insights */}
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

      {/* 14 · Responsible AI and data */}
      <Section labelledBy="responsible-ai">
        <SectionHeading
          id="responsible-ai"
          eyebrow="Trust and compliance"
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
            <h3 className="font-bold">Consent first</h3>
            <p className="text-muted mt-2">
              A candidate&apos;s CV is shared only with their consent, logged with time and purpose.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold">DPDP-aligned data handling</h3>
            <p className="text-muted mt-2">
              Private CV storage, links that expire and a published grievance officer.
            </p>
          </Card>
        </div>
        <ButtonLink href="/about/responsible-ai" variant="link" className="mt-8">
          Read our AI policy →
        </ButtonLink>
      </Section>

      {/* 15 · Final CTA */}
      <FinalCta />
    </>
  );
}
