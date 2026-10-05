import { AiHumanSplit } from "@/components/marketing/ai-split";
import { FinalCta } from "@/components/marketing/cta-band";
import { IconTile, type IconName } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { Card, LinkCard } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ctas } from "@/content/site";
import { getCities, getService } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "GCC hiring partner in India",
  description:
    "Build or scale your Global Capability Centre in Pune, Bengaluru or Hyderabad with Talent Pods, fixed-fee Hiring Sprints and leadership search.",
  path: "/gcc",
});

export default function GccHub() {
  const offerings = ["talent-pods", "gcc-hiring-sprints", "leadership-hiring"].map((s) =>
    getService(s)!,
  );
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "For GCCs", path: "/gcc" }]}
        eyebrow="For Global Capability Centres"
        title="Your GCC hiring partner in India"
        intro="Capacity for a build-out, predictable pricing and DPDP-aligned data handling. From your first ten hires to your next hundred."
        actions={
          <>
            <ButtonLink href={ctas.gccTeam.href} size="lg">
              {ctas.gccTeam.label}
            </ButtonLink>
            <ButtonLink href={ctas.talentIndex.href} size="lg" variant="secondary">
              {ctas.talentIndex.label}
            </ButtonLink>
          </>
        }
      />
      <Section labelledBy="offer">
        <SectionHeading id="offer" title="Three ways we work with GCCs" />
        <div className="grid gap-6 md:grid-cols-3">
          {offerings.map((s) => (
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
      <Section tone="surface" labelledBy="cities">
        <SectionHeading
          id="cities"
          eyebrow="Cities"
          title="Choose your city with data"
          intro="Salary benchmarks, talent supply, clusters and notice-period norms for each GCC hub."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {getCities().map((c) => (
            <LinkCard key={c.slug} href={`/gcc/${c.slug}`} title={`GCC hiring in ${c.name}`}>
              {c.gccIntro}
            </LinkCard>
          ))}
        </div>
      </Section>
      <Section labelledBy="fears">
        <SectionHeading
          id="fears"
          title="What TA leads tell us they're tired of — and what we do instead"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="font-bold">Agency spam</h3>
            <p className="text-muted mt-2">
              One named recruiter per pod, one weekly report, no cold CV forwards.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold">CV dumps</h3>
            <p className="text-muted mt-2">
              Three to five evidenced candidates per role, signed off by a senior recruiter.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold">Data leaks</h3>
            <p className="text-muted mt-2">
              Private CV storage, signed links that expire, consent per role and MFA on every staff
              account.
            </p>
          </Card>
        </div>
      </Section>
      <Section tone="surface" labelledBy="split">
        <SectionHeading id="split" title="Human + AI, visibly" />
        <AiHumanSplit />
      </Section>
      <FinalCta
        title="Planning a GCC build-out?"
        body="Get a city market map and a hiring plan with weekly milestones."
        primary={ctas.gccTeam}
        secondary={ctas.talentIndex}
      />
    </>
  );
}
