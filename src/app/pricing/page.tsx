import { IconTile, type IconName } from "@/components/ui/icons";
import { PipelineTracker } from "@/components/visuals/pipeline-tracker";
import { Tick } from "@/components/visuals/mock-ui";
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

const planIcons: Record<string, IconName> = {
  "per-hire": "tech-hiring",
  "talent-pod": "talent-pods",
  "hiring-sprint": "gcc-hiring-sprints",
};

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
                "bg-surface flex flex-col rounded-2xl border p-6",
                p.featured ? "border-accent border-2" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <IconTile name={planIcons[p.id]} tone={p.featured ? "accent" : "ink"} />
                {p.featured && <Badge tone="new">Best value at volume</Badge>}
              </div>
              <h3 className="mt-5 text-xl font-bold">{p.name}</h3>
              <p className="text-muted">{p.for}</p>
              <p className="tabular mt-6 text-[1.75rem] leading-tight font-bold tracking-tight">
                {p.price}
              </p>
              <p className="text-muted text-sm">{p.priceNote}</p>
              <ul className="mt-6 flex-1 space-y-2">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Tick />
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

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="border-line rounded-2xl border p-6 sm:p-8">
            <h3 className="text-lg font-bold">Per-hire fee by seniority</h3>
            <p className="text-muted mt-1 text-sm">
              Share of annual fixed CTC, paid when the hire joins.
            </p>
            <ul className="mt-6 space-y-5">
              {(Object.keys(perHireFees) as Seniority[]).map((k) => {
                const f = perHireFees[k];
                return (
                  <li key={k}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-semibold">{f.label}</span>
                      <span className="tabular">
                        <span className="font-semibold">{formatPercent(f.percent)}</span>
                        <span className="text-muted">
                          {" "}
                          · {f.months} {f.months === 1 ? "month" : "months"} of CTC
                        </span>
                      </span>
                    </div>
                    <div className="bg-bg mt-2 h-2.5 rounded-full" aria-hidden>
                      <div
                        className="bg-accent h-2.5 rounded-[4px]"
                        style={{ width: `${(f.months / 2) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border-line rounded-2xl border p-6 sm:p-8">
            <h3 className="text-lg font-bold">When you pay</h3>
            <p className="text-muted mt-1 text-sm">
              Per-hire roles: nothing until your hire's first day.
            </p>
            <PipelineTracker
              className="mt-6"
              orientation="vertical"
              mode="plan"
              label="When you pay for a per-hire role"
              steps={[
                { label: "Brief and shortlist", detail: "₹0" },
                { label: "Interviews and offer", detail: "₹0" },
                { label: "Hire joins", detail: "Invoice raised" },
                { label: "15 days later", detail: "Fee + GST due" },
              ]}
            />
          </div>
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
        <div className="border-line bg-surface overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-line border-b">
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Criterion</span>
                </th>
                <th scope="col" className="bg-accent-soft text-accent px-6 py-3">
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
                  <td className="bg-accent-soft/60 px-6 py-3 font-semibold">{r.emplyify}</td>
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
