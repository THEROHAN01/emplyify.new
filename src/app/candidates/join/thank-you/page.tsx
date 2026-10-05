import { ConversionEvent } from "@/components/analytics/conversion-event";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "You're in",
  description: "Welcome to the Emplyify talent network.",
  path: "/candidates/join/thank-you",
  noindex: true,
});

export default function JoinThankYou() {
  return (
    <Container className="py-16 lg:py-24">
      <ConversionEvent
        name="thank_you_viewed"
        props={{ page: "/candidates/join/thank-you", kind: "candidate_signup" }}
      />
      <div className="mx-auto max-w-2xl">
        <Badge tone="verified">You're in</Badge>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Welcome to the talent network.</h1>
        <p className="text-muted mt-4 text-lg">
          A welcome email is on its way with what to expect. We'll only contact you when a role
          matches your field, level and location — with the salary band upfront.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/jobs">Browse roles</ButtonLink>
          <ButtonLink href="/candidates/interview-prep" variant="secondary">
            Try interview prep
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
