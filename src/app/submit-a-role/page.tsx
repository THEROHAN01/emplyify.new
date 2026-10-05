import { Suspense } from "react";
import { BriefForm, BriefFormFromQuery } from "@/components/forms/brief-form";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { site } from "@/content/site";
import { briefFormProps } from "@/lib/content/forms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Submit a role",
  description:
    "Brief Emplyify in about two minutes. A senior recruiter replies within 4 business hours and your verified shortlist arrives within 72 hours.",
  path: "/submit-a-role",
});

export default function SubmitRolePage() {
  const formProps = briefFormProps();

  return (
    <Container className="py-10 lg:py-14">
      <Breadcrumbs items={[{ name: "Submit a role", path: "/submit-a-role" }]} />
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Submit a role</h1>
          <p className="text-muted mt-3 text-lg">
            Three short steps, about two minutes. No sales call needed.
          </p>
          <div className="mt-8">
            <Suspense fallback={<BriefForm {...formProps} />}>
              <BriefFormFromQuery {...formProps} />
            </Suspense>
          </div>
        </div>
        <aside className="space-y-6 lg:pt-24" aria-label="What happens next">
          <div className="border-line bg-surface rounded-2xl border p-6">
            <h2 className="text-lg font-bold">What happens next</h2>
            <ol className="mt-4 space-y-4">
              <li>
                <Badge tone="sla">Within 2 minutes</Badge>
                <p className="text-muted mt-1">
                  A confirmation email with your reference and next steps.
                </p>
              </li>
              <li>
                <Badge tone="sla">Within {site.promises.replyBusinessHours} business hours</Badge>
                <p className="text-muted mt-1">
                  A named recruiter confirms must-haves and budget with you.
                </p>
              </li>
              <li>
                <Badge tone="verified">Within {site.promises.shortlistHours} hours</Badge>
                <p className="text-muted mt-1">
                  Three to five verified candidates, each with a dossier.
                </p>
              </li>
            </ol>
          </div>
          <div className="border-line bg-surface text-muted rounded-2xl border p-6 text-sm">
            <p>
              <strong className="text-ink">Pay only when you hire.</strong> 8.33–16.67% of fixed
              CTC, with a {site.promises.replacementDays}-day free replacement.
            </p>
            <p className="mt-3">
              Your brief is confidential. We never name your company to candidates without your OK.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
