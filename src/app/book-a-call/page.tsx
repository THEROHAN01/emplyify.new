import Link from "next/link";
import { CalEmbed } from "@/components/forms/cal-embed";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/layout";
import { site } from "@/content/site";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/seo/metadata";
import { whatsappUrl } from "@/lib/utils/contact";

export const metadata = buildMetadata({
  title: "Book a hiring call",
  description:
    "Book a 20-minute hiring call with an Emplyify recruiter, or talk to our GCC team about pods and hiring sprints.",
  path: "/book-a-call",
});

export default async function BookCallPage(props: PageProps<"/book-a-call">) {
  const sp = await props.searchParams;
  const gcc = sp.team === "gcc";
  const wa = whatsappUrl(
    gcc
      ? "Hi Emplyify, I'd like to talk to your GCC team."
      : "Hi Emplyify, I'd like to book a hiring call.",
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: gcc ? "Talk to our GCC team" : "Book a hiring call", path: "/book-a-call" },
        ]}
        eyebrow={gcc ? "GCC team" : "20 minutes"}
        title={gcc ? "Talk to our GCC team" : "Book a hiring call"}
        intro={
          gcc
            ? "Planning a GCC launch or expansion? We'll walk through city options, salary benchmarks and a hiring plan."
            : "Twenty minutes with a recruiter to calibrate your role. Leave with a written brief and a shortlist date."
        }
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {env.calLink ? (
            <CalEmbed link={gcc ? env.calLinkGcc : env.calLink} title="Book a call with Emplyify" />
          ) : (
            <Card>
              <h2 className="text-xl font-bold">Prefer to skip the call?</h2>
              <p className="text-muted mt-2">
                Submit your role in two minutes and a recruiter will reply within{" "}
                {site.promises.replyBusinessHours} business hours with times to talk.
              </p>
              <ButtonLink href="/submit-a-role" className="mt-6">
                Submit a role
              </ButtonLink>
            </Card>
          )}
        </div>
        <aside className="space-y-4">
          <Card>
            <h2 className="font-bold">Other ways to reach us</h2>
            <ul className="text-muted mt-3 space-y-2">
              <li>
                Email:{" "}
                <Link className="text-accent underline" href={`mailto:${site.email.hello}`}>
                  {site.email.hello}
                </Link>
              </li>
              {wa && (
                <li>
                  <a
                    className="text-accent underline"
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                </li>
              )}
              <li>
                Office: {site.office.city}, {site.office.region}
              </li>
              <li>Hours: {site.office.hours}</li>
            </ul>
          </Card>
          <Card>
            <h2 className="font-bold">On the call we'll cover</h2>
            <ul className="text-muted mt-3 list-disc space-y-1 pl-5">
              <li>Must-haves vs nice-to-haves</li>
              <li>Budget against current market bands</li>
              <li>Interview loop and timelines</li>
              <li>
                {gcc
                  ? "City choice, pod size and sprint plan"
                  : "Per-hire or Talent Pod — whichever is cheaper for you"}
              </li>
            </ul>
          </Card>
        </aside>
      </Container>
    </>
  );
}
