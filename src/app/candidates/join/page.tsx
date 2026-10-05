import { TalentNetworkForm } from "@/components/forms/talent-network-form";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { site } from "@/content/site";
import { familyOptions } from "@/lib/content/forms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Join the talent network",
  description:
    "Join the Emplyify talent network for curated tech roles with salary bands, no spam calls and feedback on every application.",
  path: "/candidates/join",
});

export default function JoinPage() {
  return (
    <Container className="py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "For candidates", path: "/candidates" },
          { name: "Join the talent network", path: "/candidates/join" },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Join the talent network</h1>
          <p className="text-muted mt-3 text-lg">
            One minute now. Relevant roles later — never spam.
          </p>
          <div className="mt-8">
            <TalentNetworkForm families={familyOptions()} />
          </div>
        </div>
        <aside className="space-y-4 lg:pt-24">
          <div className="border-line bg-surface rounded-[12px] border p-6">
            <h2 className="font-bold">What you can expect</h2>
            <ul className="text-muted mt-3 space-y-2">
              <li>✓ Only roles that match your field and level</li>
              <li>✓ Salary band before any conversation</li>
              <li>✓ No calls without a booked slot</li>
              <li>
                ✓ Status updates within {site.promises.candidateUpdateBusinessDays} business days
              </li>
              <li>✓ Delete your data any time</li>
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
