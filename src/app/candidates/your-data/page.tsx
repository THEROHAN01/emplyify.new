import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "How we treat your data",
  description:
    "What Emplyify stores about candidates, why, for how long, and how to view, export or delete it under India's DPDP Act.",
  path: "/candidates/your-data",
});

const rows = [
  [
    "What we store",
    "Your profile, CV, contact details, skills, notice period, expected CTC and interview notes.",
  ],
  [
    "Why",
    "To match you with roles, and — only with your OK for each role — introduce you to employers.",
  ],
  [
    "Where",
    "Encrypted, private storage in India-region infrastructure. CVs are accessed through links that expire in minutes.",
  ],
  ["Who sees it", "Our recruiters. Employers see your profile only after you agree, role by role."],
  ["How long", "24 months after your last interaction, then deleted — sooner if you ask."],
  [
    "AI use",
    "AI parses your CV and suggests matches. A recruiter reviews every decision; AI never rejects you on its own.",
  ],
];

export default function YourDataPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "For candidates", path: "/candidates" },
          { name: "Your data", path: "/candidates/your-data" },
        ]}
        eyebrow="Your data"
        title="Your data, in plain language"
        intro="You stay in control of your profile. Here's exactly what happens to it."
      />
      <Section labelledBy="table">
        <h2 id="table" className="sr-only">
          Summary
        </h2>
        <dl className="grid gap-4 md:grid-cols-2">
          {rows.map(([k, v]) => (
            <Card key={k}>
              <dt className="font-bold">{k}</dt>
              <dd className="text-muted mt-2">{v}</dd>
            </Card>
          ))}
        </dl>
        <Card className="mt-8">
          <h2 className="text-xl font-bold">View, export or delete your data</h2>
          <p className="text-muted mt-2">
            Email{" "}
            <a
              className="text-accent underline"
              href={`mailto:${site.email.privacy}?subject=Data%20request`}
            >
              {site.email.privacy}
            </a>{" "}
            from the address you used with us and say what you'd like: a copy, a correction or
            deletion. We respond within 30 days. A self-serve option in the candidate portal is on
            our roadmap.
          </p>
          <p className="text-muted mt-3">
            Read the full{" "}
            <Link href="/legal/privacy" className="text-accent underline">
              privacy notice
            </Link>
            , the{" "}
            <Link href="/legal/candidate-consent" className="text-accent underline">
              candidate consent terms
            </Link>{" "}
            or contact our{" "}
            <Link href="/legal/grievance" className="text-accent underline">
              grievance officer
            </Link>
            .
          </p>
        </Card>
      </Section>
    </>
  );
}
