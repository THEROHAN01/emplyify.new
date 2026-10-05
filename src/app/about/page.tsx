import Image from "next/image";
import Link from "next/link";
import { AiHumanSplit } from "@/components/marketing/ai-split";
import { FinalCta } from "@/components/marketing/cta-band";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/content/site";
import { team } from "@/content/team";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About Emplyify",
  description:
    "Why we built an AI-native, human-verified hiring partner for India's tech and GCC teams — and the principles we work by.",
  path: "/about",
});

const principles = [
  ["One provable promise", "A vetted shortlist in 72 hours, measured and published."],
  ["Show the price", "Our fees are on the website. Almost no one else's are."],
  ["Proof over adjectives", "Every claim carries a number, a name or a sample."],
  ["Human + AI, visibly", "We show where AI works and where a recruiter decides."],
  ["Specialism over breadth", "Six role families, three cities. We say no to the rest."],
  ["Candidates are peers", "Salary bands upfront, no spam calls, an answer every time."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title="Hiring engineers should be fast, honest and specific."
        intro={site.positioning}
      />
      <Section labelledBy="story">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose-body">
            <h2 id="story">Why we started Emplyify</h2>
            <p>
              Engineering leaders in India told us the same three things: sourcing takes weeks,
              agencies send piles of unsuitable CVs, and nobody can say where a search stands.
              Candidates told us the mirror image: spam calls, roles without salary bands, and
              silence after interviews.
            </p>
            <p>
              We built Emplyify to fix both sides at once. AI agents do the slow work of searching
              and screening, so senior recruiters can spend their time where judgement matters —
              interviewing, calibrating and vouching for every shortlist. We publish our prices and
              our SLAs, and we measure ourselves against them.
            </p>
            <p>
              We are based in {site.office.city} and focus on AI/ML, data, cloud, full-stack,
              embedded and product roles across Pune, Bengaluru and Hyderabad.
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

      {team.length > 0 && (
        <Section tone="surface" labelledBy="team">
          <SectionHeading id="team" title="The team" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name}>
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.title}`}
                  width={320}
                  height={320}
                  className="aspect-square w-full rounded-[12px] object-cover"
                />
                <p className="mt-3 font-bold">{m.name}</p>
                <p className="text-muted text-sm">{m.title}</p>
                <p className="mt-2 text-sm">{m.bio}</p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent mt-2 inline-block text-sm underline"
                  >
                    LinkedIn
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone={team.length ? "default" : "surface"} labelledBy="ai">
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
