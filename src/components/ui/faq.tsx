import type { Faq } from "@/content/types";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schema";

/** Native <details> accordion: keyboard accessible with zero JS. Emits FAQPage schema. */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-line border-line bg-surface divide-y rounded-[12px] border">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {f.q}
              <span
                aria-hidden
                className="text-accent text-xl transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-muted mt-2">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
