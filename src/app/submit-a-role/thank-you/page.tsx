import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/layout";
import { site } from "@/content/site";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDateIst } from "@/lib/utils/format";
import { ConversionEvent } from "@/components/analytics/conversion-event";

export const metadata = buildMetadata({
  title: "Brief received",
  description: "Your role brief has been received. Here's what happens next.",
  path: "/submit-a-role/thank-you",
  noindex: true,
});

const asDate = (v: unknown) => {
  if (typeof v !== "string") return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

export default async function BriefThankYou(props: PageProps<"/submit-a-role/thank-you">) {
  const sp = await props.searchParams;
  const ref = typeof sp.ref === "string" ? sp.ref.slice(0, 20) : null;
  const desk = typeof sp.desk === "string" ? sp.desk.slice(0, 60) : "recruiting desk";
  const recruiter = typeof sp.recruiter === "string" ? sp.recruiter.slice(0, 60) : null;
  const role = typeof sp.role === "string" ? sp.role.slice(0, 120) : "your role";
  const isPod = sp.track === "talent-pod";
  const replyBy = asDate(sp.replyBy);
  const shortlistBy = asDate(sp.shortlistBy);

  return (
    <Container className="py-16 lg:py-24">
      <ConversionEvent
        name="thank_you_viewed"
        props={{ page: "/submit-a-role/thank-you", kind: "brief" }}
      />
      <div className="mx-auto max-w-2xl">
        <Badge tone="verified">Brief received</Badge>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Thanks — we're on {role}.</h1>
        {ref && (
          <p className="text-muted mt-3 text-lg">
            Your reference is <span className="text-ink font-bold">{ref}</span>. A confirmation
            email is on its way.
          </p>
        )}

        <ol className="mt-10 space-y-6">
          <li className="border-line bg-surface rounded-2xl border p-6">
            <p className="text-accent text-sm font-semibold">
              Next ·{" "}
              {replyBy
                ? `by ${formatDateIst(replyBy)}`
                : `within ${site.promises.replyBusinessHours} business hours`}
            </p>
            <p className="mt-1 text-lg font-semibold">
              {recruiter ? `${recruiter} from our ${desk}` : `A senior recruiter from our ${desk}`}{" "}
              will reply to confirm must-haves and budget.
            </p>
          </li>
          <li className="border-line bg-surface rounded-2xl border p-6">
            <p className="text-accent text-sm font-semibold">
              Then ·{" "}
              {shortlistBy
                ? `expected ${formatDateIst(shortlistBy)}`
                : `within ${site.promises.shortlistHours} hours`}
            </p>
            <p className="mt-1 text-lg font-semibold">
              Your verified shortlist: three to five candidates, each with a dossier.
            </p>
            <p className="text-muted mt-1">The 72-hour clock starts once the brief is confirmed.</p>
          </li>
          {isPod && (
            <li className="border-accent bg-accent-soft rounded-2xl border p-6">
              <p className="text-lg font-semibold">Hiring five or more roles?</p>
              <p className="mt-1">
                A Talent Pod usually costs less than per-hire fees at your volume. We'll include a
                quote when we reply.
              </p>
            </li>
          )}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          {env.calLink ? (
            <ButtonLink href={env.calLink} target="_blank" rel="noopener noreferrer">
              Brief us live — book 20 minutes
            </ButtonLink>
          ) : (
            <ButtonLink href="/book-a-call">Book a hiring call</ButtonLink>
          )}
          <ButtonLink href="/sample-shortlist" variant="secondary">
            See what a shortlist looks like
          </ButtonLink>
        </div>
        <p className="text-muted mt-8 text-sm">
          Need to change something? Reply to the confirmation email or write to{" "}
          <Link href={`mailto:${site.email.hello}`} className="text-accent underline">
            {site.email.hello}
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
