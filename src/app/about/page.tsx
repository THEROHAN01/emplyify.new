import Link from "next/link";
import { AiHumanSplit } from "@/components/marketing/ai-split";
import { FinalCta } from "@/components/marketing/cta-band";
import { TeamGrid } from "@/components/marketing/team-grid";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/content/site";
import { team } from "@/content/team";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About Emplyify",
  description:
    "Emplyify is a Pune-based, pan-India recruitment and staffing partner for IT and Non-IT roles. Meet the team and the principles we work by.",
  path: "/about",
});

const principles = [
  ["Understand the need first", "Every search starts with the business requirement, not a job-description copy."],
  ["Promises in writing", "A shortlist in 48 hours, a reply in 4 business hours, feedback chased in 48."],
  ["Show the price", "Our permanent-hire fees are published, and nothing is due until the hire joins."],
  ["Proof over adjectives", "We publish only real numbers and approved names, never placeholder quotes."],
  ["People decide", "AI helps our recruiters search. A person signs off every shortlist."],
  ["Candidates are people too", "Consent before any CV is shared, and an answer on every application."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title="Connecting talent. Building teams."
        intro={site.positioning}
      />
      <Section labelledBy="story">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose-body">
            <h2 id="story">Why we started Emplyify</h2>
            <p>
              Hiring well takes too long. Hiring managers lose hours screening CVs that miss the
              brief, wait weeks for the first good candidate, and pay fees that were never clear,
              with little follow-through when a hire leaves early.
            </p>
            <p>
              Emplyify finds, screens and delivers the right people for your business: IT and
              Non-IT, permanent and contract, anywhere in India. Recruitment starts with
              understanding the business need, not simply filling vacancies. AI helps our
              recruiters search faster, and a senior recruiter signs off every shortlist.
            </p>
            <p>
              We are headquartered in {site.office.city}, {site.office.region}, and hire for
              startups, SMBs, mid-sized firms and enterprises across India, from one role to fifty.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map(([t, d]) => (
              <Card key={t}>
                <h3 className="font-bold">{t}</h3>
                <p className="text-muted mt-2 text-sm">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="team">
        <SectionHeading
          id="team"
          eyebrow="The team"
          title="The people behind every shortlist."
          intro="Sourcing, profile evaluation, screening, client coordination and follow-up, led by founder Suraj Patil and co-founder Rohan Salunkhe."
        />
        <TeamGrid team={team} />
      </Section>

      <Section labelledBy="ai">
        <SectionHeading
          id="ai"
          title="How we use AI"
          intro={
            <>
              Read the full{" "}
              <Link href="/about/responsible-ai" className="text-accent underline">
                Responsible AI policy
              </Link>
              .
            </>
          }
        />
        <AiHumanSplit />
      </Section>

      <Section labelledBy="contact-details">
        <SectionHeading id="contact-details" title="Contact" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="font-bold">Employers</h3>
            <a href={`mailto:${site.email.hello}`} className="text-accent mt-2 block underline">
              {site.email.hello}
            </a>
          </Card>
          <Card>
            <h3 className="font-bold">Candidates</h3>
            <a
              href={`mailto:${site.email.candidates}`}
              className="text-accent mt-2 block underline"
            >
              {site.email.candidates}
            </a>
          </Card>
          <Card>
            <h3 className="font-bold">Office</h3>
            <p className="text-muted mt-2">
              {site.office.city}, {site.office.region}, India · {site.office.hours}
            </p>
          </Card>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
