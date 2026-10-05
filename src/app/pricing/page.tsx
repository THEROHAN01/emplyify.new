import { FeeCalculator } from "@/components/forms/fee-calculator";
import { FinalCta } from "@/components/marketing/cta-band";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { comparison, perHireFees, plans, pricingFaqs } from "@/content/pricing";
import type { Seniority } from "@/content/types";
import { calculatorFamilies } from "@/lib/content/forms";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";
import { formatPercent } from "@/lib/utils/format";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Published recruitment fees: 8.33–16.67% of annual CTC per hire, Talent Pods for 5+ roles and fixed-fee GCC Hiring Sprints. Fee calculator, GST and 90-day replacement.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        eyebrow="Pricing"
        title="Published pricing. Pay when you hire."
        intro="No retainers for per-hire roles, no hidden fees, and a 90-day free replacement on every hire. GST is added at 18%."
      />

      <Section labelledBy="plans">
        <h2 id="plans" className="sr-only">
          Plans
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "bg-surface flex flex-col rounded-[12px] border p-6",
                p.featured ? "border-accent border-2" : "border-line",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold">{p.name}</h3>
                {p.featured && <Badge tone="new">Best value at volume</Badge>}
              </div>
              <p className="text-muted">{p.for}</p>
              <p className="tabular text-accent mt-6 font-mono text-3xl font-bold">{p.price}</p>
              <p className="text-muted text-sm">{p.priceNote}</p>
              <ul className="mt-6 flex-1 space-y-2">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-signal">
                      ✓
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={p.cta.href}
                variant={p.featured ? "primary" : "secondary"}
                className="mt-8"
              >
                {p.cta.label}
              </ButtonLink>
            </div>
          ))}
        </div>

        <div className="border-line bg-surface mt-10 overflow-x-auto rounded-[12px] border">
          <table className="w-full text-left">
            <caption className="px-6 pt-4 text-left font-semibold">
              Per-hire fee by seniority
            </caption>
            <thead>
              <tr className="border-line border-b">
                <th scope="col" className="px-6 py-3">
                  Seniority
                </th>
                <th scope="col" className="px-6 py-3">
                  Fee
                </th>
                <th scope="col" className="px-6 py-3">
                  Equivalent
                </th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(perHireFees) as Seniority[]).map((k) => (
                <tr key={k} className="border-line border-b last:border-0">
                  <th scope="row" className="px-6 py-3 font-semibold">
                    {perHireFees[k].label}
                  </th>
                  <td className="tabular px-6 py-3 font-mono">
                    {formatPercent(perHireFees[k].percent)} of annual fixed CTC
                  </td>
                  <td className="text-muted px-6 py-3">
                    {perHireFees[k].months} {perHireFees[k].months === 1 ? "month" : "months"} of
                    fixed CTC
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="surface" labelledBy="calculator">
        <SectionHeading
          id="calculator"
          eyebrow="Fee calculator"
          title="What would this hire cost?"
          intro="Choose the role and CTC. The estimate includes GST and the shortlist date if you brief us today."
        />
        <FeeCalculator families={calculatorFamilies()} />
      </Section>

      <Section labelledBy="compare">
        <SectionHeading
          id="compare"
          eyebrow="Compare"
          title="Emplyify vs a typical agency vs in-house"
          intro="“Typical” columns describe common market practice in India, not any named firm."
        />
        <div className="border-line bg-surface overflow-x-auto rounded-[12px] border">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-line border-b">
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Criterion</span>
                </th>
                <th scope="col" className="text-accent px-6 py-3">
                  Emplyify
                </th>
                <th scope="col" className="px-6 py-3">
                  Typical agency
                </th>
                <th scope="col" className="px-6 py-3">
                  In-house only
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((r) => (
                <tr key={r.row} className="border-line border-b last:border-0">
                  <th scope="row" className="px-6 py-3 font-semibold">
                    {r.row}
                  </th>
                  <td className="px-6 py-3 font-semibold">{r.emplyify}</td>
                  <td className="text-muted px-6 py-3">{r.agency}</td>
                  <td className="text-muted px-6 py-3">{r.inhouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="surface" labelledBy="pricing-faq">
        <SectionHeading id="pricing-faq" title="Pricing questions" />
        <div className="max-w-3xl">
          <FaqList faqs={pricingFaqs} />
        </div>
      </Section>

      <FinalCta title="Know the price. Now see the shortlist." />
    </>
  );
}
