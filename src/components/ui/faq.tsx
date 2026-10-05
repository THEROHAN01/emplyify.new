import type { Faq } from "@/content/types";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schema";

/** Native <details> accordion: keyboard accessible with zero JS. Emits FAQPage schema. */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line rounded-[12px] border border-line bg-surface">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {f.q}
              <span aria-hidden className="text-xl text-accent transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
