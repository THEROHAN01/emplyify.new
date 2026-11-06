import Image from "next/image";
import { clientLogos, proofMetrics } from "@/content/metrics";
import { site } from "@/content/site";
import { Container } from "@/components/ui/layout";
import { Stat } from "@/components/ui/stat";

/**
 * Proof bar. Shows only verifiable numbers: the written guarantees today,
 * live metrics as they become real, client logos only with permission.
 */
export function ProofBar() {
  const live = proofMetrics.filter((m) => m.value);
  return (
    <section aria-label="Proof" className="border-line border-y py-12">
      <Container>
        <div className="lg:divide-line grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x [&>*]:lg:px-8 [&>*:first-child]:lg:pl-0">
          <Stat
            value={`${site.promises.shortlistHours}h`}
            label="Shortlist promise"
            footnote="From confirmed brief to verified shortlist."
          />
          <Stat
            value={`${site.promises.replacementDays} days`}
            label="Free replacement"
            footnote="Written into every agreement."
          />
          {(live.length ? live : proofMetrics.slice(0, 2)).map((m) => (
            <Stat
              key={m.id}
              value={m.value}
              label={m.label}
              footnote={m.method}
              pending={m.pending}
            />
          ))}
        </div>
        {clientLogos.length > 0 && (
          <div className="mt-12">
            <h2 id="partners-heading" className="text-muted text-center text-sm font-medium">
              Companies we partner with
            </h2>
            <ul
              className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-8"
              aria-labelledby="partners-heading"
            >
              {clientLogos.map((l) => (
                <li key={l.name}>
                  <Image src={l.src} alt={l.name} width={l.width} height={l.height} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
